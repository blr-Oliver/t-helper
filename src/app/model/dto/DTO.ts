export abstract class DTO {
  id: number;
}

export abstract class Entity<T extends DTO> {
  readonly data: T;

  protected constructor(data: T) {
    this.data = data;
  }

  get id(): number {
    return this.data.id;
  }
}
