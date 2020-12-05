const db = require("../database/conexao.js");
const Jwt = require("jsonwebtoken");
const authConfig = require('../auth/config.json')

function generateToken(params = {}) {
    return Jwt.sign(params, authConfig.secret, {
        expiresIn: 18200,
    })
};

module.exports = {

    // =================== CADASTRAR USUÁRIO NO BANCO ====================
    async cadastrar(req, res) {
        await db
            .insert(req.body)
            .into("Usuario")
            .then(() => res.status(201).send({ status: "Cadastrado com sucesso" }))
            .catch(() => res.status(400).send({ status: "Erro ao cadastrar!!" }));
    },

    // =========== DELETA O USUÁRIO DO BANCO DE DADOS ===========
    async deletar(req, res) {
        await db("Usuario")
            .where({ IdUsuario: req.params.id })
            .del()
            .then(() => res.status(200).send({ Status: "OK" }))
            .catch(() => res.status(400).send({ status: "ERRO" }));
    },

    // =========== VERIFICA SE O E-MAIL ESTÁ DISPONÍVEL PARA CADASTRAR USUÁRIO ===========
    async VerificarEmailDisponivel(req, res) {
        if (req.body.Email == null)
            res.status(400).send({ validou: "Erro, o campo email esta vazio" });
        else {
            const result = await db("Usuario").where({
                Email: req.body.Email,
            });

            if (result.length != 0) res.status(400).send({ validou: "E-mail já está sendo usado" });
            else res.status(200).send({ validou: "E-mail disponível!" });
        }
    },

    // ====================== LOGIN NO APLICATIVO =======================
    async Login(req, res) {
        const { Email, Senha } = req.body;
        if (Email == null || Senha == null)
            res
            .status(400)
            .send({ validou: "Erro, o campo email ou senha estão nulo" });
        else {
            const result = await db
                .select()
                .table("Usuario")
                .where({
                    Email: Email,
                    Senha: Senha,
                });

            if (result.length == 0) res.status(400).send({ validou: false });
            else res.status(200).send({ validou: "Usuario Logado com sucesso", token: generateToken({ IdUsuario: result.IdUsuario }), result });
        }

    },

    // =============== ALTERAR A SENHA DO E-MAIL INFORMADO ================
    async AlterarSenha(req, res) {
        db('Usuario')
            .where({ Email: req.params.Email })
            .update(req.body)
            .then(() => res.status(201).send({ Status: "Senha alterada com sucesso!" }))
            .catch(() => res.status(400).send({ status: "ERRO" }));
    },

    // =============== SELECIONA OS USUÁRIOS ================
    async ListarUsuarios(req, res) {
        db('Usuario')
            .then((result) => res.status(200).send(result))
            .catch(() => res.status(400).send({ status: "ERRO" }));
    },

    // =============== SELECIONA OS USUÁRIOS ================
    async buscarIdUsuario(req, res) {
        await db
            .select("IdUsuario")
            .table("Usuario")
            .where({ Email: req.params.EmailUser })
            .then((result) => res.status(200).send(result))
            .catch((erro) => res.status(400).send({ Status: "Erro" }));
    },

    // ==== CAPTURA O ID DA EMPRESA ATRAVÉS DO IDUSUARIO =====
    async BuscaEmpresaPorUsuario(req, res) {
        await db
            .select("IdEmpresa")
            .table("Usuario")
            .where({ "Usuario.IdUsuario": req.params.IdUsuario })
            .then((result) => {
                res.status(200).send(result);
            })
            .catch((erro) => res.status(400).send({ Status: "Erro" }));
    },

    // ============ API PARA EDITAR OS DADOS DO USUÁRIO ============
    async Editar(req, res) {
        await db('Usuario')
            .where({ IdUsuario: req.params.IdUsuario })
            .update(req.body)
            .then(() => res.status(200).send({ Status: "Editado com sucesso!!" }))
            .catch(() => res.status(400).send({ status: "ERRO" }));
    },

    // ==== API PARA CONCEDER PIVILÉGIOS DE ADMINISTRADOR PARA O USUÁRIO =====
    async VerificaCodAdmUsuario(req, res) {
        await db
            .select("Adm")
            .table("Usuario")
            .where({ "Usuario.IdUsuario": req.params.IdUsuario })
            .then((result) => {
                res.status(200).send(result);
            })
            .catch((erro) => res.status(400).send({ Status: "Erro" }));
    },

    // ===== API Para buscar o codigo da EMP no banco de dados ======
    async BuscaUsuarioLogado(req, res) {
        await db
            .select()
            .table("Usuario")
            .where({ IdUsuario: req.params.IdUsuario })
            .then((result) => res.status(200).send(result))
            .catch((erro) => res.status(400).send({ Status: "Erro" }));
    },


    // ==== API PARA BUSCAR OS DADOS DO USUÁRIO ATRAVÉS DO IDUSUARIO =====
    async BuscaUsuarioPorId(req, res) {
        await db
            .select()
            .table("Usuario")
            .where({ IdUsuario: req.params.IdUsuario })
            .then((result) => res.status(200).send(result))
            .catch(() => res.status(400).send({ status: "ERRO" }));
    },

    // =========== CAPTURA O ULTIMO USUÁRIO CADASTRADO ============
    async BuscaUltimoUsuarioCadastrado(req, res) {
        await db
            .select()
            .table("Usuario")
            .max("IdUsuario")
            .then((result) => res.status(200).send(result))
            .catch(() => res.status(400).send({ status: "ERRO ao buscar o usuário logado" }));
    },

};