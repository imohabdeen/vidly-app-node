
const jwt = require('jwtwebtoken');
const config = require('config');

function auth(req , res, next){
    const token = req.header('x-auth-token');

    if(!token) res.status(401).send('Access Denied not valid token');
    try {
        const decodedPayload = jwt.verify(token,config.get('jwtPrivateToken'));
        req.user = decodedPayload;
        next();
    } catch (ex) {
        res.status(400).send('Invalid Token');
    }

}