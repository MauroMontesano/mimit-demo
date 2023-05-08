/**
 * Describe a Validation Error
 */
export class ValidationError {
  /**
   * unique message error
   */
  code: string;
  /**
   * Entity for which there is the error
   */
  entity: string;
  /**
   * The field with error
   */
  field: string;
  /**
   * The error message form backend
   */
  message: string;

  constructor(code: string, message: string, entity: string, field: string) {
    this.code = code;
    this.message = message;
    this.entity = entity;
    this.field = field;
  }
}
