import { TodoEntity } from "../../entities/todo.entity";
import { TodoRepository } from "../../repository/todo.repository";

export interface GetTodoUseCase {
  execute(id: number): Promise<TodoEntity>
}

export class GetTodo implements GetTodoUseCase {
  // resive una inyeccion de dependencias
  constructor(
    private readonly todoRepository: TodoRepository
  ) {}
  
  execute(id: number): Promise<TodoEntity> {
    return this.todoRepository.getById(id);
  }
}