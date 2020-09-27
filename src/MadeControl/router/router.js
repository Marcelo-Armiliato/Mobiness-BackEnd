const express = require('express');
const calculo = require('../controllers/CalculoController.js');
const lote = require('../controllers/LoteController.js');
const usuario = require('../controllers/UserController.js');

const app = express.Router();


app.post('/calculo', calculo.cadastrar);
app.get('/calculo/:id', calculo.listar);
app.get('/calculo/todos/lote:id', calculo.listarTodos);
app.delete('/calculo/:id', calculo.deletar);
app.delete('/calculo/limparCalculosNull', calculo.deletarCalculos);


app.get('/lote/proximo', lote.buscarProxID);
app.post('/lote', lote.cadastrar);
app.get('/lote/todos', lote.listar);
app.delete('/lote/:id', lote.deletar);

app.post('/usuario', usuario.cadastrar);
app.post('/usuario/validar', usuario.validar);
app.post('/usuario/validarEmail', usuario.VerificarEmailDisponivel);
app.delete('/usuario/:id', usuario.deletar);
app.put('/usuario/:email', usuario.AlterarSenha);

module.exports = app;