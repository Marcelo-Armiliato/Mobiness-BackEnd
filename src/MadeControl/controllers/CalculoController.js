const db = require("../database/conexao.js");

module.exports = {
    async cadastrar(req, res) {
        if (req.body.diametroMenor == null)
            res.status(400).send({
                validou: false,
                msg: "Erro, o campo 'diametroMenor' é informação obrigatória",
            });
        else if (req.body.comprimento == null)
            res.status(400).send({
                validou: false,
                msg: "Erro, o campo 'comprimento' é informação obrigatória",
            });
        else if (req.body.resultado == null)
            res.status(400).send({
                validou: false,
                msg: "Erro, o campo 'resultado' é informação obrigatória",
            });
        else {

            const salvar = {
                diametroMenor: req.body.diametroMenor,
                comprimento: req.body.comprimento,
                resultado: req.body.resultado,
            };

            await db
                .insert(salvar)
                .into("Calculo")
                .then(() =>
                    res.status(201).send({ status: "Cadastrado com sucesso!!" })
                )
                .catch(() =>
                    res.status(400).send({ status: "Erro ao tentar cadastrar !!" })
                );
        }
    },
    async listarTodos(req, res) {
        await db("Calculo")
            .where({ idLote: req.params.id })
            .then((result) => res.status(200).send(result))
            .catch((erro) =>
                res.status(400).send({ msg: "Erro, consulta não pode ser realizada!!" })
            );
    },
    async deletar(req, res) {
        await db("Calculo")
            .where({ idCalculo: req.params.id })
            .del()
            .then(() => res.status(200).send({ status: "OK" }))
            .catch(() => res.status(400).send({ status: "ERRO" }));
    },

    async listar(req, res) {
        await db("Calculo")
            .where({ idCalculo: req.params.id })
            .then((result) => res.status(200).send(result))
            .catch((erro) =>
                res.status(400).send({ msg: "Erro, consulta não pode ser realizada!!" })
            );
    },

    async deletarCalculos(req, res) {

        await db("Calculo")
            .whereNull('idLote')
            .del()
            .then(() => res.status(200).send({ status: "OK" }))
            .catch(() => res.status(400).send({ status: "Erro" }));

    },
};