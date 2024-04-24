const mongoose = require('mongoose')
const todosSchema = mongoose.Schema({
    title: {
        type: String,
        unique: true,
        required: true,
        minLength: 4,
        maxLength: 20
    },
    status: {
        type: String,
        enum: ["new", "in progress", "done"],
        default: 'new'
    },
    userId: {
        type: mongoose.Schema.ObjectId,
        ref: 'users'
    }
}, { timestamps: true }); // Adding timestamps option

const todoModel = mongoose.model('todos', todosSchema);
module.exports = todoModel;
