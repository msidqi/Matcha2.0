import { apiRequest } from "@/utils/API";
import { UserInput } from "@/components/auth";
import { useMutation } from "react-query";

interface GetUserInfoProps {
  authorization: string;
}

interface SingInUserProps {
  userData: {
    userName: string;
    password: string;
  };
}

interface logoutUserRequestProps {
  authorization: string;
  userName: string;
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

export const logoutUserRequest = ({
  authorization,
  userName,
}: logoutUserRequestProps) => {
  return apiRequest<{ message: string }>(
    "post",
    "/api/logout",
    { userName },
    {
      headers: {
        Authorization: authorization,
      },
    }
  );
};

interface UpdateUserDataProps {
  data: Partial<{
    userName: string;
    password: string;
    firstName: string;
    lastName: string;
    email: string;
    retryPassword: string;
    tags: string[];
    images: string[];
    profilPicture: string;
  }>;
  authorization: string;
}

export const useUpdateUserData = () => {
  return useMutation(({ data, authorization }: UpdateUserDataProps) => {
    const formdata = new FormData();
    for (const key in data) {
      if (Array.isArray((data as any)[key])) {
        (data as any)[key].forEach((elem: any) => formdata.append(key, elem));
      } else {
        formdata.append(key, (data as any)[key]);
      }
    }
    return apiRequest("post", "/api/updateProfile", formdata, {
      headers: {
        Authorization: authorization,
      },
    })[0];
  });
};
