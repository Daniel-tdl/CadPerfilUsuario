const bcrypt = require('bcrypt-nodejs')
const config = require('../knexfile.js')
const knex = require('knex')(config)

module.exports = app => {
    const { existeOuErro, notExisteOuErro } = app.api.validacoes

    const criptografarSenha = senha => {
        const salt = bcrypt.genSaltSync(10)
        return bcrypt.hashSync(senha, salt)
    }

    const save = async (req, res) => {
        const usuario = { ...req.body }
        if (req.params.id) usuario.id = req.params.id

        try {
            existeOuErro(usuario.nome, 'Nome não informado')
            existeOuErro(usuario.senha, 'Senha não informado')
            existeOuErro(usuario.usuario, 'Usuario não informado')
  
            const usuarioDB = await app.db('usuarios')
                .where({ usuario: usuario.usuario }).first()
            if (!usuario.id) {
                notExisteOuErro(usuarioDB, 'Usuário já cadastrado')
            }   
        } catch (msg) {
            return res.status(400).send(msg)
        }
        
        usuario.senha = criptografarSenha(usuario.senha)    
        
        if (usuario.id) {
            app.db('usuarios')
                .update(usuario)
                .where({ id: usuario.id })
                .then(_ => res.status(204).send(usuario))
                .catch(err => res.status(500).send(err))
        } else{
            app.db('usuarios')
                .insert(usuario)
                .then(_ => res.status(204).send(usuario))
                .catch(err => res.status(500).send(err))
        }  
    }

    const get = (req, res) => {
        app.db('usuarios')
        .select('id', 'nome', 'usuario')
        .then(users => res.json(users))
        .catch(err => res.status(500).send(err))
    }

    const getUsuarioById = (req, res) => {
        app.db('usuarios')
        .select('id', 'nome', 'usuario')
        .where({ id: req.params.id })
        .first()
        .then(user => res.json(user))
        .catch(err => res.status(500).send(err))
    }

    const excluir = async (req, res) => {
        try {
            app.db('usuarios')
                .where({ id: req.params.id })
                .del()

            res.status(204).send()
        } catch(msg) {
            res.status(400).send(msg)
        }
    }

    return { save, get, getUsuarioById, excluir }
}

