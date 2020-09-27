const db = require("../database/conexao.js");

module.exports = {

    // =================== CADASTRAR PORTA NO BANCO ====================
    async Cadastrar(req, res) {
        if (req.body.Nome == null || req.body.Nome == "")
            res.status(400).send({
                salvou: false,
                erro: "Nome da fechadura é informação de preechimento obrigatório",
            })
        else
            await db
            .insert(req.body)
            .into("Tipo_Porta")
            .then(() => res.status(201).send({ status: "Cadastrado com sucesso" }))
            .catch(() => res.status(400).send({ status: "Erro ao cadastrar!!" }));
    },

    // =================== DELETAR PORTA DO BANCO ====================
    async Deletar(req, res) {
        await db("Tipo_Porta")
            .where({ idTipo_Porta: req.params.id })
            .del()
            .then(() => res.status(200).send({ status: "OK" }))
            .catch(() => res.status(400).send({ status: "ERRO" }));
    },

    // =============== EDITAR INFORMAÇÕES DA PORTA CADASTRADA ================
    async Editar(req, res) {
        await db('Tipo_Porta')
            .where({ IdTipo_Porta: req.params.id })
            .update(req.body)
            .then(() => res.status(200).send({ Status: "Editado com sucesso!!" }))
            .catch(() => res.status(400).send({ status: "ERRO" }));
    },

    // =================== CADASTRAR USUÁRIO NO BANCO ====================
    async BuscarRegistroPorNome(req, res) {
        await db("Tipo_Porta")
            .where({ Nome: req.params.Nome })
            .then((result) => res.status(200).send(result))
            .catch((erro) =>
                res.status(400).send({ msg: "Erro, consulta não pode ser realizada!!" })
            );
    },

    // =================== LISTAR TIPO DE PORTAS CADASTRADAS NO BANCO ====================
    async ListarTodos(req, res) {
        await db
            .select()
            .table("Tipo_Porta")
            .orderBy("IdTipo_Porta", "desc")
            .then((result) => {
                res.status(200).send(result);
            })
            .catch((erro) => res.status(400).send({ Status: "Erro" }))
    },

};