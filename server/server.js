//Lib imports
var express = require('express')
var bodyParser = require('body-parser')
var {ObjectID} = require('mongodb')

//Local imports
var { mongoose } = require('./db/mongoose')
var { Todo } = require('./models/todo')
var { User } = require('./models/user')

var app = express()
app.use(bodyParser.json())

//POST /todo
app.post('/todos',(req,res)=>{
  console.log(req.body)

  var newTodo = new Todo({
    text:req.body.text
  })

  newTodo.save().then((doc)=>{
    res.send(doc)
  },(err)=>{
    res.status(400).send(err)
  })
})

//GET /todos
app.get('/todos',(req,res)=>{
  Todo.find().then((todos)=>{
    res.send({todos})
  },(err)=>{
    res.status(400).send(err)
  })
})

//GET /todos/:id
app.get('/todos/:id',(req,res)=>{
  var id = req.params.id

  if(!ObjectID.isValid(id)){
    return res.status(400).send()
  }

  Todo.findById(id).then((todo)=>{
    if(!todo){
      return res.status(404).send()
    }
    res.send({todo})
  }).catch((err)=>{
    res.status(400).send()
  })

})
app.listen(3000,()=>{
  console.log('Started on port 3000');
})

module.exports = {app}