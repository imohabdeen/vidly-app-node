const Joi = require('joi');
const mongoose = require('mongoose');
const config = require('config');
const jwt = require('jwt');

const userSchema = new mongoose.Schema({
    name:{
        type:String,
        required:true,
        minlength:5,
        maxlength:50
    },
    email:{
        type:String,
        required:true,
        minlength:5,
        maxlength:250,
        unique:true
    },
    password:{
        type:String,
        required:true,
        minlength:5,
        maxlength:1024,
        unique:true
    },
    isAdmin : Boolean
})

userSchema.methods.generateAuthToken = function(){
    const token = jwt.sign({_id:this._id},config.get('jwtPrivateKey'))
    return token;
}

const User = mongoose.model('User',userSchema);

function validateUser(user){
    const schema ={
        name:Joi.string().minlength(5).maxlength(50).required(),
        email:Joi.string().minlength(5).maxlength(255).required().email(),
        password:Joi.string().minlength(5).maxlength(255).required(), //Before hashing
    };  
    return Joi.validate(user,schema);
}

exports.User = User;
exports.validate = validateUser;