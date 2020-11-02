const db = require("../database/conexao.js");

module.exports = {

    // =========== VERIFICA SE O IMÓVEL ESTÁ DISPONÍVEL PARA SER CADASTRADO ============
    // CASO O IMÓVEL ESTEJA DISPONÍVEL, EFETUA DIRETAMENTE O CADASTRO DELE

    async VerificarECadastraImovel(req, res) {
        await db
            .insert(req.body)
            .into("Imovel")
            .then(() =>
                res.status(201).send({ status: "Cadastrado com sucesso!!" })
            )
            .catch(() =>
                res.status(400).send({ status: "Erro ao tentar cadastrar !!" })
            );
    },

    // ============== EDIÇÃO DO REGISTRO GRAVADO NO BANCO DE DADOS ==============
    async editar(req, res) {
        await db("Imovel")
            .where({ idimovel: req.params.id })
            .update(req.body)
            .then(() => res.status(200).send({ Status: "OK" }))
            .catch(() => res.status(400).send({ status: "ERRO" }));
    },

    // ============== APAGAR DETERMINADO REGISTRO DO BANCO DE DADOS ==============
    async deletar(req, res) {
        await db("Imovel")
            .where({ idimovel: req.params.id })
            .del()
            .then(() => res.status(200).send({ Status: "OK" }))
            .catch(() => res.status(400).send({ status: "ERRO" }));
    },

    // ============== PESQUISA PARA VERIFICAR SE UM DETERMINADO REGISTRO JÁ EXISTE ==============
    async BuscarPorTipoImovel(req, res) {
        await db("Imovel")
            .where({ Tipo_Imovel: req.params.Tipo })
            .then((result) => res.status(200).send(result))
            .catch((erro) => res.status(400).send({ Status: "Erro" }));
    },

    // ============== LISTAGEM DOS REGISTROS GRAVADOS NO BANCO DE DADOS ==============
    async listarTodosImoveis(req, res) {
        await db
            .select()
            .table("Imovel")
            .where({ "Imovel.Status_Imovel": "Ativo" })
            .orderBy("idImovel", "desc")
            .then((result) => {
                res.status(200).send(result);
            })
            .catch((erro) => res.status(400).send({ Status: "Erro" }));
    },

    // ============== LISTAGEM DOS REGISTROS GRAVADOS NO BANCO DE DADOS ==============
    async listarImoveisPorUsuario(req, res) {
        await db
            .select()
            .table("Imovel")
            .where({ "Imovel.IdUsuario": req.params.IdUsuario })
            .orderBy("idImovel", "desc")
            .then((result) => {
                res.status(200).send(result);
            })
            .catch((erro) => res.status(400).send({ Status: "Erro" }));
    },

    // ============== LISTAGEM DOS REGISTROS GRAVADOS NO BANCO DE DADOS ==============
    async listarImovelCasa(req, res) {
        await db
            .select()
            .table("Imovel")
            .where({ "Imovel.Tipo_Imovel": "Casa" })
            .orderBy("IdImovel", "desc")
            .then((result) => {
                res.status(200).send(result);
            })
            .catch((erro) => res.status(400).send({ Status: "Erro" }));
    },

    // ============== LISTAGEM DOS REGISTROS GRAVADOS NO BANCO DE DADOS ==============
    async listarImovelTerreno(req, res) {
        await db
            .select()
            .table("Imovel")
            .where({ "Imovel.Tipo_Imovel": "Terreno" })
            .orderBy("IdImovel", "desc")
            .then((result) => {
                res.status(200).send(result);
            })
            .catch((erro) => res.status(400).send({ Status: "Erro" }));
    },

    // ============== LISTAGEM DOS REGISTROS GRAVADOS NO BANCO DE DADOS ==============
    async listarImovelApartamento(req, res) {
        await db
            .select()
            .table("Imovel")
            .where({ "Imovel.Tipo_Imovel": " Apartamento" })
            .orderBy("IdImovel", "desc")
            .then((result) => {
                res.status(200).send(result);
            })
            .catch((erro) => res.status(400).send({ Status: "Erro" }));
    },

    // ==== API PARA BUSCAR OS DADOS DE UM CERTO IMÓVEL =====
    async BuscaImovelPorId(req, res) {
        await db
            .select()
            .table("Imovel")
            .where({ IdImovel: req.params.IdImovel })
            .then((result) => res.status(200).send(result))
            .catch(() => res.status(400).send({ status: "ERRO do buscar o determinado imóvel" }));
    },

    // =============== EDIÇÃO DO REGISTRO GRAVADO NO BANCO DE DADOS ================
    async buscarProxID(req, res) {
        const result = await db("Imovel").max("idImovel as len");

        res.status(200).send(result.map((mp) => mp.len + 1));
    },

};