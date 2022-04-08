require('./src/db/mongoose')
const User = require('./src/db/user')
const Task = require('./src/db/task')

// User.findByIdAndUpdate('624ca83e6625eee85d76c170', {age: 2323}).then( (user) => {
//     console.log(user)
//     return User.countDocuments({age: 2})
// }).then( (count) => {
//     console.log(count)
// }).catch( (error) => {
//     console.log(error)
// })


const updateAndCount = async (id, age) => {
    const user = await User.findByIdAndUpdate(id, {age: age})
    const count = await User.countDocuments({age: age})
    return {user: count, info: user.name}
} 

updateAndCount('624ca83e6625eee85d76c170', 2).then( (count) => {
    console.log(count)

}) 


const deleteTaskAndCount = async (id) => {
    const task = await Task.deleteOne({id: id})
    const count = await Task.count({completed: false})
    return {count: count, task: task}
}

deleteTaskAndCount('624ca9618b81a604beb1582d').then( (result) => {
    console.log(result)

}).catch((error) => {
    console.log(error)
})