import * as React from "react";
import { userReducer } from ".";
import { User } from "./classes";
import type {
  UserState,
  ActionsAndState,
  LogoutAction,
  LoginAction,
  SetUserAction,
  UserInput,
} from "./types";
import {
  LOGIN_ERROR_MESSAGE,
  USERDATA_ERROR_MESSAGE,
  LOGOUT_ERROR_MESSAGE,
  UserError,
} from "./errors";
import { Canceler } from "axios";
import {
  getUserInfoRequest,
  generateAccessToken,
  signInUserRequest,
  logoutUserRequest,
} from "@/utils/requests/userRequests";
import { useRouter } from "next/router";
import guestRoutes from "./guestRoutes.json";

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
    setUser: () => {
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
  const router = useRouter();

  React.useEffect(() => {
    let cancel: Canceler | undefined;
    (async function fetchUserData() {
      try {
        setLoading(true);
        setError(null);
        /* -------- get access token ------- */
        const [
          accessTokenRequest,
          cancelAccessTokenReq,
        ] = generateAccessToken();
        cancel = cancelAccessTokenReq;
        const response = await accessTokenRequest;
        if (response.status !== 200)
          throw new UserError(USERDATA_ERROR_MESSAGE);
        const { accessToken } = response.data;
        const user = state.user
          ? state.user.addProperties({ accessToken })
          : new User({
              accessToken,
            });
        /* -------- get user data ------- */
        const [userInfoRequest, cancelInfoReq] = getUserInfoRequest({
          authorization: user.authorization,
        });
        cancel = cancelInfoReq;
        const result = await userInfoRequest;
        if (result.status !== 200) throw new UserError(USERDATA_ERROR_MESSAGE);
        /* -------- update global user state ------- */
        user.addProperties({ ...result.data });
        dispatch({ type: "SET_USER", payload: { user } });
      } catch (e) {
        setError(e);
        dispatch({ type: "LOGOUT" });
        console.log(router.pathname);
        if (!guestRoutes.includes(router.pathname)) router.push("/signin");
        console.error(e);
      } finally {
        setLoading(false);
      }
    })();

    return () => cancel?.();
  }, []);

  const login: LoginAction = async (userData): Promise<void> => {
    try {
      setLoading(true);
      setError(null);
      /* -------- login user ------- */
      const response = await signInUserRequest({ userData })[0];
      if (response.status !== 200) throw new UserError(LOGIN_ERROR_MESSAGE);
      const newUserValue = new User({
        userName: userData.userName,
        accessToken: response.data.accessToken,
      });
      /* -------- get user data ------- */
      const result = await getUserInfoRequest({
        authorization: newUserValue.authorization,
      })[0];
      if (result.status !== 200) throw new UserError(LOGIN_ERROR_MESSAGE);
      /* -------- update global user state ------- */
      newUserValue.addProperties({ ...result.data });
      dispatch({ type: "LOGIN", payload: { user: newUserValue } });
      // console.log("/api/signIn result.data", result.data);
    } catch (e) {
      setError(e);
      console.error(e);
    } finally {
      setLoading(false);
    }
  };

  const logout: LogoutAction = async (): Promise<void> => {
    try {
      setLoading(true);
      setError(null);
      const result = await logoutUserRequest({
        authorization: state.user?.authorization || "",
        userName: state.user?.data.userName || "",
      })[0];
      if (result.status !== 200) throw new UserError(LOGOUT_ERROR_MESSAGE);
      dispatch({ type: "LOGOUT" });
    } catch (e) {
      setError(e);
      console.error(e);
    } finally {
      setLoading(false);
    }
  };

  const setUser: SetUserAction = (userData: Partial<UserInput>) => {
    const user = state.user
      ? state.user?.addProperties(userData)
      : new User(userData);
    dispatch({ type: "SET_USER", payload: { user } });
  };

  return (
    <userContext.Provider
      value={[{ ...state }, { login, logout, setUser, loading, error }]}
    >
      {children}
    </userContext.Provider>
  );
};
