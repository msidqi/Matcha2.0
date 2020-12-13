import { Dispatch } from "react"

export type User = {
    firstname: string;
    lastname: string;
    username: string;
    email: string;
    accessToken: string;
}

export type UserDispatchActions = { type: 'logout' } | { type: 'login', payload: { user: User } }
export type UserState = { user: undefined, loggedIn: false } | { user: User, loggedIn: true }

export type UserDispatch = Dispatch<UserDispatchActions>

export type LoginAction = (data: { userName: string, password: string }) => Promise<void>
export type LogoutAction = () => Promise<void>
export type ActionsAndState = { login: LoginAction, logout: LogoutAction, loading: boolean }