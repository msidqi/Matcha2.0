import { Dispatch } from "react";
// import { isValidDate } from "@/utils/date";
import { UserError } from "@/components/auth/errors";
import { User, Image } from "@/components/auth/classes";
import { Orientation, Gender } from "@/interfaces";

export interface UserInput {
  id: number;
  firstName: string;
  lastName: string;
  userName: string;
  email: string;
  birthDate: Date | string;
  bio: string;
  experience: number;
  gender: Gender;
  orientation: Orientation;
  rankId: number;
  accessToken: string;
  images: Image[];
  tags: string[];
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
