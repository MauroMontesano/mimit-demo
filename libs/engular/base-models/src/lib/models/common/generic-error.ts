/**
 * Describe a generic error message
 */
export class GenericError {
  code: string;

  message: string;

  constructor(code: string, message: string) {
    this.code = code;
    this.message = message;
  }
}
