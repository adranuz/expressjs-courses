export class CreateTodoDto {
  // solo se va a poder llamar dentro de un metodo estatico
  private constructor(
    public readonly text: string
  ) {}

  static create( props: { [key:string]: any } ): [string?, CreateTodoDto?] {
    const { text } = props
    if ( !text || text.length === 0 ) return ['text is required', undefined]
    return [undefined, new CreateTodoDto(text)]
  }
}