const HttpStatus = {
  'bad-request': 400,
  'unauthorized': 401,
  'forbidden': 403,
  'not-found': 404,
  'method-not-allowed': 405,
  'request-timeout': 408,
  'internal-server-error': 500,
  'service-unavailable': 503,
};

export default class HttpError extends Error {
  status: number;

  constructor(status: keyof typeof HttpStatus, message: string) {
    // 'Error' breaks prototype chain here
    super(message);
    this.status = HttpStatus[status];
    // restore prototype chain
    Object.setPrototypeOf(this, new.target.prototype);
  }
}
