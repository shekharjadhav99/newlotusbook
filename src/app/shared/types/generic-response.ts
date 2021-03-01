export interface GenericResponse<T> {
    errorCode: number;
    errorDescription: string;
    result: T[]
  }
  