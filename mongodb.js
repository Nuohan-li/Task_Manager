// CRUD create read update delete operations on mongodb 

const mongodb = require('mongodb')
const MongoClient = mongodb.MongoClient

// URL to connect to the running db
const connectionURL = 'mongodb://127.0.0.1:27017'
// database name
const databaseName = 'task-db'
// creating an instance of mongodb.ObjectId -> used in _id or getting the time stamp when the document is created
const ObjectID = mongodb.ObjectId

const id = new ObjectID()
console.log(id)
console.log(id.getTimestamp())

// connecting to the database
// 1st argument is the url to the database
// 2nd argument is an object -> useNewUrlParser: true, this is required because the default parser is deprecated
// 3rd argument is a callback function
MongoClient.connect(connectionURL, {useNewUrlParser: true}, (error, client) => {
    // if error occured, stop the function and print the error
    if (error){
        return console.log('cannot connect to database')
    }

    // creating a database
    const db = client.db(databaseName)

    // adding document to a collection -> insertOne, 1st argument is an object, which is the document to insert into the collection 
    // the second argument is option, which is optional.
    // the third argument is a callback function that will be called once insertOne finishes executing
    db.collection('users1').insertOne({
        _id: id,
        name: 'asd',
        age: '26'
    }, (error, result) => {
        if(error){
            return console.log('error occured, unable to insertOne')
        }

        console.log(result.ops) // ops -> array of documents
    })
    
    // adding multiple documents to a collection at same time.
    db.collection('tasks').insertMany([
        {
            task: 'task1',
            description: 'desc',
            due_date: 'due',
            completed: false
        },
        {
            task: 'task12',
            description: 'desc',
            due_date: 'due',
            completed: false
        },
        {
            task: 'task3',
            description: 'desc',
            due_date: 'due',
            completed: false
        }
    ], (error, result) => {
        if (error){
            return console.log("error, couldn't add tasks")
        }

        console.log(result.ops)
    })

    // getting documents based on one of the entry in the document -> it is possible to put multiple entries in first argument
    // the below returns only the first one that matches
    db.collection('tasks').findOne({task: 'task1'}, (error, task) => {
        if(error){
            console.log("unable to fetch")
        }
        console.log(task)
    })

    // find method returns a cursor
    /*
        A pointer to the result set of a query. Clients can iterate through a cursor to retrieve results. 
        By default, cursors not opened within a session automatically timeout after 10 minutes of inactivity. 
        Cursors opened under a session close with the end or timeout of the session.
        to iterate through a cursor
        https://www.mongodb.com/docs/manual/tutorial/iterate-a-cursor/#std-label-read-operations-cursors
    */

    // toArray( (error, arg2) => { }) -> puts the documents in the cursor to an array 
    db.collection('tasks').find({task: 'task12'}).toArray((error, task) => {
        console.log(task)
    })

    // count method -> returns the number of matching document
    db.collection('tasks').find({task: 'task12'}).count((error, count) => {
        console.log(count)
    })

    // updating document one document using promise, updateOne -> first argument is the filter, second argument
    // is the update operators
    // Promise is used instead of callback function here
    // https://www.mongodb.com/docs/manual/reference/operator/update/
    const updatePromise = db.collection('tasks').updateOne({task: 'task1'}, {
        $set: {
            task: 'new_task1'
        }
    })

    updatePromise.then( (result) => {
        console.log(result)
    }).catch((error) => {
        console.log(error)
    })

    // updating many documents at once
    db.collection('tasks').updateMany({completed: true}, {
        $set: {
            completed: false
        }
    }).then( (result) => {
    })

    // deleting documents -> many vs one
    db.collection('tasks').deleteMany({task: 'task3'}).then( (result) => {
        console.log(result)
    }).catch( (error) => {
        console.log(error)
    })

    db.collection('user1').deleteOne( {name: 'sadsad'}).then((result) => {
        console.log(result)
    }).catch( (error) => {
        console.log(error)
    })

})