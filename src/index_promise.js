const express = require('express')
const User = require('./db/user')
const Task = require('./db/task')

// automatically connects to the database
require('./db/mongoose')

const app = express()
const port = process.env.PORT || 5000

// automatically parse incoming json to an object, when user use http POST to send a json object, it will be 
// parsed save in req.body 
app.use(express.json())

// sending information from client to server -> json sent by client is parsed to req.body
// now the req.body, which contains the document can be saved to the database using mongoose
// check status code -> https://www.webfx.com/web-development/glossary/http-status-codes/
app.post('/users', (req, res) => {
    console.log(req.body)  
    // below line creates the document to be inserted into the collection
    const user = new User(req.body)
    // insert the document
    user.save().then( (result) => {
        res.send(user)
    }).catch( (error) => {
        // the two statements can be chained -> res.status(400).send(error)
        res.status(400)
        res.send(error)
    })
})

// reading information from database 
// functions for queries https://mongoosejs.com/docs/queries.html

// getting all user info
app.get('/users', (req, res) => {
    User.find({}).then( (result) => {
        res.send(result)
    }).catch( (error) => {
        res.status(500).send(error)
    })
})

// whatever behind the column is known as a parameter, it will be whatever the user enters after /users/; it can be accessed 
// using req.params
// ex: localhost:5000/users/test_id -- it would return {id: test_id}
app.get('/users/:id', (req, res) => {

    const id = req.params.id
    User.findById(id.toString()).then( (result) => {
        if(!result){
            return res.status(404).send('no user found')
        }
        res.send(result)
    }).catch( (error) => {
        res.send(error)
    })
})

app.post('/tasks', (req, res) => {
    const task = new Task(req.body)
    task.save().then((result) => {
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


app.listen(port, () => {
    console.log('server is listening on ' + port)
})