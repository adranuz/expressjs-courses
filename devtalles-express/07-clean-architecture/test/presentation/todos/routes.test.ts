import request from 'supertest'
import { testServer } from '../../test-server'
import { prisma } from '../../../src/data/postgres'

describe('Todos routes', () => {
  beforeAll(async () => {
    await testServer.start()
  })

  afterAll(async () => {
    testServer.close()
  })

  const todo1 = { text: 'hola mundo 1' }
  const todo2 = { text: 'hola mundo 2' }

  test('should return array of todos api/todos', async () => {
    await prisma.todo.deleteMany()
    await prisma.todo.createMany({data: [todo1, todo2]})
    const {body} = await request(testServer.app)
      .get('/api/todos')
      .expect(200)

    expect(body).toBeInstanceOf(Array)
    expect(body).toHaveLength(2)
    expect(body[0].text).toBe(todo1.text)
    expect(body[1].text).toBe(todo2.text)
    expect(body[1].completedAt).toBe(null)
  })

  beforeEach(async () => {
    await prisma.todo.deleteMany()
  })

  test('should return one todo api/todos/:id', async () => {
    await prisma.todo.createMany({data: [todo1, todo2]})
    const { body } = await request(testServer.app)
      .get('/api/todos')
      .expect(200)

    expect(body).toBeInstanceOf(Array)
    expect(body).toHaveLength(2)
    expect(body[0].text).toBe(todo1.text)
    expect(body[1].text).toBe(todo2.text)
    expect(body[1].completedAt).toBe(null)
  })

  test('should return a todo api/todos', async () => {
    const newTodo = await prisma.todo.create({ data: todo1 })
    const { body } = await request(testServer.app)
      .get(`/api/todos/${newTodo.id}`)
      .expect(200)

    expect(body).toEqual({
      id: newTodo.id,
      ...todo1,
      completedAt: null
    })
  })

  test('should return a 404 id not found api/todos/:id', async () => {
    const {body} = await request(testServer.app)
      .get(`/api/todos/9999`)
      .expect(404)

    expect(body).toEqual({ error: 'Todo not found' })
  })

  test('should create a todo api/todos', async () => {
    const { body } = await request(testServer.app)
      .post('/api/todos')
      .send(todo1)
      .expect(201)

    expect(body).toEqual({
      id: expect.any(Number),
      ...todo1,
      completedAt: null
    })
  })

  test('should return an error in todo text empty api/todos', async () => {
    const { body } = await request(testServer.app)
      .post('/api/todos')
      .send({ text: '' })
      .expect(400)

    expect(body).toEqual({
      error: "text is required"
    })
  })

  test('should return an error in todo text not present api/todos', async () => {
    const { body } = await request(testServer.app)
      .post('/api/todos')
      .send({ })
      .expect(400)

    expect(body).toEqual({
      error: "text is required"
    })
  })

  test('should update a todo api/todos/:id', async () => {
    const newTodo = await prisma.todo.create({ data: todo1 })
    const completedAt = new Date().toISOString()
    const { body } = await request(testServer.app)
      .put(`/api/todos/${newTodo.id}`)
      .send({ text: 'new text', completedAt})
      .expect(200)

    expect(body).toEqual({
      id: newTodo.id,
      text: 'new text',
      completedAt: expect.any(String)
    })
  })

  test('should return an error in todo text empty api/todos/:id', async () => {
    const newTodo = await prisma.todo.create({ data: todo1 })
    const { body } = await request(testServer.app)
      .put(`/api/todos/${newTodo.id}`)
      .send({ text: '' })
      .expect(400)

    expect(body).toEqual({
      error: "text is required"
    })
  })

  test('should return an error in todo text not present api/todos/:id', async () => {
    const newTodo = await prisma.todo.create({ data: todo1 })
    const { body } = await request(testServer.app)
      .put(`/api/todos/${newTodo.id}`)
      .send({ })
      .expect(400)

    expect(body).toEqual({
      error: "text is required"
    })
  })

  test('should return an error in todo id not valid api/todos/:id', async () => {
    const newTodo = await prisma.todo.create({ data: todo1 })
    const { body } = await request(testServer.app)
      .put(`/api/todos/9999`)
      .send({ text: 'new text' })
      .expect(404)

    expect(body).toEqual({
      error: "Todo not found"
    })
  })

  test('should delete a todo api/todos/:id', async () => {
    const newTodo = await prisma.todo.create({ data: todo1 })
    const { body } = await request(testServer.app)
      .delete(`/api/todos/${newTodo.id}`)
      .expect(200)

    expect(body).toEqual({
      id: newTodo.id,
      ...todo1,
      completedAt: null
    })
  })

  test('should return an error in todo id not valid api/todos/:id', async () => {
    const newTodo = await prisma.todo.create({ data: todo1 })
    const { body } = await request(testServer.app)
      .delete(`/api/todos/9999`)
      .expect(404)

    expect(body).toEqual({
      error: "Todo not found"
    })
  })
})
