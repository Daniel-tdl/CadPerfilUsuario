const app = require('express')()
const consign = require('consign')
const db = require('./config/db')

app.db = db

consign()
    .include('./config/passaport.js')
    .then('./config/middlewares.js')
    .then('./api/validacoes.js')
    .then('./api')
    .then('./config/routers.js')
    .into(app)

app.listen(3000, () => {
    console.log('Backend executando...')
}) 