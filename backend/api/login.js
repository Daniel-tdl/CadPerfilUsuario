const { autthSecret } = require('../.env')
const jwt = require('jwt-simple')
const bcrypt = require('bcrypt-nodejs')

module.exports = app => {
    const signin = async (req, res) => {
        if (!req.body.usuario || !req.body.senha) {
            return res.status(400).send('Usuário ou senha não informado!')
        }

        const usuario = await app.db('usuarios')
            .where({ usuario: req.body.usuario })
            .first() 

        if (!usuario) return res.status(400).send('Usuário não encontrado!')

        const ehSenhaIguais = bcrypt.compareSync(req.body.senha, usuario.senha)
        if (!ehSenhaIguais) return res.status(401).send('Usuário/senha inválidos!')

        const now = Math.floor(Date.now() / 1000 )
        const payLoad = {
            nome: usuario.nome,
            usuario: usuario.usuario,
            iat: now,
            exp: now + (60 * 60 * 24 * 3)
        }

        res.json({
            ...payLoad, 
            token: jwt.encode(payLoad, autthSecret)
        })
    }

    const validarToken = async (req, res) => {
        const userData = req.body || null
        try {
            if (userData) {
                const token = jtw.decode(userData.token, autthSecret)
                if (new Date(token.exp * 1000) > new Date()) {
                    return res.send(true)
                }
            }           
        } catch (error) {
            //problema com o tokem
        }

        res.send(false)
    }

    return { signin, validarToken}
}
