const promiseFunction = new Promise( (resolve, reject) => {
    setTimeout(() => {
        resolve([1,2,3])
        reject('error')
    }, 2000);
})

// .then will only run if things go well
promiseFunction.then( (result) => {
    console.log('success', result)
}).catch((error) => {
    console.log('error', error)
})

// promise chaining
const add = (a, b) => {
    return new Promise( (resolve, reject) => {
        setTimeout( () => {
            resolve(a + b)
        }, 2000)
    })
}

// below is a nested promise => add is called a second time, taking the previous result as argument and perform the same 
// action again
add(1, 2).then( (result) => {
    console.log(result)
    add(result, 1).then( (sum) => {
        console.log(sum)
    }).catch( (error) => {
        console.log(error)
    })
}).catch((error) => {
    console.log(error)
})

// rewrite the above using promise chaining
add(1, 1).then( (result) => {
    console.log(result)
    return add(result, 7)     // return next promise once the first promise is fullfilled 
}).then( (result_second_promise) => {    // chaining then() calls, 1st then() runs when the first promise is fullfilled
    console.log(result_second_promise)   // second then() call is called when the returned promise is fullfilled
})