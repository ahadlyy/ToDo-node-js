// console.log(process.argv)
const fs = require('fs')
const command = process.argv[2]
if(command=="create")
{
    const added = process.argv[3]
   let todos = JSON.parse(fs.readFileSync('./ToDo.json',{encoding: 'utf8'}))
   todos.push({Titel:added})
   fs.writeFileSync('./ToDo.json',JSON.stringify(todos))
}
else if(command=="list")
{
   let todos = JSON.parse(fs.readFileSync('./ToDo.json',{encoding: 'utf8'}))
   console.log(todos)
}
else if(command=="update")
{
    const oldvalue = process.argv[3]
   let todos = JSON.parse(fs.readFileSync('./ToDo.json',{encoding: 'utf8'}))
   let index = todos.findIndex((todo) => todo.Titel === oldvalue);
   const newvalue = process.argv[4]
   todos[index] = ({Titel:newvalue})
   fs.writeFileSync('./ToDo.json',JSON.stringify(todos))
}
else if(command=="delete")
{
    const target = process.argv[3]
   let todos = JSON.parse(fs.readFileSync('./ToDo.json',{encoding: 'utf8'}))
   let index = todos.findIndex((todo) => todo.Titel === target);
   todos.splice(index,1)
   fs.writeFileSync('./ToDo.json',JSON.stringify(todos))
}