import * as React from "react";
import { userReducer } from ".";
import { User } from "./types";
import type {
  UserState,
  ActionsAndState,
  LogoutAction,
  LoginAction,
  UserInput,
} from "./types";
import { apiRequest } from "@/utils/API";
import {
  LOGIN_ERROR_MESSAGE,
  USERDATA_ERROR_MESSAGE,
  LOGOUT_ERROR_MESSAGE,
  UserError,
} from "./errors";
import { Canceler } from "axios";

const initialUserState: UserState = {
  user: undefined,
  loggedIn: false,
};

const userContext = React.createContext<[UserState, ActionsAndState]>([
  initialUserState,
  {
    login: async () => {
      return;
    },
    logout: async () => {
      return;
    },
    loading: false,
    error: null,
  },
]);

export const useUser = (): [UserState, ActionsAndState] =>
  React.useContext(userContext);

export const UserProvider: React.FC = ({ children }): JSX.Element => {
  const [state, dispatch] = React.useReducer(userReducer, initialUserState);
  const [loading, setLoading] = React.useState<boolean>(true);
  const [error, setError] = React.useState<UserError | null>(null);

  React.useEffect(() => {
    let cancel: Canceler | undefined;

    (async function fetchUserData() {
      setLoading(true);
      error && setError(null);
      try {
        /* -------- get access token ------- */
        const [accessTokenRequest, cancelAccessTokenReq] = apiRequest<{
          accessToken: string;
        }>("get", "/api/generateAccessToken");
        cancel = cancelAccessTokenReq;
        const response = await accessTokenRequest;
        if (response.status !== 200)
          throw new UserError(USERDATA_ERROR_MESSAGE);
        const accessToken = response.data.accessToken;
        const user = state.user
          ? state.user.addProperties({ accessToken })
          : new User({
              accessToken,
            });
        /* -------- get user data ------- */
        const [userInfoRequest, cancelInfoReq] = apiRequest<UserInput>(
          "get",
          "/api/userInfos",
          {
            headers: {
              Authorization: user.authorization,
            },
          }
        );
        cancel = cancelInfoReq;
        const result = await userInfoRequest;
        if (result.status !== 200) throw new UserError(USERDATA_ERROR_MESSAGE);
        /* -------- update global user state ------- */
        user.addProperties({ ...result.data });
        dispatch({ type: "login", payload: { user } });
      } catch (e) {
        setError(e);
        console.error(e);
      }
      setLoading(false);
    })();

    return () => {
      console.log("cancel cleanup", cancel);
      cancel && cancel();
    };
  }, []);

  const login: LoginAction = async (userData): Promise<void> => {
    setLoading(true);
    error && setError(null);
    try {
      const [signInRequest] = apiRequest<{
        accessToken: string;
        message: string;
      }>("post", "/api/signIn", userData, { withCredentials: true });
      //   cancel = cancelSingInRequest;
      const responce = await signInRequest;
      if (responce.status !== 200) throw new UserError(LOGIN_ERROR_MESSAGE);
      const newUserValue = new User({
        userName: userData.userName,
        accessToken: responce.data.accessToken,
      });

      /* -------- get user data ------- */
      const [userInfoRequest] = apiRequest<UserInput>("get", "/api/userInfos", {
        headers: {
          Authorization: newUserValue.authorization,
        },
      });
      const result = await userInfoRequest;
      if (result.status !== 200) throw new UserError(LOGIN_ERROR_MESSAGE);
      /* -------- update global user state ------- */
      newUserValue.addProperties({ ...result.data });
      dispatch({ type: "login", payload: { user: newUserValue } });
      console.log("/api/signIn result.data", result.data);
    } catch (e) {
      setError(e);
      console.error(e);
    }
    setLoading(false);
  };

  const logout: LogoutAction = async (): Promise<void> => {
    // let cancel: undefined | Canceler;
    setLoading(true);
    error && setError(null);
    try {
      const [logoutRequest] = apiRequest<{ message: string }>(
        "post",
        "/api/logout"
      );
      //   cancel = cancelLogout;
      const result = await logoutRequest;
      if (result.status !== 200) throw new UserError(LOGOUT_ERROR_MESSAGE);
      dispatch({ type: "logout" });
    } catch (e) {
      setError(e);
      console.error(e);
    }
    setLoading(false);
  };

  return (
    <userContext.Provider
      value={[{ ...state }, { login, logout, loading, error }]}
    >
      {children}
    </userContext.Provider>
  );
};
