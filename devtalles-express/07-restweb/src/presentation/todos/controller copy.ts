import { Request, Response } from "express";
import { prisma } from "../../data/postgres";
import { CreateTodoDto } from '../../domain/dtos/todos/create-todo.dto';
import { UpdateTodoDto } from "../../domain/dtos";
import { TodoRepository } from "../../domain";
export class TodosController {
  constructor(
    private readonly todosRepository: TodoRepository
  ) {}
  
  public getTodos = async ( req: Request, res: Response) => {
    const todos = await this.todosRepository.getAll();
    res.json( todos )
  }
  
  public getTodoById = async ( req: Request, res: Response) => {
    // obtiene el id 
    const id = +req.params.id;
    try {
      const todo = await this.todosRepository.getById(id);
      res.json( todo );
    } catch (error) {
      res.status(404).json({ error: `Todo with id ${ id } not found` });
    }
  }

  //* POST
  public createTodo = async ( req: Request, res: Response ) => {
    // solo validacion
    const [error,  createTodoDto] = CreateTodoDto.create( req.body );
    if ( error ) return res.status( 400 ).json( { error } );

    // creacion
    const todo = await this.todosRepository.create( createTodoDto! );
    res.json( todo );

  };

  //* PATCH
  public updateTodo = async ( req: Request, res: Response ) => {
    const id = +req.params.id;

    // valid fields
    const [error, updateTodoDto] = UpdateTodoDto.create( { id, ...req.body });
    if ( error ) return res.status( 400 ).json( { error } );

    // update
    const updatedTodo = await this.todosRepository.updateById(updateTodoDto!)
    if ( !updatedTodo ) return res.status( 404 ).json( { error: `Todo with id ${ id } not found` } );

    res.json( updatedTodo );
  }


  public deleteTodo = async (req:Request, res: Response) => {
    const id = +req.params.id;
    try {
      
      const todo = await this.todosRepository.deleteById(id);
      if ( !todo ) return res.status(404).json({ error: `Todo with id ${ id } not found` });
      
      res.json( todo );
    } catch (error) {
      // res.status(404).json(error);
      res.status(404).json({ error: `Todo with id ${ id } not found` });
    }

  }
}