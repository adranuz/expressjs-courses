import { TodoEntity } from "../../entities/todo.entity";
import { TodoRepository } from "../../repository/todo.repository";

export interface GetTodosUseCase {
  execute(): Promise<TodoEntity[]>
}

export class GetTodos implements GetTodosUseCase {
  // resive una inyeccion de dependencias
  constructor(
    private readonly todoRepository: TodoRepository
  ) {}
  
  execute(): Promise<TodoEntity[]> {
    return this.todoRepository.getAll();
  }
}