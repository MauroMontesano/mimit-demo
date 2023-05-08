/**
 * Identify kind of message
 */
export enum MessageType {
  /**
   * The application can't work right. Unexpected problem.
   */
  ERROR_BLOCK,
  /**
   * The application received a managed/know error.
   */
  ERROR_MANAGED,
  /**
   * Authentication error.
   */
  ERROR_AUTHENTICATION,

  /**
   * Warming message
   */
  WARNING,

  /**
   * Informative message
   */
  INFO,

  /**
   * Confirm a operation has completed message
   */
  SUCCESS,
}
