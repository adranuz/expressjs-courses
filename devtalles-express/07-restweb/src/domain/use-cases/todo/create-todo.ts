import { CreateTodoDto } from "../../dtos";
import { TodoEntity } from "../../entities/todo.entity";
import { TodoRepository } from "../../repository/todo.repository";

export interface CreateTodoUseCase {
  execute(dto: CreateTodoDto): Promise<TodoEntity>
}

export class CreateTodo implements CreateTodoUseCase {
  // resive una inyeccion de dependencias
  constructor(
    private readonly todoRepository: TodoRepository
  ) {}
  
  execute(dto: CreateTodoDto): Promise<TodoEntity> {
    return this.todoRepository.create(dto);
  }
}