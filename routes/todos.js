const express = require('express');
const todosController = require('../controllers/todos')
const router = express.Router();


router.route('/:id')
.get(todosController.getTodoById);

router.route('/')
.get(todosController.getAllTodos)
.post(todosController.addTodos)
.patch(todosController.updateTodo)
.delete(todosController.deleteTodo);



module.exports = router;