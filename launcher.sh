#! /bin/bash

fuser -k 3000/tcp
fuser -k 5000/tcp

sudo service redis_6379 start

sudo cp oj-executor /etc/nginx/sites-enabled
sudo service nginx start

cd ./OJ-server
nodemon server.js &

cd ../executor
pip3 install -r requirements.txt
python3 exec_server.py &

echo "==========================================="
read -p "Press [ENTER] to terminate processes." PRESSKEY

fuser -k 3000/tcp
fuser -k 5000/tcp

sudo service redis_6379 stop
sudo service nginx stop
