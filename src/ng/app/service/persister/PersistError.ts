export enum PersistErrorType {
  ServiceUnavailable = 1,
  ServiceError = 2,
  IllegalArgument = 3,
  NoSuchElement = 4,
  VersionMismatch = 5,
  AccessDenied = 6,
  Unknown = -1
}

export class PersistError extends Error {
  readonly type: PersistErrorType;

  constructor(type: PersistErrorType, message?: string) {
    super(message);
    this.type = type;
  }
}
