import { Router } from "express";
import { TodosController } from "./controller";
import { TodoDatasourceImpl } from "../../infrastructure/datasource/todo.datasource.impl";
import { TodoRepositoryImpl } from "../../infrastructure/repository/todo.repository";


export class TodoRoutes {
  static get routes(): Router {
    const router = Router();

    // crear el datasource para implementarlo en el controler
    const datasource = new TodoDatasourceImpl();
    const todoRepository = new TodoRepositoryImpl( datasource );

    const todosController = new TodosController(todoRepository);

    router.get('/', todosController.getTodos)
    router.get('/:id', todosController.getTodoById)
    router.post('/', todosController.createTodo)
    router.put('/:id', todosController.updateTodo)
    router.delete('/:id', todosController.deleteTodo)

    return router;
  }
}