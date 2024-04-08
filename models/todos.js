const mongoose = require('mongoose');
let todosSchema = mongoose.Schema({
    title:{
        type:String,
        unique:true,
        required:true,
        minLength:4,
        maxLength:20
    },
    status:{
        type:String,
        enum:["completed", "in progress", "done"],
        default:'in progress'
    }
});

const todoModel=mongoose.model('todos', todosSchema);
module.exports = todoModel;