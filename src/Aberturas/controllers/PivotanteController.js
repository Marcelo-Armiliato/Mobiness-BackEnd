const db = require("../database/conexao.js");

module.exports = {

    // =================== CADASTRAR PIVOTANTE NO BANCO ====================
    async Cadastrar(req, res) {
        if (req.body.Nome == null || req.body.Nome == "")
            res.status(400).send({
                salvou: false,
                erro: "Nome do Pivotante é informação de preechimento obrigatório",
            })
        else
            await db
            .insert(req.body)
            .into("Pivotante")
            .then(() => res.status(201).send({ status: "Cadastrado com sucesso" }))
            .catch(() => res.status(400).send({ status: "Erro ao cadastrar!!" }));
    },

    // =================== DELETAR PIVOTANTE DO BANCO ====================
    async Deletar(req, res) {
        await db("Pivotante")
            .where({ IdPivotante: req.params.id })
            .del()
            .then(() => res.status(200).send({ status: "OK" }))
            .catch(() => res.status(400).send({ status: "ERRO" }));
    },

    // =============== EDITAR PIVOTANTE DA PORTA CADASTRADO ================
    async Editar(req, res) {
        await db('Pivotante')
            .where({ IdPivotante: req.params.id })
            .update(req.body)
            .then(() => res.status(200).send({ Status: "Editado com sucesso!!" }))
            .catch(() => res.status(400).send({ status: "ERRO" }));
    },

    // ============= PESQUISA POR NOME DA PIVOTANTE CADASTRADO NO BANCO ================
    async BuscarRegistroPorNome(req, res) {
        await db("Pivotante")
            .where({ Nome: req.params.Nome })
            .then((result) => res.status(200).send(result))
            .catch((erro) =>
                res.status(400).send({ msg: "Erro, consulta não pode ser realizada!!" })
            );
    },

    // =================== LISTAR TODAS AS PIVOTANTE CADASTRADAS NO BANCO ====================
    async ListarTodos(req, res) {
        await db
            .select()
            .table("Pivotante")
            .orderBy("IdPivotante", "desc")
            .then((result) => {
                res.status(200).send(result);
            })
            .catch((erro) => res.status(400).send({ Status: "Erro" }))
    },

};