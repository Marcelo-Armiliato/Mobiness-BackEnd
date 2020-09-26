const express = require('express');

const grupoMedidas = require('../controllers/GrupoMedidasController');
const MedidaUnt = require('../controllers/MedidaUntController.js');
const Empresa = require('../controllers/EmpresaController');
const imovel = require('../controllers/ImovelController.js');
const usuario = require('../controllers/UserController.js');
const TipoPorta = require('../controllers/TipoPortaController.js');
const Dobradica = require('../controllers/DobradicaController.js');
const Fechadura = require('../controllers/FechaduraController.js');
const CodReferencia = require('../controllers/CodReferenciaController.js');
const Pivotante = require('../controllers/PivotanteController.js');
const PortaPadrao = require('../controllers/PortaPadraoController.js');

const app = express.Router();

//APIS PARA O GRUPO DE MEDIDAS
app.post('/GrupoMedidas/cadastrar/', grupoMedidas.cadastrarGrupoMedidas);
app.get('/GrupoMedidas/listarTodos/:IdUsuario', grupoMedidas.listarTodosGrupoMedidas);
app.delete('/GrupoMedidas/deletar/:id', grupoMedidas.deletarGrupoMedidas);
app.put('/GrupoMedidas/editar/:id', grupoMedidas.EditarGrupoMedidas);
app.get('/GrupoMedidas/ListaGruposFinalizados/:IdUsuario', grupoMedidas.selecionaGruposComProcessoFinalizado);
app.get('/GrupoMedidas/ListaGruposEnviados/', grupoMedidas.selecionaGruposComProcessoEnviado);
app.put('/GrupoMedidas/AlteraStatusProcesso/:id', grupoMedidas.AlterarEstadoProcessoFinalizado);
app.get('/GrupoMedidas/ListaUltimoGrupoCadastrado/', grupoMedidas.ListaUltimoGrupoCadastrado);

//APIS PARA AS MEDIDAS UNITÁRIAS DE CADA CÔMODO
app.post('/MedidaUnt/cadastrar/', MedidaUnt.CadastraMedidaUnt);
app.get('/MedidaUnt/ListarPorGrupoMedidas/:idGrupo', MedidaUnt.ListarMedidasPorGrupo);
app.delete('/MedidaUnt/deletar/:id', MedidaUnt.DeletarMedidaUnt);
app.put('/MedidaUnt/editar/:id', MedidaUnt.EditarMedidaUnt);
app.get('/MedidaUnt/BuscarUnicoRegistro/:id', MedidaUnt.buscarID);

//API PARA OS BUSCAR OS CODIGOS DE ADM E EMPRESA
app.post('/Empresa/buscarCodigoEmp/:Cod', Empresa.buscarCodEmpresa);
app.get('/Empresa/buscarCodigoAdm/:CodAdm', Empresa.buscarCodADM);
app.post('/Empresa/loginEmpresa/', Empresa.Login);

// API DA PARTE DOS IMÓVEIS
app.get('/imovel/proximo/', imovel.buscarProxID);
app.get('/imovel/ListarTodos/', imovel.listarTodosRegistros);
app.delete('/imovel/deletar/:id', imovel.deletar);
app.put('/imovel/editar/:id', imovel.editar);
app.post('/imovel/Cadastrar', imovel.VerificarECadastraImovel);
app.get('/imovel/BuscarUnicoRegistro/:Nome', imovel.BuscarPorNome);

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

// API PARA OS TIPOS DE PORTAS 
app.delete('/TipoPorta/deletar/:id', TipoPorta.Deletar);
app.put('/TipoPorta/editar/:id', TipoPorta.Editar);
app.post('/TipoPorta/Cadastrar', TipoPorta.Cadastrar);
app.get('/TipoPorta/ListarTodos/', TipoPorta.ListarTodos);
app.get('/TipoPorta/BuscarUnicoRegistro/:Nome', TipoPorta.BuscarRegistroPorNome);

// API PARA A TABELA DOBRADICA 
app.delete('/Dobradica/deletar/:id', Dobradica.Deletar);
app.put('/Dobradica/editar/:id', Dobradica.Editar);
app.post('/Dobradica/Cadastrar', Dobradica.Cadastrar);
app.get('/Dobradica/ListarTodos/', Dobradica.ListarTodos);
app.get('/Dobradica/BuscarUnicoRegistro/:Nome', Dobradica.BuscarRegistroPorNome);

// API PARA A TABELA FECHADURA 
app.delete('/Fechadura/deletar/:id', Fechadura.Deletar);
app.put('/Fechadura/editar/:id', Fechadura.Editar);
app.post('/Fechadura/Cadastrar', Fechadura.Cadastrar);
app.get('/Fechadura/ListarTodos/', Fechadura.ListarTodos);
app.get('/Fechadura/BuscarUnicoRegistro/:Nome', Fechadura.BuscarRegistroPorNome);

// API PARA A TABELA COD_REFERENCIA 
app.delete('/CodReferencia/deletar/:id', CodReferencia.Deletar);
app.put('/CodReferencia/editar/:id', CodReferencia.Editar);
app.post('/CodReferencia/Cadastrar/', CodReferencia.Cadastrar);
app.get('/CodReferencia/ListarTodos/', CodReferencia.ListarTodos);
app.get('/CodReferencia/BuscarUnicoRegistro/:Codigo', CodReferencia.BuscarRegistroPorCodigo);

// API PARA A TABELA PIVOTANTES 
app.delete('/Pivotante/Deletar/:id', Pivotante.Deletar);
app.put('/Pivotante/Editar/:id', Pivotante.Editar);
app.post('/Pivotante/Cadastrar', Pivotante.Cadastrar);
app.get('/Pivotante/ListarTodos/', Pivotante.ListarTodos);
app.get('/Pivotante/BuscarUnicoRegistro/:Nome', Pivotante.BuscarRegistroPorNome);

// API PARA A TABELA PIVOTANTES 
app.delete('/PortaPadrao/Deletar/:id', PortaPadrao.Deletar);
app.put('/PortaPadrao/Editar/:id', PortaPadrao.Editar);
app.post('/PortaPadrao/Cadastrar', PortaPadrao.Cadastrar);
app.get('/PortaPadrao/ListarTodos/', PortaPadrao.ListarTodos);


module.exports = app;