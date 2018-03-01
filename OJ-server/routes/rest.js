const express = require('express');
const router = express.Router();

const problemService = require('../services/problemService');
const bodyParser = require('body-parser');
const jsonParser = bodyParser.json();

const nodeRestClient = require('node-rest-client').Client;
const restClient = new nodeRestClient();
// EXECUTOR_SERVER_URL = 'http://localhost:5000/build_and_run';
EXECUTOR_SERVER_URL = 'http://executor/build_and_run';
restClient.registerMethod('build_and_run', EXECUTOR_SERVER_URL, 'POST');

// get all problems
router.get('/problems', (req, res) => {
    problemService.getProblems()
        .then(problems => res.json(problems));
});

// get one problem
router.get('/problems/:id', (req, res) => {
    const id = req.params.id;
    problemService.getProblem(+id)
        .then(problem => res.json(problem));
});

// post a problem
router.post('/problems', jsonParser, (req, res) => {
    problemService.addProblem(req.body)
        .then(problem => res.json(problem), 
            error => res.status(400).send('Problem already exists.'));
});

// modify a problem
router.post('/editProblem/:id', jsonParser, (req, res) => {
    problemService.editProblem(req.body)
        .then(problem => res.json(problem), 
            error => res.status(400).send('Problem doesn\'t exists.'));
});

// build and run
router.post('/build_and_run', jsonParser, (req, res) => {
    const userCode = req.body.user_code;
    const lang = req.body.lang;
    console.log('lang:', lang, 'code:', userCode);

    restClient.methods.build_and_run(
        { data: { code: userCode, lang: lang },
        headers: {'Content-Type': 'application/json'}},
        (data, response) => {
            const whole_res = `Build: ${data['build']}, Output: ${data['run']}`;
            const build = `${data['build']}`;         
            const run = `${data['run']}`;
            build == 'OK' ? res.json(run) : res.json(build);
        }
    )
});

module.exports = router;