const db = require("../database/conexao.js");

module.exports = {

    //==== API Para buscar o codigo da EMP no banco de dados ======
    async buscarCodEmpresa(req, res) {
        await db
            .select("IdEmpresa")
            .table("Empresa")
            .where({ Cod_Acesso: req.params.Cod })
            .then((result) => res.status(200).send(result))
            .catch((erro) => res.status(400).send({ Status: "Erro" }));
    },

    // ==== BUSCA O COD_ADM DA EMPRESA ATRAVÉS DO IDEMPRESA =====
    async buscarCodADM(req, res) {
        await db
            .select("Cod_Adm")
            .table("Empresa")
            .where({ IdEmpresa: req.params.CodAdm })
            .then((result) => {
                res.status(200).send(result);
            })
            .catch((erro) => res.status(400).send({ Status: "Erro" }));
    },

    // ========= EFETUA O LOGIN DA EMPRESA CADASTRADA ==========
    async Login(req, res) {

        if (req.body.Email == null || req.body.Senha == null)
            res
            .status(400)
            .send({ validou: "Erro, o campo email ou senha estão nulo" });
        else {
            const result = await db
                .select("IdEmpresa")
                .table("Empresa").where({
                    Email: req.body.Email,
                    Senha: req.body.Senha,
                });

            if (result.length == 0) res.status(404).send({ validou: false });
            else res.status(200).send(result);
        }
    },

}