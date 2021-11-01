//import express from 'express';
//import bodyParser from 'body-parser';

const express = require('express');
const bodyParser = require('body-parser');

const port = 8011;

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: true
}));

app.get("/", (req, res) => {
    res.json({message: "FitnessCheck Microservice"});
});

var routes = require('./api/routes/client_routes.js');

routes(app);

app.listen(port, () => {
    console.log(`Server is start on port ${port}`)
})