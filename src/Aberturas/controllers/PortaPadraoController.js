const db = require("../database/conexao.js");

module.exports = {

    // =================== CADASTRAR PIVOTANTE NO BANCO ====================
    async Cadastrar(req, res) {
        if (req.body.Altura == null || req.body.Altura == "")
            res.status(400).send({
                salvou: false,
                erro: "Altura da Porta Padrão  é informação de preechimento obrigatório",
            })
        else if (req.body.Largura == null || req.body.Largura == "") {
            res.status(400).send({
                salvou: false,
                erro: "Largura da Porta Padrão é informação de preechimento obrigatório",
            })
        } else if (req.body.Marco_Parede == null || req.body.Marco_Parede == "") {
            res.status(400).send({
                salvou: false,
                erro: "O Mardo da parede é um campo de preechimento obrigatório",
            })
        } else
            await db
            .insert(req.body)
            .into("Porta_Padrao")
            .then(() => res.status(201).send({ status: "Cadastrado com sucesso" }))
            .catch(() => res.status(400).send({ status: "Erro ao cadastrar!!" }));
    },

    // =================== DELETAR PIVOTANTE DO BANCO ====================
    async Deletar(req, res) {
        await db("Porta_Padrao")
            .where({ IdPorta_Padrao: req.params.id })
            .del()
            .then(() => res.status(200).send({ status: "OK" }))
            .catch(() => res.status(400).send({ status: "ERRO" }));
    },

    // =============== EDITAR PIVOTANTE DA PORTA CADASTRADO ================
    async Editar(req, res) {
        await db('Porta_Padrao')
            .where({ IdPorta_Padrao: req.params.id })
            .update(req.body)
            .then(() => res.status(200).send({ Status: "Editado com sucesso!!" }))
            .catch(() => res.status(400).send({ status: "ERRO" }));
    },

    // =================== LISTAR TODAS AS PIVOTANTE CADASTRADAS NO BANCO ====================
    async ListarTodos(req, res) {
        await db
            .select()
            .table("Porta_Padrao")
            .orderBy("IdPorta_Padrao", "desc")
            .then((result) => {
                res.status(200).send(result);
            })
            .catch((erro) => res.status(400).send({ Status: "Erro" }))
    },

};