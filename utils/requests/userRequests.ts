import { apiRequest } from "../API";
import { UserInput } from "@/components/auth";

interface GetUserInfoProps {
  authorization: string;
}

interface SingInUserProps {
  userData: {
    userName: string;
    password: string;
  };
}

export const getUserInfoRequest = ({ authorization }: GetUserInfoProps) => {
  return apiRequest<UserInput>("get", "/api/userInfos", {
    headers: {
      Authorization: authorization,
    },
  });
};

export const generateAccessToken = () => {
  return apiRequest<{
    accessToken: string;
  }>("get", "/api/generateAccessToken");
};

export const signInUserRequest = ({ userData }: SingInUserProps) => {
  return apiRequest<{
    accessToken: string;
    message: string;
  }>("post", "/api/signIn", userData, { withCredentials: true });
};

export const logoutUserRequest = () => {
  return apiRequest<{ message: string }>("post", "/api/logout");
};
