var expect = require('expect')
const request = require('supertest')

const {app} = require('./../server')
const {Todo} = require('./../models/todo')

const todos = [{
  _id:'5a916a43cf2d372a0886c9dd',
  text:'First test todo'
},{
  _id:'5a916a43cf2d372a0886c9dc',
  text:'Second test todo'
}]

beforeEach((done)=>{
  Todo.remove({}).then(()=>{
    return Todo.insertMany(todos)
  }).then(()=>done())
})

describe('POST /todos',()=>{
  it('Should create a new todo',(done)=>{
    var text = 'Test todo test'
    request(app)
      .post('/todos')
      .send({text})
      .expect(200)
      .expect((res)=>{
        expect(res.body.text).toBe(text)
      })
      .end((err,res)=>{
        if(err){
          return done(err)
        }

        Todo.find({text}).then((todos)=>{
          expect(todos.length).toBe(1)
          expect(todos[0].text).toBe(text)
          done()
        }).catch((e)=>done(e))
      })
  })

  it('Should not create todo with invalid body',(done)=>{
    request(app)
      .post('/todos')
      .send({text:''})
      .expect(400)
      .end((err,res)=>{
        if(err){
          return done(err)
        }

        Todo.find().then((todos)=>{
          expect(todos.length).toBe(2)
          done()
        }).catch((e)=>done(e))
      })
  })
})


describe('GET /todos',()=>{
  it('Should get all todos',(done)=>{
    request(app)
      .get('/todos')
      .expect(200)
      .expect((res)=>{
        expect(res.body.todos.length).toBe(2)
      })
      .end(done)
  })
})

describe('GET /todos/:id',()=>{
  //With correct id
  it('Should get todo with id 5a916a43cf2d372a0886c9dc',(done)=>{
    request(app)
      .get('/todos/5a916a43cf2d372a0886c9dc')
      .expect(200)
      .expect((res)=>{

        expect(res.body.todo._id).toBe("5a916a43cf2d372a0886c9dc")
      })
      .end(done)
  })
  //with valid id but no object
  it('Should not get todo with id 5a916a43cf2d372a0886c8dc',(done)=>{
    request(app)
      .get('/todos/5a916a43cf2d372a0886c8dc')
      .expect(404)
      .end(done)
  })
  //with invalid id
  it('Should not get todo with invalid id 5a916a43cf2d372a0886c8dcdd',(done)=>{
    request(app)
      .get('/todos/5a916a43cf2d372a0886c8dcdedd')
      .expect(400)
      .end(done)
  })
})

describe('DELETE /todos/:id',()=>{

  it('Should delete havind id',(done)=>{
    request(app)
      .delete('/todos/5a916a43cf2d372a0886c9dc')
      .expect(200)
      .expect((res)=>{
        expect(res.body.todo._id).toBe('5a916a43cf2d372a0886c9dc')
      })
      .end((err,res)=>{
        if(err){
          return done(err)
        }

        Todo.findById('5a916a43cf2d372a0886c9dc').then((doc)=>{
          expect(doc).toNotExist()
          done()
        }).catch((e)=>done(e))
      })
  })

  it('Should return 404 if not found',(done)=>{
    request(app)
      .delete('/todos/5a916a43cf2d372a0886c9fc')
      .expect(404)
      .end(done)
  })

  it('Should return 400 if the id is invalid',(done)=>{
    request(app)
      .delete('/todos/5a916a43cf2d372a0886c9dcsd')
      .expect(400)
      .end(done)
  })
})
