const express = require('express');

const Favoritos = require('../controllers/FavoritosController');
const imovel = require('../controllers/ImovelController.js');
const usuario = require('../controllers/UserController.js');

const app = express.Router();

// API PARA OS BUSCAR OS CODIGOS DE ADM E EMPRESA
app.post('/Favoritos/Cadastrar/', Favoritos.Cadastrar);
app.get('/Favoritos/ListarFavoritosUsuario/:IdUsuario', Favoritos.ListarFavoritosUsuario);
app.delete('/Favoritos/Deletar/:IdFavorito', Favoritos.Deletar);
app.get('/Favoritos/VerificaImovelDisponivel/:IdImovel', Favoritos.VerificaImovelFavorito);

// API DA PARTE DOS IMÓVEIS
app.get('/imovel/proximo/', imovel.buscarProxID);
app.get('/imovel/ListarTodos/', imovel.listarTodosImoveis);
app.get('/imovel/ListarImoveisUsuario/:IdUsuario', imovel.listarImoveisPorUsuario);
app.delete('/imovel/deletar/:id', imovel.deletar);
app.put('/imovel/editar/:id', imovel.editar);
app.post('/imovel/Cadastrar', imovel.VerificarECadastraImovel);
app.get('/imovel/BuscarUnicoRegistro/:Tipo', imovel.BuscarPorTipoImovel);

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

module.exports = app;