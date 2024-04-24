const mongoose = require('mongoose');

let usersSchema = mongoose.Schema({
    username:{
        type:String,
        unique:true,
        required:true,
        minLength:8
    },
    password:{
        type:String,
        required:true
    },
    firstName:{
        type:String,
        required:true,
        minLength:3,
        maxLength:15
    },
    lastName:{
        type:String,
        required:true,
        minLength:3,
        maxLength:15
    },
    dateofbirth:{
        type:Date
    }
})

const userModel=mongoose.model('users', usersSchema);
module.exports = userModel;