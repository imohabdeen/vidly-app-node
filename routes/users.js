
const auth = require('../middleware/auth');
const jwt = require('jwt');
const config = require('config');
const _ = require('lodash');
const {User, validate } = require('../models/user');
const mongoose = require('mongoose');
const express = require('express');
const bcrypt = require('bcrypt');
const router = express.Router();

// Get current user
router.get('/me',auth, async (req,res)=>{
const user = await User.findById(req.user._id).select('-password');
res.send(user);
});


router.post('/', async (req, res) => {
    const {
        error
    } = validate(req.body);
    if (error) return res.status(400).send(error.details[0].message);

    let user = await User.findOne({
        email: req.body.email
    }); //let -> define variable instead of constant
    if (user) return res.status(400).send('User already registered.');

    user = new User({
        name:req.body.name,
        email:req.body.email,
    });

    const salt = await bcrypt.genSalt(10);
    user.password = await bcrypt.hash(req.body.password,salt);
    await user.save();
    res.send(user); // return the whole new user object includes password property \
    
    // Instead user except the password
    res.send({
        name:user.name,
        email:user.email
    })

    const token = user.generateAuthToken();
    //const token = jwt.sign({_id:user._id},config.get('jwtPrivateKey'))
    //using lodash 
    res.header('x-auth-token',token).send(_.pick(user,['_id','name','email']));
});

module.exports = router;