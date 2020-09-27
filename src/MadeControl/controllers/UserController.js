const db = require("../database/conexao.js");

module.exports = {
    async cadastrar(req, res) {
        if (req.body.nome == null || req.body.nome == "")
            res.status(400).send({
                salvou: false,
                erro: "Nome de usuário é informação de preechimento obrigatório",
            });
        else if (req.body.senha == null)
            res.status(400).send({
                salvou: false,
                erro: "Senha é informação de preenchimento obrigatório",
            });
        else
            await db
            .insert(req.body)
            .into("Usuario")
            .then(() => res.status(201).send({ status: "Cadastrado com sucesso" }))
            .catch(() => res.status(400).send({ status: "Erro ao cadastrar!!" }));
    },

    async deletar(req, res) {
        await db("Usuario")
            .where({ idUsuario: req.params.id })
            .del()
            .then(() => res.status(200).send({ Status: "OK" }))
            .catch(() => res.status(400).send({ status: "ERRO" }));
    },

    async validar(req, res) {
        if (req.body.email == null || req.body.senha == null)
            res
            .status(400)
            .send({ validou: "Erro, o campo email ou senha estão nulo" });
        else {
            const result = await db("Usuario").where({
                email: req.body.email,
                senha: req.body.senha,
            });

            if (result.length == 0) res.status(400).send({ validou: false });
            else res.status(200).send({ id: result.idUsuario });
        }
    },

    async buscarDados(req, res) {
        const result = await db("Usuario").where({
            email: req.body.nome,
            senha: req.body.senha,
        });
    },

    async VerificarEmailDisponivel(req, res) {
        if (req.body.email == null)
            res.status(400).send({ validou: "Erro, o campo email esta vazio" });
        else {
            const result = await db("Usuario").where({
                email: req.body.email,
            });

            if (result.length != 0) res.status(400).send({ validou: false });
            else res.status(200).send({ validou: true });
        }
    },
    // ============== Alterar senha do E-mail informado ==============
    async AlterarSenha(req, res) {
        db('Usuario')
            .where({ email: req.params.email })
            // .where({ idUsuario: req.params.id })
            .update(req.body)
            .then(() => res.status(201).send({ Status: "OK" }))
            .catch(() => res.status(400).send({ status: "ERRO" }));
    },

};