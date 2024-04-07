const fs = require('fs')
const express = require('express')
const app = express()

app.use(express.json()) //middelware

const port=1690
app.listen(port,()=>{
    console.log(`server listening  on port ${port}`)
})

app.get("/ToDo",(req,res)=>{
     let todos = JSON.parse(fs.readFileSync('./ToDo.json',{encoding: 'utf8'}))
     res.json(todos)
})

app.post("/ToDo",(req,res)=>{
    let added = req.body
    let todos = JSON.parse(fs.readFileSync('./ToDo.json',{encoding: 'utf8'}))
   todos.push(added)
   fs.writeFileSync('./ToDo.json',JSON.stringify(todos))
   res.json(todos)
})

app.delete("/ToDo",(req, res)=>{
    let deleted = req.body.Titel
    let todos = JSON.parse(fs.readFileSync('./ToDo.json', { encoding: 'utf8' }))
    let index = todos.findIndex((todo) => todo.Titel === deleted)
    if (index !== -1) {
        todos.splice(index, 1)
        fs.writeFileSync('./ToDo.json', JSON.stringify(todos))
        res.json({ message: `Todo with title "${deleted}" has been deleted` })
    } else {
        res.status(404).json({ error: `Todo with title "${deleted}" not found` })
    }
})

app.put("/ToDo", (req, res) => {
    const oldTitle = req.body.Titel
    const newTitle = req.body.newTitle
    let todos = JSON.parse(fs.readFileSync('./ToDo.json', { encoding: 'utf8' }))
    const index = todos.findIndex(todo => todo.Titel === oldTitle)
    if (index !== -1) {
        todos[index].Titel = newTitle
        fs.writeFileSync('./ToDo.json', JSON.stringify(todos))
        res.json({ message: `Todo with title "${oldTitle}" has been updated to "${newTitle}"` })
    } else {
        res.status(404).json({ error: `Todo with title "${oldTitle}" not found` })
    }
})