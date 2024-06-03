export class ApiError extends Error {
  errorMessage: string;
  status: number;
  constructor(errorMessage: string, status: number) {
    super();
    this.errorMessage = errorMessage;
    this.status = status;
  }
}
