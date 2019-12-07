module.exports = app => {
    app.post('/signin', app.api.login.signin)
    app.post('/signup', app.api.usuario.save)
    app.post('/validarToken', app.api.login.validarToken)

    app.route('/usuarios')
        .all(app.config.passaport.authenticate())
        .post(app.api.usuario.save)
        .get(app.api.usuario.get)

    app.route('/usuarios/:id')
    .all(app.config.passaport.authenticate())
        .put(app.api.usuario.save)

    app.route('/usuarios/excluir/:id')
        .all(app.config.passaport.authenticate())
        .delete(app.api.usuario.excluir)

    app.route('/usuarios/getUsuarioById/:id')
        .all(app.config.passaport.authenticate())
        .get(app.api.usuario.getUsuarioById)
}