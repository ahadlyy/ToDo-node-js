const fs = require('fs');
const todoModel = require('../models/todos');

exports.getAllTodos=async function (req,res){
    const {skip,limit} = req.query
    console.log( req.query)
    try{
        const todos = await todoModel.find().skip(skip).limit(limit)
        res.status(200).json(todos)
    }catch(err){
        res.json(err.message)
    }
}


exports.addTodoswithid = async function (req, res) {
    const { title, tags, userId } = req.body;
    try {
        const newTodo = new todoModel.create({ title, tags, userId });
        console.log(newTodo)
        await newTodo.save();
        res.status(201).json({ todo: newTodo });
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Internal Server Error', message: err.message });
    }
}

exports.updateTodo=async function (req,res){
    const params =req.params.id
    const updateTodo = req.body
    try {
        const updatedTodo = await todoModel.findByIdAndUpdate(params, updateTodo, { new: true })

        if (updatedTodo) {
            res.json(updatedTodo)
        } else {
            res.status(404).json({ error: 'todo not found' })
        }
    } catch (err) {
        res.status(500).json({ error: 'Internal Server Error' })
    }
}

exports.deleteTodo=async function (req,res){
    const targetid =req.params.id;
    console.log(targetid)
    const deletedTodo=await todoModel.findByIdAndDelete(targetid)
    console.log(deletedTodo);
    if(deletedTodo){
        res.status(204).json({
            status:204,
            message:`Deleted successfully`,
            data:null
        });
    }else{
        res.status(404).json({
            status:404,
            message:`not fuound`,
            data:null
        })
    }
}

exports.getTodoById=async function (req,res){
    const params =req.params.id;
    try {
        const todo = await todoModel.findById(params)
        console.log(todo)
        if (todo) {
            res.json(todo)
        } else {
            res.status(404).json({ error: 'todo not found' })
        }
    } catch (err) {
        console.log(err)
        res.status(500).json({ error: 'Internal Server Error' })
    }
}


