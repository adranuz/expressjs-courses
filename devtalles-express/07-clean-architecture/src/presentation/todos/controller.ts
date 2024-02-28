import { Request, Response } from "express";
import { CreateTodoDto } from '../../domain/dtos/todos/create-todo.dto';
import { UpdateTodoDto } from "../../domain/dtos";
import { CreateTodo, CustomError, DeleteTodo, GetTodo, GetTodos, TodoRepository, UpdateTodo } from "../../domain";
export class TodosController {
  constructor(
    private readonly todosRepository: TodoRepository
  ) {}
  
  private handleError = (res: Response, error: unknown) => {
    if (error instanceof CustomError) {
      return res.status(error.statusCode).json({ error: error.message });
    }
    return res.status(500).json({ error: 'Internal server error' });
  }

  public getTodos = ( req: Request, res: Response) => {
    new GetTodos(this.todosRepository).execute()
    .then( todos => res.json( todos ) )
    .catch( error => this.handleError(res, error) );
  }

  public getTodoById = ( req: Request, res: Response) => {
    // obtiene el id
    const id = +req.params.id;
    new GetTodo(this.todosRepository).execute(id)
    .then( todo => res.json( todo ) )
    .catch( error => this.handleError(res, error) );
  }

  public createTodo = ( req: Request, res: Response ) => {
    // solo validacion
    const [error,  createTodoDto] = CreateTodoDto.create( req.body );
    if ( error ) return res.status( 400 ).json( { error } );

    // creacion
    new CreateTodo(this.todosRepository).execute(createTodoDto!)
    .then( todo => res.status(201).json( todo ) )
    .catch( error => this.handleError(res, error) );
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
    .catch( error => this.handleError(res, error) );
  }


  public deleteTodo = (req:Request, res: Response) => {
    const id = +req.params.id;
    new DeleteTodo(this.todosRepository).execute(id)
    .then( todo => res.json( todo ) )
    .catch( error => this.handleError(res, error) );
  }
}