import { apiRequest } from "@/utils/API";
import { UserInput } from "@/components/auth";
import { useMutation } from "react-query";

interface Authorization {
  authorization: string;
}

interface SingInUserProps {
  userData: {
    userName: string;
    password: string;
  };
}

interface logoutUserRequestProps {
  userName: string;
}

export const getUserInfoRequest = ({ authorization }: Authorization) => {
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
}: logoutUserRequestProps & Authorization) => {
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
    images: File[];
    profilPicture: string;
  }>;
}

export const useUpdateUserData = () => {
  return useMutation(
    ({ data, authorization }: UpdateUserDataProps & Authorization) => {
      const formdata = new FormData();
      let key: keyof typeof data;
      for (key in data) {
        const element = data[key];
        if (Array.isArray(element)) {
          element.forEach((elem: string | File) => formdata.append(key, elem));
        } else if (typeof element === "object") {
          formdata.append(key, JSON.stringify(element));
        } else {
          formdata.append(key, (data as any)[key]);
        }
      }

      return apiRequest("post", "/api/updateProfile", formdata, {
        headers: {
          Authorization: authorization,
        },
      })[0];
    }
  );
};

export const deleteUserImageRequest = ({
  authorization,
  imageNameToDelete,
}: {
  imageNameToDelete: string;
} & Authorization) => {
  return fetch(`/api/image/${imageNameToDelete}`, {
    method: "delete",
    headers: new Headers({
      Authorization: authorization,
    }),
  }).then((res) => res.json());
};

export const getProfilePictureNameRequest = ({
  authorization,
}: Authorization) => {
  return apiRequest("get", "/api/getProfilePicture", {
    headers: {
      Authorization: authorization,
    },
  })[0];
};

export const getImageWithUserId = ({
  authorization,
  id,
}: Authorization & { id: number }) => {
  return apiRequest("get", `/api/image/${id}`, {
    headers: {
      Authorization: authorization,
    },
  })[0];
};
