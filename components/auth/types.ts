import { Dispatch } from "react";
import { isValidDate } from "@/utils/date";
import { UserError } from "@/components/auth/errors";

export interface UserInput {
  firstName: string;
  lastName: string;
  userName: string;
  email: string;
  birthDate: Date | string;
  bio: string;
  experience: number;
  gender: "male" | "female";
  orientation: "heterosexual" | "homosexual" | "bisexual";
  rankId: number;
  accessToken: string;
  ProfileImage: {
    imageBase64: string;
    imageName: string;
  };
  tags: string[];
}

interface IUser {
  data: Partial<UserInput>;
}

export class User implements IUser {
  data: {
    firstName: string;
    lastName: string;
    userName: string;
    email: string;
    bio: string;
    ProfileImage: {
      imageBase64: string;
      imageName: string;
    };
    gender?: "male" | "female";
    orientation?: "heterosexual" | "homosexual" | "bisexual";
    experience?: number;
    birthDate: Date | string;
    rankId?: number;
    tags: string[];
  };
  private _accessToken?: string;

  public get ProfileImageBase64() {
    return `data:image/jpeg;base64,${this.data.ProfileImage.imageBase64}`;
  }

  public get authorization() {
    return `Bearer ${this._accessToken || ""}`;
  }
  public set accessToken(v: string | undefined) {
    this._accessToken = v || "";
  }

  constructor(input: Partial<UserInput>) {
    this.data = {
      firstName: "",
      lastName: "",
      userName: "",
      email: "",
      bio: "",
      birthDate: "",
      ProfileImage: {
        imageBase64: "",
        imageName: "",
      },
      tags: [],
    };
    this.addProperties(input);
  }

  addProperties(input: Partial<UserInput>) {
    if (typeof input["firstName"] === "string")
      this.data.firstName = input["firstName"];
    if (typeof input["lastName"] === "string")
      this.data.lastName = input["lastName"];
    if (typeof input["userName"] === "string")
      this.data.userName = input["userName"];
    if (typeof input["email"] === "string") this.data.email = input["email"];
    if (typeof input["experience"] === "number")
      this.data.experience = input["experience"];
    if (typeof input["orientation"] === "string")
      this.data.orientation = input["orientation"];
    if (typeof input["gender"] === "string") this.data.gender = input["gender"];
    if (typeof input["bio"] === "string") this.data.bio = input["bio"];
    if (typeof input["accessToken"] === "string")
      this.accessToken = input["accessToken"];
    if (
      typeof input["ProfileImage"] === "object" &&
      typeof input["ProfileImage"].imageBase64 === "string"
    )
      this.data.ProfileImage = input["ProfileImage"];
    if (typeof input["birthDate"] === "string") {
      const date = new Date(input["birthDate"]);
      if (isValidDate(date)) this.data.birthDate = date;
    } else if (
      input["birthDate"] instanceof Date &&
      isValidDate(input["birthDate"])
    ) {
      this.data.birthDate = input["birthDate"];
    }
    if (Array.isArray(input["tags"])) this.data.tags = input["tags"];

    return this;
  }
}

export type UserDispatchActions =
  | { type: "LOGOUT" }
  | { type: "LOGIN"; payload: { user: User } }
  | { type: "SET_USER"; payload: { user: User } };

export type UserState =
  | { user: undefined; loggedIn: false }
  | { user: User; loggedIn: true };

export type UserDispatch = Dispatch<UserDispatchActions>;

export type LoginAction = (data: {
  userName: string;
  password: string;
}) => Promise<void>;

export type LogoutAction = () => Promise<void>;

export type SetUserAction = (userData: Partial<UserInput>) => void;

export type ActionsAndState = {
  login: LoginAction;
  logout: LogoutAction;
  setUser: SetUserAction;
  loading: boolean;
  error: UserError | null;
};
