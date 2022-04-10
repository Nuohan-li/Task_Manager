const express = require('express')
const User = require('./src/db/user')
const Task = require('./src/db/task')

// automatically connects to the database
require('./src/db/mongoose')

const app = express()
const port = process.env.PORT || 5000

// automatically parse incoming json to an object, when user use http POST to send a json object, it will be 
// parsed save in req.body 
app.use(express.json())

// allows client side JS file to be loaded
app.use("/views", express.static(__dirname + '/views'));


// sending information from client to server -> json sent by client is parsed to req.body
// now the req.body, which contains the document can be saved to the database using mongoose
// check status code -> https://www.webfx.com/web-development/glossary/http-status-codes/
app.post('/users', async (req, res) => {
    const user = new User(req.body)
    // save the user to the database once the promise is fullfilled
    try{
        await user.save()
        res.status(201).send(user)
        // in case promise is not fullfilled, throw an error
    } catch (e){
        res.status(400).send(e)
    }
})

// reading information from database 
// functions for queries https://mongoosejs.com/docs/queries.html

// getting all user info
app.get('/users', async (req, res) => {
    try{
        const users = await User.find({})
        res.send(users)
    } catch (e){
        res.status(500).send(e)
    }
    
})

// whatever behind the column is known as a parameter, it will be whatever the user enters after /users/; it can be accessed 
// using req.params
// ex: localhost:5000/users/test_id -- it would return {id: test_id}
app.get('/users/:id', async (req, res) => {

    const id = req.params.id
    try{
        const user = await User.findById(id.toString())
        if(!user){
            return res.status(404).send()
        }
        res.send(user)
    } catch(e){
        res.status(500).send(e)
    }
})

// update an individual user by its id
app.patch('/users/:id', async (req, res) => {
    // returns the keys of the JSON object
    const updates = Object.keys(req.body)
    // array of fields that can be updated
    const allowedUpdate = ['name', 'age', 'password', 'email']
    // check if the fields in the update body exist -> updates.every() will call the callback function on every single
    // items inside updates array 
    const isValid = updates.every( (update) => {
        // check if the item in updates is included in allowedUpdate array
        return allowedUpdate.includes(update)
    })

    if(!isValid){
        return res.status(400).send({error: 'field does not exist'})
    }

    try {
        // find the user by ID, then update it
        // 1st arg = id , 2nd arg = update content
        // 3rd arg = options
            // new: true will make the whole statement return the updated document
            // runValidator: true will allow the program to validate the new document before saving 
        const user = await User.findByIdAndUpdate(req.params.id.toString(), req.body, {new: true, runValidators: true})
        // if user does not exist 
        if(!user){
            return res.status(404).send()
        }

        res.send(user)  
    } catch (error) {
        res.status(400).send(error)
    }
})

// deleting a user
app.delete('/users/:id', async (req, res) => {
    try {
        const user = await User.findByIdAndDelete(req.params.id)

        if(!user){
            res.status(404).send({error: 'no such user'})
        }

        res.send(user)
    } catch (error) {
        res.status(500).send({error: 'error'})
    }
})

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