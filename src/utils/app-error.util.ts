type ErrorDetail = {
  field?: string;
  message: string;
};

class AppError extends Error {
  statusCode: number;
  errors?: ErrorDetail[];

  constructor(statusCode: number, message: string, errors?: ErrorDetail[]) {
    super(message);
    this.statusCode = statusCode;
    this.errors = errors;
  }
}

export { AppError };
