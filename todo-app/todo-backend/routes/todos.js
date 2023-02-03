const express = require('express');
const { Todo } = require('../mongo')
const router = express.Router();
const redis = require('../redis');

/* GET todos listing. */
router.get('/', async (_, res) => {
  const todos = await Todo.find({})
  res.send(todos);
});

/* POST todo to listing. */
router.post('/', async (req, res) => {
  const todo = await Todo.create({
    text: req.body.text,
    done: false
  })

  let added_todos = await redis.getAsync(redis.KEY)
  if (!added_todos) {
    added_todos = 0
  }
  await redis.setAsync(redis.KEY, ++added_todos)

  res.send(todo);
});

const singleRouter = express.Router();

const findByIdMiddleware = async (req, res, next) => {
  const { id } = req.params
  req.todo = await Todo.findById(id)
  if (!req.todo) return res.sendStatus(404)

  next()
}

/* DELETE todo. */
singleRouter.delete('/', async (req, res) => {
  await req.todo.delete()  
  res.sendStatus(200);
});

/* GET todo. */
singleRouter.get('/', async (req, res) => {
  if(req.todo) return res.send(req.todo)
  res.sendStatus(405); // Implement this
});

/* PUT todo. */
singleRouter.put('/', async (req, res) => {
  try {
    await Todo.findByIdAndUpdate(req.todo.id,{
      text: req.body.text,
      done: req.body.done
    })
    res.sendStatus(200)
  } catch(err){
    console.log(err.message)
    res.sendStatus(405); // Implement this
  }
});

router.use('/:id', findByIdMiddleware, singleRouter)


module.exports = router;
