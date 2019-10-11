const express = require('express');

const Projects = require('./data/projects/projects-model.js')

const server = express();
server.use(express.json());


module.exports = server;