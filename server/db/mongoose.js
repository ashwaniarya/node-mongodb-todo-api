var mongoose = require('mongoose')
//Mongoose take promise
mongoose.Promise = global.Promise
//Mongoose connect to mongodb
mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/TodoApp')
module.exports = { mongoose }
