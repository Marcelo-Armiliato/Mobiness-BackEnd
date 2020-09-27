const db = require("../database/conexao.js");

module.exports = {
    // API PARA CADASTRAR O GRUPO DE MEDIDAS
    async cadastrarGrupoMedidas(req, res) {
        if (req.body.endereco != "") {
            if (req.body.idusuario != "") {
                if (req.body.idImovel != "") {
                    if (req.body.num_endereco != "") {
                        if (req.body.proprietario != "") {
                            await db
                                .insert(req.body)
                                .into("Grupo_Medidas")
                                .then(() => res.status(201).send({ status: "Cadastrado com sucesso" }))
                                .catch(() => res.status(400).send({ status: "Erro ao cadastrar!!" }));
                        } else {
                            res.status(400).send({
                                salvou: false,
                                erro: "É obrigatorio preencher o proprietario",
                            });
                        }
                    } else {
                        res.status(400).send({
                            salvou: false,
                            erro: "É obrigatorio preencher o numero do endereço",
                        });
                    }
                } else {
                    res.status(400).send({
                        salvou: false,
                        erro: "o id imovel e invalido",
                    });
                }
            } else {
                res.status(400).send({
                    salvou: false,
                    erro: "o id usuario e invalido",
                });
            }
        } else {
            res.status(400).send({
                salvou: false,
                erro: "É obrigatorio preencher o endereço",
            });
        }
    },
    // API LISTAR OS GRUPOS DE MEDIDAS CADASTRADOS
    async listarTodosGrupoMedidas(req, res) {
        await db
            .select()
            .table("Grupo_Medidas")
            .where({ "Grupo_Medidas.IdUsuario": req.params.IdUsuario })
            .orderBy("IdGrupo_Medidas", "desc")
            .then((result) => {
                res.status(200).send(result);
            })
            .catch((erro) => res.status(400).send({ Status: "Erro" }));
    },

    // API LISTAR OS GRUPOS DE MEDIDAS CADASTRADOS
    async ListaUltimoGrupoCadastrado(req, res) {
        await db
            .select()
            .table("Grupo_Medidas")
            .max("IdGrupo_Medidas")
            .then((result) => {
                res.status(200).send(result);
            })
            .catch((erro) => res.status(400).send({ Status: "Erro" }));
    },

    // API PARA EDITAR UM DETERMINADO GRUPO DE MEDIDAS
    async EditarGrupoMedidas(req, res) {
        await db("Grupo_Medidas")
            .where({ idGrupo_Medidas: req.params.id })
            .update(req.body)
            .then(() => res.status(200).send({ Status: "OK" }))
            .catch(() => res.status(400).send({ Status: "ERRO" }))
    },

    // API PARA DELETAR UM DETERMINADO GRUPO DE MEDIDAS
    async deletarGrupoMedidas(req, res) {
        await db("Grupo_Medidas")
            .where({ idGrupo_Medidas: req.params.id })
            .del()
            .then(() => res.status(200).send({ Status: "OK" }))
            .catch(() => res.status(400).send({ status: "ERRO" }));
    },

    // API PARA LISTAR GRUPOS QUE ESTÃO COM PROCESSO FINALIZADO DE MEDIDAS
    async selecionaGruposComProcessoFinalizado(req, res) {
        await db
            .select()
            .table("Grupo_Medidas")
            .where({ Status_Processo: "Finalizado" })
            .andWhere({ IdUsuario: req.params.IdUsuario })
            .then((result) => res.status(200).send(result))
            .catch((erro) => res.status(400).send({ Status: "Erro" }));
    },

    // API PARA LISTAR GRUPOS QUE ESTÃO COM PROCESSO ENVIADO DE MEDIDAS
    async selecionaGruposComProcessoEnviado(req, res) {
        await db
            .select()
            .table("Grupo_Medidas")
            .where({ Status_Processo: "Enviado" })
            // .andWhere({ IdUsuario: req.params.IdUsuario })
            .then((result) => res.status(200).send(result))
            .catch((erro) => res.status(400).send({ Status: "Erro" }));
    },

    // ALTERA O STATUS DO CAMPO "PROCESSO_FINALIZADO"
    async AlterarEstadoProcessoFinalizado(req, res) {
        db('Grupo_Medidas')
            .where({ IdGrupo_Medidas: req.params.id })
            .update({ Status_Processo: "Finalizado" })
            .then(() => res.status(201).send({ Status: "Status do processo alterado!" }))
            .catch(() => res.status(400).send({ status: "ERRO" }));
    },

}