import { apiRequest } from "@/utils/API";
import { UserInput } from "@/components/auth";
import { useMutation, useInfiniteQuery, useQuery } from "react-query";
import { Orientation, TextMessage } from "@/interfaces";
import { Image } from "@/components/auth/classes";
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

interface LikeProps {
  liker: string;
  liked: string;
}

export const like = ({
  liker,
  liked,
  authorization,
}: LikeProps & Authorization) => {
  return apiRequest(
    "post",
    "/api/like",
    { liker, liked },
    {
      headers: {
        Authorization: authorization,
      },
    }
  )[0];
};

export const deleteLike = ({
  liker,
  liked,
  authorization,
}: LikeProps & Authorization) => {
  return fetch("/api/like", {
    method: "delete",
    headers: new Headers({
      Authorization: authorization,
    }),
    body: JSON.stringify({ liker, liked }),
  }).then((res) => res.json());
};

interface BlockProps {
  blocker: string;
  blocked: string;
}

export const block = ({
  blocker,
  blocked,
  authorization,
}: BlockProps & Authorization) => {
  return apiRequest(
    "post",
    "/api/block",
    { blocker, blocked },
    {
      headers: {
        Authorization: authorization,
      },
    }
  )[0];
};

export const deleteBlock = ({
  blocker,
  blocked,
  authorization,
}: BlockProps & Authorization) => {
  return fetch("/api/block", {
    method: "delete",
    headers: new Headers({
      Authorization: authorization,
    }),
    body: JSON.stringify({ blocker, blocked }),
  }).then((res) => res.json());
};

export const getOtherUserInfosRequest = ({
  authorization,
  otherUserId,
}: { otherUserId: number } & Authorization) => {
  return apiRequest<UserInput>("get", `/api/otherUserInfos/${otherUserId}`, {
    headers: {
      Authorization: authorization,
    },
  })[0];
};

interface useMessagesProps {
  userId?: number;
  offset?: number;
  row_count?: number;
}

export const getMessagePreview = ({
  authorization,
  userId,
}: { userId: number } & Authorization) =>
  apiRequest<TextMessage[]>(
    "post",
    "/api/message",
    { userId, offset: 0, row_count: 1 },
    {
      headers: {
        Authorization: authorization,
      },
    }
  )[0];

export const useMessages = ({
  authorization,
  row_count = 12,
  offset,
  userId,
}: useMessagesProps & Authorization) => {
  return useInfiniteQuery(
    "message",
    ({ pageParam = 0 }) =>
      apiRequest<TextMessage[]>(
        "post",
        "/api/message",
        { userId, offset: pageParam, row_count },
        {
          headers: {
            Authorization: authorization,
          },
        }
      )[0],
    {
      enabled: userId != undefined,
      keepPreviousData: true,
      refetchOnWindowFocus: false,
      getNextPageParam: (lastPage) =>
        offset ?? JSON.parse(lastPage.config.data)?.offset + 1,
    }
  );
};

interface Match {
  id: number;
  userName: string;
  gender: "Male" | "Female";
  orientation: Orientation;
  experience: number;
}

export type ChatPreview = UserInput & { messagePreview: TextMessage };

export const useGetAllMatches = ({ authorization }: Authorization) => {
  return useQuery(
    "matches",
    async (): Promise<ChatPreview[] | undefined> => {
      // fetch matches
      const result = await apiRequest<Match[]>("get", "/api/match", {
        headers: {
          Authorization: authorization,
        },
      })[0];
      if (result.status === 200) {
        const matches = result.data.filter((match) => match);
        const userDataPromises = matches.map(({ id }) =>
          getOtherUserInfosRequest({ authorization, otherUserId: id })
        );
        // fetch first message of matches
        const messagesPreview = await Promise.all(
          matches.map(({ id }) =>
            getMessagePreview({ authorization, userId: id })
          )
        );
        // fetch rest of otherUserData (images)
        return (await Promise.all(userDataPromises))
          .map((elem, index) => {
            elem.data.images = elem.data.images.map(
              (image) => new Image(image)
            );
            // inserting message preview
            if (messagesPreview[index].status === 200) {
              return {
                ...elem.data,
                messagePreview: messagesPreview[index].data[0],
              };
            } else {
              const blankMessage: TextMessage = {
                sender: -1,
                receiver: -1,
                content: "",
                date: "",
              };
              return {
                ...elem.data,
                messagePreview: blankMessage,
              };
            }
          })
          .filter((chatPreview) => chatPreview);
      }
    }
  );
};
