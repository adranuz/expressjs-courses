import { Request, Response } from "express";
import { prisma } from "../../data/postgres";
import { CreateTodoDto } from '../../domain/dtos/todos/create-todo.dto';
import { UpdateTodoDto } from "../../domain/dtos";

interface Todo {
  id: number;
  text: string;
  completedAt: Date | null;
}
const todos: Todo[] = [
  { id: 1, text: 'Todo 1', completedAt: new Date() },
  { id: 2, text: 'Todo 2', completedAt: null },
  { id: 3, text: 'Todo 3', completedAt: new Date() },
]
export class TodosController {
  constructor() {}
  
  public getTodos = async ( req: Request, res: Response) => {
    const todos = await prisma.todo.findMany()
    res.json( todos )
  }
  
  public getTodoById = async ( req: Request, res: Response) => {
    // obtiene el id 
    const id = +req.params.id;
    if ( isNaN( id ) ) return res.status( 400 ).json( { error: 'ID argument is not a number' } );

    const todo = await prisma.todo.findUnique({ where: { id }});

    ( todo )
      ? res.json( todo )
      : res.status( 404 ).json( { error: `TODO with id ${ id } not found` } );
  }

  //* POST
  public createTodo = async ( req: Request, res: Response ) => {
    const [error,  createTodoDto] = CreateTodoDto.create( req.body );
    if ( error ) return res.status( 400 ).json( { error } );

    // if ( !text ) return res.status( 400 ).json( { error: 'Text property is required' } );

    const todo = await prisma.todo.create({ data: createTodoDto!})


    res.json( todo );

  };

  //* PATCH
  public updateTodo = async ( req: Request, res: Response ) => {
    const id = +req.params.id;

    // valid fields
    const [error, updateTodoDto] = UpdateTodoDto.create( { id, ...req.body });
    if ( error ) return res.status( 400 ).json( { error } );

    const updatedTodo = await prisma.todo.update({
      where: { id },
      data: updateTodoDto!.values
    })
    if ( !updatedTodo ) return res.status( 404 ).json( { error: `Todo with id ${ id } not found` } );

    res.json( updatedTodo );
  }


  public deleteTodo = async (req:Request, res: Response) => {
    const id = +req.params.id;

    const todo = await prisma.todo.findUnique({where: {
      id
    }});
    if ( !todo ) return res.status(404).json({ error: `Todo with id ${ id } not found` });

    await prisma.todo.delete({ where: { id } });
    res.json( todo );

  }
}