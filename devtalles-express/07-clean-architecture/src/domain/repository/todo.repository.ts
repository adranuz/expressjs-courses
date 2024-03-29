import { CreateTodoDto, UpdateTodoDto } from "../dtos";
import { TodoEntity } from "../entities/todo.entity";

//* probar instancia
export abstract class TodoRepository {
  abstract create(createTodoDto:CreateTodoDto):Promise<TodoEntity>;
  abstract getAll():Promise<TodoEntity[]>;
  abstract getById(id:number):Promise<TodoEntity>;
  abstract updateById(updateTodoDto:UpdateTodoDto):Promise<TodoEntity>;
  abstract deleteById(id: number):Promise<TodoEntity>;
}