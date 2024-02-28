import { CreateTodoDto, TodoDatasource, TodoEntity, TodoRepository, UpdateTodoDto } from "../../domain";
//* probar instancia, respuestas, con el datasource mokeado
export class TodoRepositoryImpl implements TodoRepository {
  constructor (private datasource: TodoDatasource) {}

  create(createTodoDto: CreateTodoDto):Promise<TodoEntity>{
    return this.datasource.create(createTodoDto);
  }
  getAll():Promise<TodoEntity[]>{
    return this.datasource.getAll()
  }
  getById(id:number):Promise<TodoEntity>{
    return this.datasource.getById(id)
  }
  updateById(updateTodoDto: UpdateTodoDto): Promise<TodoEntity>{
    return this.datasource.updateById(updateTodoDto)
  }
  deleteById(id: number): Promise<TodoEntity>{
    return this.datasource.deleteById(id)
  }
}