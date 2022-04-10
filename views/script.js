// whatever operations (delete, get or post) that needs to be done here, must have a route and defined in the server side 
// node js 
// fetch will use the url and send such request to ther server, and server will then choose the appropriate route 
// to execute the operation

console.log('js loaded')
// getting the form from the html
const taskForm = document.querySelector('form')
const POST_button = document.getElementsByClassName('button2')[0]
const GET_button = document.getElementsByClassName('button1')[0]
const REFRESH_button = document.getElementsByClassName('button3')[0]
const DELETE_button = document.getElementsByClassName('button4')[0]
// const id = new Array()

// display data every time the app is loaded
window.onload = getData()
updateTime()

// getting all tasks from the database
GET_button.addEventListener('click', (event) => {
    event.preventDefault()
    getData()

})

// getting all data from database and display to the screen
function getData(){
    let taskNum = 0
    // fetching data using the below url -> where the appropriate get function will be called based on the route provided
    fetch('http://127.0.0.1:5000/tasks').then((response) => {
        response.json().then( (data) => {
            taskNum = data.length
            
            // creating elements for all contents in the database 
            for(let i = 0; i < taskNum; i++){
                let indexP = document.createElement("p")
                let taskP = document.createElement("p")
                let theRestP = document.createElement("p")
                let line = document.createElement("hr")
                let lineBreak = document.createElement("br")
                let taskDiv = document.createElement("div")
                let deleteButton = document.createElement("button")
                deleteButton.textContent = "delete"

                deleteButton.addEventListener('click', (event) => {
                    event.preventDefault()
                    let id = []
                    let index = deleteButton.parentNode.children[0].textContent
                    console.log(index)
                    document.getElementsByClassName('task1')[0].textContent = index

                    // getting all IDs
                    fetch('http://127.0.0.1:5000/tasks').then( (response) => {
                        response.json().then( (data) => {
                            taskNum = data.length
                        
                            for(let i = 0; i < taskNum; i++){
                                id[i] = data[i]._id.toString()
                            }
                            // delete the task
                            fetch('http://127.0.0.1:5000/tasks/' + id[index - 1], {
                                method: 'DELETE'
                            }).then( (result) => {
                                document.location.reload()
                            })
                        })
                    })
                })

                indexP.textContent = (i + 1)
                indexP.setAttribute('id', i )
                taskP.textContent = data[i].task.toString()
                theRestP.textContent = 'due: ' + data[i].due.toString()
                document.getElementsByClassName("task-div")[0].appendChild(taskDiv)

                taskDiv.appendChild(lineBreak)
                taskDiv.appendChild(line)
                taskDiv.appendChild(indexP)
                taskDiv.appendChild(taskP)
                taskDiv.appendChild(lineBreak)
                taskDiv.appendChild(theRestP)
                taskDiv.appendChild(lineBreak)
                taskDiv.appendChild(deleteButton)
                taskDiv.appendChild(line)
            }
        })
    })
}

// add a new task to database
POST_button.addEventListener('click', (event) => {
    event.preventDefault()

    let taskDesc = document.getElementsByClassName("task")[0].value
    let date = document.getElementsByClassName('date')[0].value

    fetch('http://127.0.0.1:5000/tasks', {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({"task": taskDesc, "due": date})
    })
    // refresh the page once posted
    document.location.reload()
})

REFRESH_button.addEventListener('click', (event) => {
    event.preventDefault()
    document.location.reload()
})

// deleting a task
DELETE_button.addEventListener('click', (event) => {
    event.preventDefault()
    
    let id = []
    // getting all IDs
    fetch('http://127.0.0.1:5000/tasks').then( (response) => {
        response.json().then( (data) => {
            taskNum = data.length
           
            for(let i = 0; i < taskNum; i++){
                id[i] = data[i]._id.toString()
            }
            // delete the task
            fetch('http://127.0.0.1:5000/tasks/' + id[3], {
                method: 'DELETE'
            }).then( (result) => {
                document.location.reload()
            })
        })
    })
})

// update the time on top of the screen
function updateTime(){
    let time = new Date();

    document.getElementsByClassName("year")[0].textContent = time.getFullYear()
    document.getElementsByClassName("month")[0].textContent = time.getMonth() + 1
    document.getElementsByClassName("date")[0].textContent = time.getDate()
    
    document.getElementsByClassName("hour")[0].textContent = time.getHours()
    document.getElementsByClassName("minute")[0].textContent = time.getMinutes()
    document.getElementsByClassName("second")[0].textContent = time.getSeconds()
    
    switch(time.getDay()){
        case 0:
            document.getElementsByClassName("weekday")[0].textContent = "  Sunday"
            break
        case 1:
            document.getElementsByClassName("weekday")[0].textContent = "  Monday"
            break
        case 2:
            document.getElementsByClassName("weekday")[0].textContent = "  Tuesday"
            break
        case 3:
            document.getElementsByClassName("weekday")[0].textContent = "  Wednesday"
            break
        case 4:
            document.getElementsByClassName("weekday")[0].textContent = "  Thursday"
            break
        case 5:
            document.getElementsByClassName("weekday")[0].textContent = "  Friday"
            break
        case 6:
            document.getElementsByClassName("weekday")[0].textContent = "  Saturday"
            break
    }
    setTimeout(updateTime, 1000);
}
