import { Request, Response } from "express";
import { prisma } from "../../data/postgres";
import { CreateTodoDto } from '../../domain/dtos/todos/create-todo.dto';
import { UpdateTodoDto } from "../../domain/dtos";
import { CreateTodo, DeleteTodo, GetTodo, GetTodos, TodoRepository, UpdateTodo } from "../../domain";
export class TodosController {
  constructor(
    private readonly todosRepository: TodoRepository
  ) {}

  public getTodos = ( req: Request, res: Response) => {
    new GetTodos(this.todosRepository).execute()
    .then( todos => res.json( todos ) )
    .catch( error => res.status(400).json({ error: error.message }) );
  }

  public getTodoById = ( req: Request, res: Response) => {
    // obtiene el id
    const id = +req.params.id;
    new GetTodo(this.todosRepository).execute(id)
    .then( todo => res.json( todo ) )
    .catch( error => res.status(400).json({ error: error.message }) );
  }

  public createTodo = ( req: Request, res: Response ) => {
    // solo validacion
    const [error,  createTodoDto] = CreateTodoDto.create( req.body );
    if ( error ) return res.status( 400 ).json( { error } );

    // creacion
    new CreateTodo(this.todosRepository).execute(createTodoDto!)
    .then( todo => res.status(201).json( todo ) )
    .catch( error => res.status(400).json({ error: error.message }) );
  };

  //* PATCH
  public updateTodo = ( req: Request, res: Response ) => {
    const id = +req.params.id;

    // valid fields
    const [error, updateTodoDto] = UpdateTodoDto.create( { id, ...req.body });
    if ( error ) return res.status( 400 ).json( { error } );

    // update
    new UpdateTodo(this.todosRepository).execute(updateTodoDto!)
    .then( todo => res.json( todo ) )
    .catch( error => res.status(400).json({ error: error.message }) );
  }


  public deleteTodo = (req:Request, res: Response) => {
    const id = +req.params.id;
    new DeleteTodo(this.todosRepository).execute(id)
    .then( todo => res.json( todo ) )
    .catch( error => res.status(404).json({ error: error.message }) );
  }
}