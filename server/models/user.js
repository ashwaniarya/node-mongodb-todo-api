var mongoose = require('mongoose')

//Doc modelling
var User = mongoose.model('User',{
  name:{
    type:'String',
    require:true,
    trim:true,
    minlength:1
  },
  email:{
    type:'String',
    require:true,
    trim:true,
    minlength:1
  }
})

module.exports = { User }
