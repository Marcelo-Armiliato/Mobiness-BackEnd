const express = require('express');
const cors = require('cors');
const routesMobness = require('./Mobness/router/router.js');
const bodyParser = require('body-parser');

const porta = 3000;

const app = express();

app.use(cors())

app.use(bodyParser.json());

app.use(routesMobness);

app.listen(porta, () => console.log("Servidor conectado!"));