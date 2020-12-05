const express = require('express');
const Estado = require('../controllers/EstadoController');
const Favoritos = require('../controllers/FavoritosController');
const imovel = require('../controllers/ImovelController.js');
const usuario = require('../controllers/UserController.js');

const authMiddleware = require('../auth/auth');

const app = express.Router();

// API PARA A TABELA FAVORITOS
app.post('/Favoritos/Cadastrar/', authMiddleware, Favoritos.Cadastrar);
app.get('/Favoritos/ListarFavoritosUsuario/:IdUsuario', authMiddleware, Favoritos.ListarFavoritosUsuario);
app.delete('/Favoritos/Deletar/:IdUsuario/:IdImovel', authMiddleware, Favoritos.Deletar);
app.get('/Favoritos/VerificaFavoritoMarcado/:IdImovel/:IdUsuario', authMiddleware, Favoritos.VerificaImovelFavorito);

// API DA PARTE TABELA DOS IMÓVEIS
app.get('/imovel/ListarTodos/', authMiddleware, imovel.listarTodosImoveis);
app.get('/imovel/ListarImoveisUsuario/:IdUsuario', authMiddleware, imovel.listarImoveisPorUsuario);
app.delete('/imovel/deletar/:id', authMiddleware, imovel.deletar);
app.put('/imovel/editar/:id', authMiddleware, imovel.editar);
app.post('/imovel/Cadastrar', authMiddleware, imovel.VerificarECadastraImovel);
app.get('/imovel/BuscarImovelPorTipo/:Tipo', authMiddleware, imovel.BuscarPorTipoImovel);
app.get('/imovel/BuscarImovePorId/:IdImovel', authMiddleware, imovel.BuscaImovelPorId);

// API PARA A TABELA ESTADO
app.get('/Estado/ListarTodos', authMiddleware, Estado.listarTodosEstados);

// API PARA A TABELA USUÁRIO
app.post('/usuario/cadastrar/', usuario.cadastrar);
app.post('/usuario/LogarUsuario', usuario.Login);
app.post('/usuario/validarEmail/', usuario.VerificarEmailDisponivel);
app.delete('/usuario/deletar/:id', authMiddleware, usuario.deletar);
app.put('/usuario/RecuperaSenha/AlterarSenha/:Email', authMiddleware, usuario.AlterarSenha);
app.get('/usuario/BuscarIdUsuarioLogado/:EmailUser', authMiddleware, usuario.buscarIdUsuario);
app.put('/usuario/Editar/:IdUsuario', authMiddleware, usuario.Editar);
app.get('/usuario/BuscarDadosUsuarioLogado/:IdUsuario', authMiddleware, usuario.BuscaUsuarioLogado);
app.get('/usuario/BuscaUsuarioPorId/:IdUsuario', authMiddleware, usuario.BuscaUsuarioPorId);
app.get('/Usuario/BuscaUltimoUsuarioCadastrado/', authMiddleware, usuario.BuscaUltimoUsuarioCadastrado);



app.get('/usuario/BuscaEmpresaPorUsuario/:IdUsuario', usuario.BuscaEmpresaPorUsuario);


module.exports = app;