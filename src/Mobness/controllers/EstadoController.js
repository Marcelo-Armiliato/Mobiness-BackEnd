const db = require("../database/conexao.js");

module.exports = {

    // ============== LISTAGEM OS ESTADOS GRAVADOS NO BANCO DE DADOS ==============
    async listarTodosEstados(req, res) {
        await db
            .select()
            .table("Estado")
            .orderBy("Nome")
            .then((result) => {
                res.status(200).send(result);
            })
            .catch((erro) => res.status(400).send({ Status: "Erro" }));
    },


}