
// simulating a callback function
const callbackFunction = (callback) => {
    setTimeout(() => {
        callback('this is error', undefined)
    }, 2000)
}

callbackFunction((error, result) => {
    if(error){
        return console.log('error occured')
    }

    console.log(result)
})