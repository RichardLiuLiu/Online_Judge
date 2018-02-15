var redisClient = require('../modules/redisClient');
const TIME_IN_SECONDS = 3600;

module.exports = function(io) {

    var sessionPath = '/temp_sessions'

    var collaborations = {};
    var socketId2sessionId = {};

    io.on('connection', (socket) => {
        let sessionId = socket.handshake.query['sessionId'];

        socketId2sessionId[socket.id] = sessionId;

        // if (!(sessionId in collaborations)) {
        //     collaborations[sessionId] = {
        //         'participants': []
        //     };
        //     numSession++;
        //     socket.emit("counter", numSession);
        // }

        if (sessionId in collaborations) {
            collaborations[sessionId]['participants'].push(socket.id);

            let participants = collaborations[sessionId]['participants'];
            for (let i = 0; i < participants.length; i++) {
                io.to(participants[i]).emit("userChange", participants);
            }            
        } else {
            redisClient.get(sessionPath + '/' + sessionId, function(data) {
                if (data) {
                   console.log("Got data from redis.");
                   collaborations[sessionId] = {
                       'cachedCodes': JSON.parse(data),
                       'participants': []
                   };
                } else {
                   console.log("Creating new session.");
                   collaborations[sessionId] = {
                       'cachedCodes': [],
                       'participants': []
                    };
                }
                // collaborations[sessionId]['participants'].push(socket.id);
                io.to(socket.id).emit("userChange", socket.id);
            });
        }

        socket.on('change', delta => {
            console.log("change" + socketId2sessionId[socket.id] + " " + delta);
            let sessionId = socketId2sessionId[socket.id];
            if (sessionId in collaborations) {
                collaborations[sessionId]['cachedCodes'].push(["change", delta, Date.now()]);

                let participants = collaborations[sessionId]['participants'];
                for (let i = 0; i < participants.length; i++) {
                    if (socket.id != participants[i]) {
                        io.to(participants[i]).emit("change", delta);
                    }
                }
            } else {
                console.log("Unable to join any collaboration.");
            }
        });

        socket.on('restoreBuffer', () => {
            let sessionId = socketId2sessionId[socket.id];
            console.log("Restore buffer for session " + sessionId, "socket id: " + socket.id);
            
            if (sessionId in collaborations) {
                let codes = collaborations[sessionId]['cachedCodes'];
                for (let i = 0; i < codes.length; i++) {
                    socket.emit(codes[i][0], codes[i][1]);
                }
            }
        });

        socket.on('disconnect', () => {
            let sessionId = socketId2sessionId[socket.id];
            console.log("Disconnect session " + sessionId + ", socket id: " + socket.id);

            let found_remove = false;

            if (sessionId in collaborations) {
                let participants = collaborations[sessionId]['participants'];
                let index = participants.indexOf(socket.id);
                participants.splice(index, 1);
                found_remove = true;
                if (participants.length == 0) {
                    console.log("Last participant left");
                    let key = sessionPath + "/" + sessionId;
                    let value = JSON.stringify(collaborations[sessionId]['cachedCodes']);

                    redisClient.set(key, value, redisClient.redisPrint);
                    redisClient.expire(key, TIME_IN_SECONDS);

                    delete collaborations[sessionId];
                }
                for (let i = 0; i < participants.length; i++) {
                    io.to(participants[i]).emit("userChange", participants);
                }
            }
            if (!found_remove) {
                console.log("Warning: cannot find socket id in the collaboration.");
            }
        });
    });

    // io.on('connection', (socket) => {
    //     numSession--;
    //     socket.emit("counter", numSession);
    // });

};