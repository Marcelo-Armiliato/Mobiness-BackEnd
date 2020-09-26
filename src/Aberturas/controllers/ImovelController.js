const db = require("../database/conexao.js");

module.exports = {

    // =========== VERIFICA SE O IMÓVEL ESTÁ DISPONÍVEL PARA SER CADASTRADO ============
    // CASO O IMÓVEL ESTEJA DISPONÍVEL, EFETUA DIRETAMENTE O CADASTRO DELE

    async VerificarECadastraImovel(req, res) {
        if (req.body.Nome == "")
            res.status(400).send({ validou: "Erro, o campo nome do imóvel esta vazio" });
        else {
            const result = await db("Imovel").where({
                nome: req.body.Nome,
            });

            if (result.length != 0) res.status(400).send({ validou: "Este imóvel já está cadastrado" });
            else {
                res.status(200).send({ validou: "Imóvel disponível para o cadastro!" });

                // Cadastra o imóvel no banco de dados
                await db
                    .insert(req.body)
                    .into("Imovel")
                    .then(() =>
                        res.status(201).send({ status: "Cadastrado com sucesso!!" })
                    )
                    .catch(() =>
                        res.status(400).send({ status: "Erro ao tentar cadastrar !!" })
                    );
            }
        }
    },

    // ============== EDIÇÃO DO REGISTRO GRAVADO NO BANCO DE DADOS ==============
    async editar(req, res) {
        await db("Imovel")
            .where({ idimovel: req.params.id })
            .update(req.body)
            .then(() => res.status(200).send({ Status: "OK" }))
            .catch(() => res.status(400).send({ status: "ERRO" }));
    },

    // ============== APAGAR DETERMINADO REGISTRO DO BANCO DE DADOS ==============
    async deletar(req, res) {
        await db("Imovel")
            .where({ idimovel: req.params.id })
            .del()
            .then(() => res.status(200).send({ Status: "OK" }))
            .catch(() => res.status(400).send({ status: "ERRO" }));
    },

    // ============== PESQUISA PARA VERIFICAR SE UM DETERMINADO REGISTRO JÁ EXISTE ==============
    async BuscarPorNome(req, res) {
        await db("Imovel")
            .where({ Nome: req.params.Nome })
            .then((result) => res.status(200).send(result))
            .catch((erro) => res.status(400).send({ Status: "Erro" }));
    },

    // ============== LISTAGEM DOS REGISTROS GRAVADOS NO BANCO DE DADOS ==============
    async listarTodosRegistros(req, res) {
        await db
            .select()
            .table("Imovel")
            .orderBy("idImovel", "desc")
            .then((result) => {
                res.status(200).send(result);
            })
            .catch((erro) => res.status(400).send({ Status: "Erro" }));
    },

    // =============== EDIÇÃO DO REGISTRO GRAVADO NO BANCO DE DADOS ================
    async buscarProxID(req, res) {
        const result = await db("Imovel").max("idImovel as len");

        res.status(200).send(result.map((mp) => mp.len + 1));
    },

};