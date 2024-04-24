const fs = require('fs');
const express = require('express');
const mongoose = require('mongoose');

const todoRouter = require('./routes/todos')
const userRouter = require('./routes/users')

const app = express();


app.use(express.json());

app.use('/todos', todoRouter)
app.use('/users', userRouter)

app.use(express.static('./static'))

app.use("*", (req, res, next) => {
    res.status(404).json({
        status: "fail",
        message: `${req.originalUrl} is not supported`
    });
});

const dbUrl = `mongodb://127.0.0.1:27017/todoDB`
mongoose.connect(dbUrl, { useNewUrlParser: true, useUnifiedTopology: true }).then(() => {
    console.log('connected to DB successfully')
}).catch(err => console.log(err))


const port = 1690;
app.listen(port, () => {
    console.log(`server listening on port ${port}`)
});
