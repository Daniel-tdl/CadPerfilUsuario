module.exports = app => {
    app.route('/usuario')
        .post(app.api.usuario.save)
}