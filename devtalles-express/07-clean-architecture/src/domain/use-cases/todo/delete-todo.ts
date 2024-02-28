import { TodoEntity } from "../../entities/todo.entity";
import { TodoRepository } from "../../repository/todo.repository";

export interface DeleteTodoUseCase {
  execute(id: number): Promise<TodoEntity>
}

export class DeleteTodo implements DeleteTodoUseCase {
  // resive una inyeccion de dependencias
  constructor(
    private readonly todoRepository: TodoRepository
  ) {}
  
  execute(id: number): Promise<TodoEntity> {
    return this.todoRepository.deleteById(id);
  }
}