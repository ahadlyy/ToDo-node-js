const express = require('express');
const todosController = require('../controllers/todos')
const router = express.Router();


router.route('/:id')
.get(todosController.getTodoById)
.post(todosController.addTodoswithid)
.delete(todosController.deleteTodo);

router.route('/')
.get(todosController.getAllTodos)
.patch(todosController.updateTodo)




module.exports = router;