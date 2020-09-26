const db = require("../database/conexao.js");

module.exports = { // API RESPONSÁVEL PELO CADASTRO DA MEDIDA DA PORTA 
    async CadastraMedidaUnt(req, res) {
        if (req.body.Comodo != "") {
            if (req.body.Altura != "") {
                if (req.body.Largura_Topo != "") {
                    if (req.body.Lado_Abertura != "") {
                        if (req.body.Tipo_Fechadura != "") {
                            await db
                                .insert(req.body)
                                .into("Medida_Unt")
                                .then(() => res.status(201).send({ status: "Medida Cadastrada com sucesso" }))
                                .catch(() => res.status(400).send({ status: "Erro ao cadastrar!" }));

                        } else {
                            res.status(400).send({
                                salvou: false,
                                erro: "É obrigado informar o tipo da fechadura",
                            });
                        }

                    } else {
                        res.status(400).send({
                            salvou: false,
                            erro: "É obrigatorio informar o lado da abertura da porta",
                        });
                    }

                } else {
                    res.status(400).send({
                        salvou: false,
                        erro: "É obrigado informar a largura da porta",
                    });
                }

            } else {
                res.status(400).send({
                    salvou: false,
                    erro: "É obrigado informar a altura da porta",
                });
            }

        } else {
            res.status(400).send({
                salvou: false,
                erro: "É obrigatorio informar um Comodo",
            });
        }
    },

    // API PARA LISTAR AS MEDIDAS DE UM DETERMINADO GRUPO DE MEDIDAS
    // async ListarMedidasPorGrupo(req, res) {
    //     await db("Medida_Unt")
    //         .join("Grupo_Medidas", "Medida_Unt.idGrupo_Medidas", "=", "Grupo_Medidas.idGrupo_Medidas")
    //         .where('Grupo_Medidas.idGrupo_Medidas', req.params.idGrupo)
    //         .then((result) => res.status(200).send(result))
    //         .catch((erro) => res.status(400).send({ Status: "Erro" }));
    // },

    // API PARA EDITAR UMA DETERMINADA MEDIDA
    async EditarMedidaUnt(req, res) {
        await db("Medida_Unt")
            .where({ idMedida_Unt: req.params.id })
            .update(req.body)
            .then(() => res.status(200).send({ Status: "Editado com sucesso!" }))
            .catch(() => res.status(400).send({ status: "ERRO" }));
    },

    // API PARA DELETAR UMA DETERMINADA MEDIDA
    async DeletarMedidaUnt(req, res) {
        await db("Medida_Unt")
            .where({ idMedida_Unt: req.params.id })
            .delete()
            .then(() => res.status(200).send({ Status: "Medida excluída" }))
            .catch(() => res.status(400).send({ status: "ERRO" }));
    },

    // ============== PESQUISA PARA BUSCAR POR UM DETERMINADO REGISTRO ==============
    async buscarID(req, res) {
        await db("Medida_Unt")
            .where({ idMedida_Unt: req.params.id })
            .then((result) => res.status(200).send(result))
            .catch((erro) => res.status(400).send({ Status: "Erro" }));
    },

    // ============ API PARA LISTAR AS MEDIDAS DE UM DETERMINADO GRUPO DE MEDIDAS ==============
    async ListarMedidasPorGrupo(req, res) {
        await db
            .select("Medida_Unt.*",
                db.raw("case when (Medida_Unt.IdFechadura = Fechadura.IdFechadura) then Fechadura.nome  end as Nome_Fechadura"),
                db.raw("case when (Medida_Unt.IdPivotante = Pivotante.IdPivotante) then Pivotante.Nome  end as Nome_Pivotante"),
                db.raw("case when (Medida_Unt.IdDobradica = Dobradica.IdDobradica) then Dobradica.Nome  end as Nome_Dobradica"),
                db.raw("case when (Medida_Unt.IdCod_Referencia = Cod_Referencia.IdCod_Referencia) then Cod_Referencia.Codigo  end as Cod_Referencia"))
            // .select(db.raw("case when (Medida_Unt.IdFechadura = Fechadura.IdFechadura) then Fechadura.nome  end as Nome_Fechadura"))
            .table("Medida_Unt")
            .join("Grupo_Medidas", "Medida_Unt.idGrupo_Medidas", "=", "Grupo_Medidas.idGrupo_Medidas")
            .join("Dobradica", "Medida_Unt.idDobradica", "=", "Dobradica.idDobradica")
            .join("Fechadura", "Medida_Unt.idFechadura", "=", "Fechadura.idFechadura")
            .join("Cod_Referencia", "Medida_Unt.idCod_Referencia", "=", "Cod_Referencia.idCod_Referencia")
            .join("Pivotante", "Medida_Unt.idPivotante", "=", "Pivotante.idPivotante")
            .where('Grupo_Medidas.idGrupo_Medidas', req.params.idGrupo)
            .then((result) => res.status(200).send(result))
            .catch((erro) => res.status(400).send({ Status: "Erro ao listar o grupo de medidas" }));
    },
}