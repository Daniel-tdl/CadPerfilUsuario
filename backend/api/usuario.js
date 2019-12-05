module.exports = app => {
    const save = (req, res) => {
        res.send('usuário salvo')
    }

    return { save }
}