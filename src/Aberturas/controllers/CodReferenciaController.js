const db = require("../database/conexao.js");

module.exports = {

    // =================== CADASTRAR REFERÊNCIA NO BANCO ====================
    async Cadastrar(req, res) {
        if (req.body.Codigo == null || req.body.Codigo == "")
            res.status(400).send({
                salvou: false,
                erro: "Nome da referencia é informação de preechimento obrigatório",
            })
        else
            await db
            .insert(req.body)
            .into("Cod_Referencia")
            .then(() => res.status(201).send({ status: "Cadastrado com sucesso" }))
            .catch(() => res.status(400).send({ status: "Erro ao cadastrar!!" }));
    },

    // =================== DELETAR REFERÊNCIA DO BANCO ====================
    async Deletar(req, res) {
        await db("Cod_Referencia")
            .where({ IdCod_Referencia: req.params.id })
            .del()
            .then(() => res.status(200).send({ status: "OK" }))
            .catch(() => res.status(400).send({ status: "ERRO" }));
    },

    // =============== EDITAR REFERÊNCIA DA PORTA CADASTRADA ================
    async Editar(req, res) {
        await db('Cod_Referencia')
            .where({ IdCod_Referencia: req.params.id })
            .update(req.body)
            .then(() => res.status(200).send({ Status: "Editado com sucesso!!" }))
            .catch(() => res.status(400).send({ status: "ERRO" }));
    },

    // ============= PESQUISA POR NOME DA REFERENCIA CADASTRADA NO BANCO ================
    async BuscarRegistroPorCodigo(req, res) {
        await db("Cod_Referencia")
            .where({ Codigo: req.params.Codigo })
            .then((result) => res.status(200).send(result))
            .catch((erro) =>
                res.status(400).send({ msg: "Erro, consulta não pode ser realizada!!" })
            );
    },

    // =================== LISTAR TODAS AS REFERÊNCIAS CADASTRADAS NO BANCO ====================
    async ListarTodos(req, res) {
        await db
            .select()
            .table("Cod_Referencia")
            .orderBy("IdCod_Referencia", "desc")
            .then((result) => {
                res.status(200).send(result);
            })
            .catch((erro) => res.status(400).send({ Status: "Erro" }))
    },

};