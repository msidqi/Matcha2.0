import { Dispatch } from "react";
import { hasOwnProperty } from "@/utils/hadOwnProperty";

type UserInput = {
  firstname?: string;
  lastname?: string;
  username?: string;
  email?: string;
  accessToken?: string;
  birthDate?: string;
};

/*
bio: "Worsdfadfking"
birthDate: "1970-07-05T00:00:00.000Z"
email: "younes.bouladhane.dev@gmail.com"
experience: 0
firstName: "Skafandrii_Test"
gender: "Male"
genderId: 1
lastName: "test1"
orientation: "heterosexual"
orientationId: 1
rankId: 5
userName: "connectedUser"
*/

export class User {
  firstname: string;
  lastname: string;
  username: string;
  email: string;
  //   bio: string;
  //   gender: "Male" | "Female";
  //   experience: number;
  birthDate: Date;
  _accessToken: string;

  public set accessToken(v: string) {
    this._accessToken = v;
  }

  constructor(input: UserInput) {
    this.firstname = input["firstname"] || "";
    this.lastname = input["lastname"] || "";
    this.username = input["username"] || "";
    this.email = input["email"] || "";
    this._accessToken = input["accessToken"] || "";
    this.birthDate = input["birthDate"]
      ? new Date(input["birthDate"])
      : new Date();
  }

  getAuthorization() {
    return `Bearer ${this._accessToken || ""}`;
  }

  addProperties(input: Record<string, string>) {
    /*const validInput = [
      "firstname",
      "lastname",
      "username",
      "email",
      "accessToken",
    ];
    validInput.forEach((elem) => {
      if (input[elem] && hasOwnProperty(this, elem))
        this[elem] = input[elem];
    });*/
    if (input["firstname"]) this["firstname"] = input["firstname"];
    if (input["lastname"]) this.lastname = input["lastname"];
    if (input["username"]) this.username = input["username"];
    if (input["email"]) this.email = input["email"];
    if (input["accessToken"]) this._accessToken = input["accessToken"];
  }
}

export type UserDispatchActions =
  | { type: "logout" }
  | { type: "login"; payload: { user: User } };

export type UserState =
  | { user: undefined; loggedIn: false }
  | { user: User; loggedIn: true };

export type UserDispatch = Dispatch<UserDispatchActions>;

export type LoginAction = (data: {
  userName: string;
  password: string;
}) => Promise<void>;
export type LogoutAction = () => Promise<void>;
export type ActionsAndState = {
  login: LoginAction;
  logout: LogoutAction;
  loading: boolean;
};
