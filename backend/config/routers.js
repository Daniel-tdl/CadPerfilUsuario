module.exports = app => {
    app.route('/usuarios')
        .post(app.api.usuario.save)
        .get(app.api.usuario.get)

    app.route('/usuarios/:id')
        .put(app.api.usuario.save)

    app.route('/usuarios/excluir/:id')
        .delete(app.api.usuario.excluir)

    app.route('/usuarios/getUsuarioById/:id')
        .get(app.api.usuario.getUsuarioById)
}