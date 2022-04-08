
// https://tutorialzine.com/2017/07/javascript-async-await-explained
// async makes a function asynchronous and returns a Promise
//
// await can only be used in an async function, it can be placed in front of a Promise call, it will then pause 
// the program until the promise is fullfilled

const add = (a, b) => {
    return new Promise( (resolve, reject) => {
        setTimeout( () => {
            if(a < 0){
                return reject('number must be > 0')
            }

            resolve(a + b)
        }, 2000)
    })
}

// async function example
const work = async () => {

}

const work1 = async () => {
    return 'something'
}

const work2 = async () => {
    const sum = await add(1, 2)
    const sum2 = await add(sum, 2)
    const sum3 = await add(1, sum2)
    return sum3
}

console.log(work()) // simply print an empty async function will return a promise. Precisely: Promise {undefined}
console.log(work1()) // returns Promise {'something'}

work2().then( (result) => {
    console.log('result =', result )
})