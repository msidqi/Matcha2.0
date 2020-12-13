import { FC, useReducer, useEffect, useContext, createContext, useState } from "react"
import axios from 'axios';
import { userReducer } from './index';
import type { UserState, ActionsAndState, User, LogoutAction, LoginAction } from './types';

const initialUserState: UserState = {
    user: undefined,
    loggedIn: false,
}

const userContext = createContext<[UserState, ActionsAndState]>([initialUserState, { login: async () => { }, logout: async () => { }, loading: false }]);

export const useUser = () => useContext(userContext);

export const UserProvider: FC = ({ children }): JSX.Element => {
    const [state, dispatch] = useReducer(userReducer, initialUserState)
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        async function fetchUserData() {
            try {
                const result = await axios.get<{ accessToken: string }>('http://localhost:3001/api/generateAccessToken');
                console.log('generateAccessToken', result)
                if (result.status === 200) {
                    const accessToken = result.data.accessToken
                    // const result = await axios.post<{ accessToken: string, message: string }>('http://localhost:3001/api/getUserData', { accessToken });
                    const user: User = {
                        accessToken, firstname: 'blank', lastname: 'blank', username: 'blank', email: 'blank'
                    }
                    dispatch({ type: 'login', payload: { user } })
                }
                if (loading)
                    setLoading(false);
            } catch (e) {
                if (loading)
                    setLoading(false);
                console.error(e)
            }
        }
        fetchUserData()
    }, [])

    const login: LoginAction = async (userData): Promise<void> => {
        try {
            setLoading(true);
            const result = await axios.post<{ accessToken: string, message: string }>('http://localhost:3001/api/signIn', userData);
            if (result.status === 200) {
                const newUserValue: User = {
                    username: userData.userName,
                    accessToken: result.data.accessToken,
                    firstname: 'string',
                    lastname: 'string',
                    email: 'string',
                }
                dispatch({ type: 'login', payload: { user: newUserValue } })
            }
            loading && setLoading(false);
        } catch (e) {
            loading && setLoading(false);
            console.error(e)
        }
    }

    const logout: LogoutAction = async (): Promise<void> => {
        try {
            setLoading(true);
            const result = await axios.post<{ message: string }>('http://localhost:3001/api/logout');
            if (result.status === 200)
                dispatch({ type: 'logout' })
            loading && setLoading(false);
        } catch (e) {
            loading && setLoading(false);
            console.error(e)
        }
    }

    return (<userContext.Provider value={[{ ...state }, { login, logout, loading }]}> {children} </ userContext.Provider>)
}
