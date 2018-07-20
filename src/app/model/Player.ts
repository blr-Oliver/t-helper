export class Player {
  readonly id: string;
  name: string;

  constructor(id: string, name?: string) {
    this.id = id;
    this.name = name || id;
  }
}
