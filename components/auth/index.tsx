import { useContext, createContext } from 'react'

type UserContext = {
    user?: {
        firstname: string;
        lastname: string;
        username: string;
        email: string;
        id: string;
        accessToken: string;
    }
    loggedIn: boolean;
}

export const user: UserContext = {
    user: undefined,
    loggedIn: false
}
const userContext = createContext<UserContext>(user);

export const useUser = () => useContext(userContext);

export const UserProvider = userContext.Provider;