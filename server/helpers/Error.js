
import httpStatus from 'http-status';

/**
 * @extends Error
 */
class ExtendedError extends Error {
  constructor(message, status, isPublic) {
    super(message);
    this.name = this.constructor.name;
    this.message = message;
    this.status = status;
    this.isPublic = isPublic; // is visible or not?
    this.isOperational = true; // This is required since bluebird 4 doesn't append it anymore.
    Error.captureStackTrace(this, this.constructor.name);
  }
}

/**
 * Class representing an API error.
 * @extends ExtendedError
 */
class APIError extends ExtendedError {
  /**
   * Creates an API error, encapsulates all errors here.
   * @param {string} message -  message.
   * @param {number} status - HTTP status code of error.
   * @param {boolean} isPublic - if the message should be visible to user or not.
   */
  constructor(message, status = httpStatus.INTERNAL_SERVER_ERROR, isPublic = false) {
    super(message, status, isPublic);
  }
}

export default APIError;
