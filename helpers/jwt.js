const expressJwt = require('express-jwt');

function authJwt() {
    const secret = process.env.secret;
    const api = process.env.API_URL;

    return expressJwt({
        secret,
        algorithms: ['HS256'],
        isRevoked: isRevoked
    }).unless({
        path: [
            // Public routes that do not need authentication
            { url: /\/api\/v1\/products(.*)/, methods: ['GET', 'OPTIONS']},
            { url: /\/api\/v1\/categories(.*)/, methods: ['GET', 'OPTIONS']},
            { url: `${api}/users/login`, methods: ['POST'] },
            { url: `${api}/users/register`, methods: ['POST'] },
        ]
    });
}

async function isRevoked(req, payload, done) {
    if(!payload.isAdmin) {
        done(null, true)
    }
    done();
}

module.exports = authJwt;
