const Joi = require('joi');
const mongoose = require('mongoose');
const genreSchema = require('./genre');

const Movie = mongoose.model('Movie',new mongoose.Schema({
    title:{
        type:String,
        required:true,
        trim:true,
        minlength:5,
        maxlength:255
    },
    genre:{
        type:genreSchema,
        required:true
    },
    numberInStock:{
        type:Number,
        required:true,
        min:0,
        max:255
    },
    dailyRentalRate:{
        type:Number,
        required:true,
        min:0,
        max:255
    }
}));

async function validateMovie(movie){
    const schema ={
        title:Joi.string().minlength(5).maxlength(255).required(),
        genreId:Joi.string().required(), // It is client validation, so we need the client to only send the genreId
        numberInStock :Joi.number().min(0).max(255).required(),
        dailyRentalRate:Joi.number().min(0).max(255).required()
    }
    return Joi.validate(movie,schema);
}

exports.Movie = Movie;
exports.validate = validateMovie;



