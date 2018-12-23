const jwt = require('jsonwebtoken');
const config = require('config')
const _ = require('lodash');
const {User, validate } = require('../models/user');
const mongoose = require('mongoose');
const express = require('express');
const bcrypt = require('bcrypt');
const router = express.Router();



router.post('/', async (req, res) => {
    const {
        error
    } = validate(req.body);
    if (error) return res.status(400).send(error.details[0].message);

    let user = await User.findOne({
        email: req.body.email
    }); //let -> define variable instead of constant
    if (user) return res.status(400).send('Invalid email or password.');

    const validPassword = await bcrypt.compare(req.body.password,user.password);
    if(!validPassword) return res.status(400).send('Invalid email or password.');

    // payload, privatekey (should be saved in environment variables)
    const token = jwt.sign({_id:user._id},config.get('jwtPrivateKey'))
    const token = user.generateAuthToken();
    res.send(token);
});


function validate(req){
    const schema ={
        email:Joi.string().minlength(5).maxlength(255).required().email(),
        password:Joi.string().minlength(5).maxlength(255).required(), //Before hashing
    };  
    return Joi.validate(user,schema);
}

module.exports = router;