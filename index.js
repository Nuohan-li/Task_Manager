const express = require('express')
const util = require('util')
const exec  = util.promisify(require('child_process').exec)
const Task = require('./src/db/task')

// automatically connects to the database
// require('./src/db/mongoose')
const mongoose = require('mongoose')

mongoose.connect('mongodb://127.0.0.1:27017/task-db-mongoose', {
    useNewUrlParser: true 
})

// run command to start the database
// cd ../school/side-project/mongodb-linux-x86_64-ubuntu2004-5.0.6/bin
console.log('db is running now')

const app = express()
const port = process.env.PORT || 5000

// automatically parse incoming json to an object, when user use http POST to send a json object, it will be 
// parsed save in req.body 
app.use(express.json())

// allows client side JS file to be loaded
app.use("/views", express.static(__dirname + '/views'));

app.delete('/tasks/:id', async (req, res) => {
    try {
        const task = await Task.findByIdAndDelete(req.params.id)

        if(!task){
            res.status(404).send({error: 'no such user'})
        }

        res.send(task)
    } catch (error) {
        res.status(500).send({error: 'error'})
    }
})

app.post('/tasks', (req, res) => {
    const task = new Task(req.body)
    task.save().then((result) => {
        console.log(task)
        res.send(task)
    }).catch( (error) => {
        res.status(400).send(error)
    })
})

// getting all tasks
app.get('/tasks', (req, res) => {
    Task.find({}).then((result) => {
        res.send(result)    
    }).catch( (error) => {
        res.status(400).send(error)
    })
})

// getting 
app.get('/tasks/:id', (req, res) => {
    Task.findById(req.params.id.toString()).then( (result) => {
        res.send(result)
    }).catch( (error) => {
        res.status(400).send(error)
    })
})

app.patch('/tasks/:id', async (req, res) => {
    try {
        const task = await Task.findByIdAndUpdate(req.params.id.toString(), req.body, {new: true, runValidators: true})

        if(!task){
            res.status(404).send({error: "no such task"})
        }
    } catch (error) {
        res.status(400).send({error: 'error'})
    }
})

app.get('/', (req, res) => {
    res.sendFile(__dirname + '/views/index.html')
})

app.listen(port, () => {
    console.log('server is listening on ' + port)
})