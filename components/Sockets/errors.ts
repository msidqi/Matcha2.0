export class IOError extends Error {
  name = "IOError";
  message: string;

  constructor(message: string) {
    super();
    this.message = message;
  }
}
