const express = require('express');
const Estado = require('../controllers/EstadoController');
const Favoritos = require('../controllers/FavoritosController');
const imovel = require('../controllers/ImovelController.js');
const usuario = require('../controllers/UserController.js');

const app = express.Router();

// API PARA OS BUSCAR OS CODIGOS DE ADM E EMPRESA
app.post('/Favoritos/Cadastrar/', Favoritos.Cadastrar);
app.get('/Favoritos/ListarFavoritosUsuario/:IdUsuario', Favoritos.ListarFavoritosUsuario);
app.delete('/Favoritos/Deletar/:IdUsuario/:IdImovel', Favoritos.Deletar);
app.get('/Favoritos/VerificaFavoritoMarcado/:IdImovel/:IdUsuario', Favoritos.VerificaImovelFavorito);

// API DA PARTE DOS IMÓVEIS
app.get('/imovel/proximo/', imovel.buscarProxID);
app.get('/imovel/ListarTodos/', imovel.listarTodosImoveis);
app.get('/imovel/ListarImoveisUsuario/:IdUsuario', imovel.listarImoveisPorUsuario);
app.delete('/imovel/deletar/:id', imovel.deletar);
app.put('/imovel/editar/:id', imovel.editar);
app.post('/imovel/Cadastrar', imovel.VerificarECadastraImovel);
app.get('/imovel/BuscarImovelPorTipo/:Tipo', imovel.BuscarPorTipoImovel);
app.get('/imovel/ListaTodosImovelCasa/', imovel.listarImovelCasa);
app.get('/imovel/ListaTodosImovelTerreno/', imovel.listarImovelTerreno);
app.get('/imovel/ListaTodosImovelApartamento/', imovel.listarImovelApartamento);
app.get('/imovel/BuscarImovePorId/:IdImovel', imovel.BuscaImovelPorId);

// LOGIN E CADASTRO DO USUÁRIO DO APP
app.post('/usuario/cadastrar/', usuario.cadastrar);
app.post('/usuario/LogarUsuario', usuario.Login);
app.post('/usuario/validarEmail/', usuario.VerificarEmailDisponivel);
app.delete('/usuario/deletar/:id', usuario.deletar);
app.put('/usuario/RecuperaSenha/AlterarSenha/:Email', usuario.AlterarSenha);
app.get('/usuario/ListarUsuarios/', usuario.ListarUsuarios);
app.get('/usuario/BuscarIdUsuarioLogado/:EmailUser', usuario.buscarIdUsuario);
app.get('/usuario/BuscaEmpresaPorUsuario/:IdUsuario', usuario.BuscaEmpresaPorUsuario);
app.put('/usuario/Editar/:IdUsuario', usuario.Editar);
app.get('/usuario/VerificaCodAdm/:IdUsuario', usuario.VerificaCodAdmUsuario);
app.get('/usuario/BuscarDadosUsuarioLogado/:IdUsuario', usuario.BuscaUsuarioLogado);
app.get('/usuario/BuscaUsuarioPorId/:IdUsuario', usuario.BuscaUsuarioPorId);
app.get('/Usuario/BuscaUltimoUsuarioCadastrado/', usuario.BuscaUltimoUsuarioCadastrado);

// API PARA A TABELA "ESTADO"
app.get('/Estado/ListarTodos', Estado.listarTodosEstados);

module.exports = app;