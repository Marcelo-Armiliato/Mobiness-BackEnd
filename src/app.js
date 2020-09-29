const express = require('express');
const cors = require('cors');
const routesAberturas = require('./Aberturas/router/router.js');
const bodyParser = require('body-parser');

const porta = 3000;

const app = express();

app.use(cors())

app.use(bodyParser.json());

app.use(routesAberturas);

app.listen(porta, () => console.log("Servidor conectado!"));