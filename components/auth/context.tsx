import React, {
  FC,
  useReducer,
  useEffect,
  useContext,
  createContext,
  useState,
} from "react";
import axios from "axios";
import { userReducer } from "./index";
import {
  UserState,
  ActionsAndState,
  User,
  LogoutAction,
  LoginAction,
} from "./types";
import { apiRequest } from "@/utils/API";

const initialUserState: UserState = {
  user: undefined,
  loggedIn: false,
};

const userContext = createContext<[UserState, ActionsAndState]>([
  initialUserState,
  {
    login: async () => {
      return;
    },
    logout: async () => {
      return;
    },
    loading: false,
  },
]);

export const useUser = (): [UserState, ActionsAndState] =>
  useContext(userContext);

export const UserProvider: FC = ({ children }): JSX.Element => {
  const [state, dispatch] = useReducer(userReducer, initialUserState);
  const [loading, setLoading] = useState(true);

  const fetchUserData = async () => {
    try {
      const response = await apiRequest<{ accessToken: string }>(
        "get",
        "/api/generateAccessToken"
      );
      console.log("/api/generateAccessToken", response.data);
      if (response.status === 200) {
        const user = new User({
          accessToken: response.data.accessToken,
        });
        console.log("getAuthorization", user.getAuthorization());
        const result = await apiRequest("get", "/api/userInfos", {
          headers: {
            Authorization: user.getAuthorization(),
          },
        });
        console.log("userInfos", result);

        dispatch({ type: "login", payload: { user } });
      }
    } catch (e) {
      console.error(e);
    }
    loading && setLoading(false);
  };

  useEffect(() => {
    fetchUserData();
    // return cancel request
  }, []);

  const login: LoginAction = async (userData): Promise<void> => {
    try {
      setLoading(true);
      const result = await apiRequest<{ accessToken: string; message: string }>(
        "post",
        "/api/signIn",
        userData,
        { withCredentials: true }
      );
      if (result.status === 200) {
        const newUserValue = new User({
          username: userData.userName,
          accessToken: result.data.accessToken,
          firstname: "string",
          lastname: "string",
          email: "string",
        });
        dispatch({ type: "login", payload: { user: newUserValue } });
      }
      console.log(result);
    } catch (e) {
      console.error(e);
    }
    loading && setLoading(false);
  };

  const logout: LogoutAction = async (): Promise<void> => {
    try {
      setLoading(true);
      const result = await axios.post<{ message: string }>("/api/logout");
      if (result.status === 200) dispatch({ type: "logout" });
    } catch (e) {
      console.error(e);
    }
    loading && setLoading(false);
  };

  return (
    <userContext.Provider value={[{ ...state }, { login, logout, loading }]}>
      {children}
    </userContext.Provider>
  );
};
