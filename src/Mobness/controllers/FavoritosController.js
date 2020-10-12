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
            .select("Imovel.*", "Favoritos.IdFavoritos", "Favoritos.Favorito")
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

    // ============== APAGA IMOVEL LISTADO COMO FAVORITO ==============
    async Deletar(req, res) {
        await db("Favoritos")
            .where({ IdUsuario: req.params.IdUsuario })
            .andWhere({ IdImovel: req.params.IdImovel })
            .del()
            .then(() => res.status(200).send({ Status: "OK" }))
            .catch(() => res.status(400).send({ status: "ERRO" }));
    },


    // =========== VERIFICA SE O IMÓVEL JÁ FOI MARCADO COMO FAVORITO ===========
    async VerificaImovelFavorito(req, res) {

        const result = await db("Favoritos")
            .where({
                IdImovel: req.params.IdImovel
            })
            .andWhere({ IdUsuario: req.body.IdUsuario })

        if (result.length != 0) res.status(400).send({ validou: "Imóvel já está marcado como favorito" });
        else res.status(200).send({ validou: "Imóvel disponível!" });

    },


}