const db = require("../database/conexao.js");

module.exports = {
    async cadastrar(req, res) {
        if (req.body.resultado != null || req.body.resultado != "") {
            await db
                .insert(req.body)
                .into("Lote")
                .then(() =>
                    res.status(201).send({ status: "Cadastrado com sucesso!!" })
                )
                .catch(() =>
                    res.status(400).send({ status: "Erro ao tentar cadastrar !!" })
                );
        } else res.status(400).send({ status: "O campo total esta null" });
    },

    async deletar(req, res) {
        await db("Lote")
            .where({ idLote: req.params.id })
            .del()
            .then(() => res.status(200).send({ Status: "OK" }))
            .catch(() => res.status(400).send({ status: "ERRO" }));
    },

    async buscarID(req, res) {
        await db("Lote")
            .where({ idLote: req.params.id })
            .then((result) => res.status(200).jsdion(result))
            .catch((erro) => res.status(400).send({ Status: "Erro" }));
    },

    async listar(req, res) {
        await db
            .select()
            .table("Lote")
            .orderBy("idLote", "desc")
            .then((result) => {
                res.status(200).send(result);
            })
            .catch((erro) => res.status(400).send({ Status: "Erro" }));
    },

    async buscarProxID(req, res) {
        const result = await db("Lote").max("idLote as len");

        res.status(200).send(result.map((mp) => mp.len + 1));
    },
};