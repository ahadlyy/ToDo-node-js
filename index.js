const fs = require('fs')
const express = require('express')
const mongoose = require('mongoose')
const todoRouter = require('./routes/todos')
const app = express();
app.use(express.json());
app.use('/todos',todoRouter);

const dbUrl = `mongodb://127.0.0.1:27017/todoDB`
mongoose.connect(dbUrl).then(()=>{
    console.log('connected to DB successfully')
}).catch(err => console.log(err) );


const port = 1690 
app.listen(port,()=>{
    console.log(`server listening  on port ${port}`)
})
