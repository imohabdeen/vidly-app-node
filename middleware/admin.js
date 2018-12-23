function admin (req,res,next){

    // 401 Unauthorized 
    // 403 Forbidden - valid token but you can not access this resource
    if(!req.user.isAdmin) return res.status(403).send('Access Denied');

    next();
}

module.exports = admin;