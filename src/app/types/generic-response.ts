export interface GenericResponse<T> {
    errorCode: number;
    errorDescription;
    result: T;
  }
  