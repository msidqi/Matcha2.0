export const LOGIN_ERROR_MESSAGE = "Error during login";

export const USERDATA_ERROR_MESSAGE = "Error when fetching user data";
export const LOGOUT_ERROR_MESSAGE = "Error during logout";

export class UserError extends Error {
  name = "UserError";
  message: string;

  constructor(message: string) {
    super();
    this.message = message;
  }
}
