/* entidades de la aplicacion
  - TodoEntity
*/

export class TodoEntity {
  constructor(
    public id: number,
    public text: string,
    public completedAt?: Date | null,
  ) {}

  get isCompleted() {
    return !!this.completedAt;
  }

  public static fromObject( object: {[key: string]: any} ): TodoEntity {
    const { id, text, completedAt } = object;
    if( !id || !text ){
      throw new Error('id and text are required');
    }
    let newCompletedAt;
    if( completedAt ){
      newCompletedAt = new Date(completedAt);
      if (isNaN(newCompletedAt.getTime())) {
        throw new Error('completedAt is not a valid date');
      }
    }

    return new TodoEntity(id, text, completedAt)
  }
}