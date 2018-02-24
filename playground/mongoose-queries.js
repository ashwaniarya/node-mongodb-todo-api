const {mongoose} = require('./../server/db/mongoose')
const {Todo} = require('./../server/models/todo')
const {User} = require('./../server/models/user')

var id = '6a9155ae82d6d10adfrb3765b'
User.findById(id).then((user)=>{
  if(!user){
    return console.log('User not found')
  }
  console.log(user)
}).catch((err)=>{
  console.log('Invalid User ID');
})
