import { prisma } from '../../data/postgres';
import { CreateTodoDto, TodoEntity, UpdateTodoDto } from '../../domain';
import { TodoDatasource } from '../../domain/datasources/todo.datasource';


export class TodoDatasourceImpl implements TodoDatasource{
  async create(createTodoDto: CreateTodoDto): Promise<TodoEntity> {
    const todo = await prisma.todo.create({data: createTodoDto});
    return TodoEntity.fromObject(todo);
  }
  async deleteById(id: number): Promise<TodoEntity> {
    const todo = await this.getById(id);
    await prisma.todo.delete({where: {id}});
    return TodoEntity.fromObject(todo);
  }
  async getAll(): Promise<TodoEntity[]> {
    const todos = await prisma.todo.findMany();
    return todos.map(({id, text, completedAt}) => TodoEntity.fromObject({id, text, completedAt}));
  }
  async getById(id: number): Promise<TodoEntity> {
    const todo = await prisma.todo.findUnique({where: {id}});
    if(!todo) throw new Error('Todo not found');
    return TodoEntity.fromObject(todo);
  }
  async updateById(updateTodoDto: UpdateTodoDto): Promise<TodoEntity> {
    const {id, text, completedAt} = updateTodoDto;
    try {
      const todo = await prisma.todo.update({
        where: {id},
        data: {text, completedAt}
      });
      return TodoEntity.fromObject(todo);
    } catch (error) {
      throw new Error('Todo not found');
    }

  }

}