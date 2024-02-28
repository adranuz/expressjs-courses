export class UpdateTodoDto {
  // solo se va a poder llamar dentro de un metodo estatico
  private constructor(
    public readonly id?: number,
    public readonly text?: string,
    public readonly completedAt?: Date,
  ) {}

  get values() {
    const returnObj: {[key: string]:any} = {}

    if ( this.text ) returnObj.text = this.text
    if ( this.completedAt ) returnObj.completedAt = this.completedAt
    
    return returnObj
  }

  static create( props: { [key: string]: any } ): [string?, UpdateTodoDto?] {
    // obtiene los campos
    const { id, text, completedAt } = props

    // valida el id
    if ( !id || isNaN(Number(id))) return ['ID must be a valid number', undefined]

    // valida el texto
    if ( !text || text.length === 0 ) return ['text is required', undefined]

    // verifica que completeAt sea una fecha
    if ( completedAt ) {
      const newCompletedAt = new Date( completedAt )
      if (newCompletedAt.toString() === 'Invalid Date') {
        return ['completedAt must be a valid date']
      }
    }
    return [undefined, new UpdateTodoDto(id, text, completedAt)]
  }
}