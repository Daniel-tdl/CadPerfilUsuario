const { authSecret } = require('../.env')
const passport = require('passport')
const passportJwt = require("passport-jwt")
const { Strategy, ExtractJwt } = passportJwt

module.exports = app => {
    const parans = {
        secretOrKey: authSecret,
        jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken()
    }

    const strategy = new Strategy(parans, (payload, done) => {
        app.db('usuarios')
            .where({ id: payload.id})
            .first()
            .then(user => done(null, user? { ...payload }: false))
            .catch(err => done(err, false))
    })

    passport.use(strategy)

    return { 
        authenticate: () => passport.authenticate('jwt', { session: false })
    }
}