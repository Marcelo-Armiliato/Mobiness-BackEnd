const db = require("../database/conexao.js");

module.exports = {

    // ==== API PARA CADASTRAR OS IMOVEIS COMO FAVORITO ======
    async Cadastrar(req, res) {
        await db
            .insert(req.body)
            .into("Favoritos")
            .then(() => res.status(201).send({ status: "Cadastrado com sucesso" }))
            .catch(() => res.status(400).send({ status: "Erro ao cadastrar!!" }));
    },

    // ====== API PARA LISTAR OS IMOVEIS MARCADOS COMO FAVORITOS ========
    async ListarFavoritosUsuario(req, res) {
        await db
            .select("Imovel.*", "Favoritos.IdFavoritos")
            .table("Imovel")
            .join("Favoritos", "Favoritos.IdImovel", "=", "Imovel.IdImovel")
            .join("Usuario", "Usuario.IdUsuario", "=", "Favoritos.IdUsuario")
            .where({ "Favoritos.IdUsuario": req.params.IdUsuario })
            .orderBy("IdFavoritos", "desc")
            .then((result) => {
                res.status(200).send(result);
            })
            .catch((erro) => res.status(400).send({ Status: "Erro" }));
    },

}