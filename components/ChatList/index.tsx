import React from "react";
import { useGetAllMatches } from "@/utils/requests/userRequests";
import { useUser } from "@/components/auth";
import { LoadingAnimation } from "@/components/ui/Icons/LoadingIcon";
import { isArray } from "util";
import { OtherUser } from "@/interfaces";
import { useChatUsers } from "@/components/useChat";
import ChatListSingle from "@/components/ChatListSingle";
import { useRouter } from "next/router";

const ChatList = (): JSX.Element => {
  const [{ user }] = useUser();
  const { authorization } = user!;
  const { isLoading, data } = useGetAllMatches({ authorization });
  const router = useRouter();
  const {
    addOtherUsers,
    toggleListAndRoom,
    otherUser,
    listRoom,
  } = useChatUsers();

  const handlePreviewClick = (newOtherUser: OtherUser) => {
    if (newOtherUser.id !== otherUser.id) addOtherUsers(newOtherUser);
    if (listRoom !== "room") toggleListAndRoom("room");
  };
  console.log("match data", data?.[0]);
  const selectDefaultUser = () => {
    let isUserAlreadySelected = false;
    // select user from query params
    if (typeof router.query.user === "string" && data && data.length > 0) {
      const userID = parseInt(router.query.user);
      if (!isNaN(userID)) {
        const queryOtherUser = data.find((elem) => elem.id === userID);
        if (queryOtherUser) {
          isUserAlreadySelected = true;
          toggleListAndRoom("room");
          addOtherUsers({
            userName: queryOtherUser.userName,
            id: queryOtherUser.id,
            image: queryOtherUser.images.find((elem) => elem.isProfilePicture),
          });
        }
      }
    }
    // select first user if user is not yet selected
    if (!isUserAlreadySelected && data?.[0] && otherUser?.id === -1) {
      addOtherUsers({
        userName: data[0].userName,
        id: data[0].id,
        image: data[0].images.find((elem) => elem.isProfilePicture),
      });
    }
  };

  React.useEffect(selectDefaultUser, [isLoading]);

  return (
    <div
      className={`bg-white h-full w-full overflow-y-auto sm:block sm:border-r sm:border-l sm:border-gray-200 sm:w-5/12 ${
        listRoom === "list" ? "" : "hidden"
      }`}
    >
      {isLoading ? (
        <div className="flex justify-center items-center h-full">
          <LoadingAnimation height="30" width="30" />
        </div>
      ) : !data || (isArray(data) && data.length === 0) ? (
        <div className="flex justify-center items-center h-full">
          <p>No matches found yet...</p>
        </div>
      ) : (
        data.map((chatPreview, index) => (
          <ChatListSingle
            onClick={() =>
              handlePreviewClick({
                userName: chatPreview.userName,
                id: chatPreview.id,
                image: chatPreview.images.find((elem) => elem.isProfilePicture),
              })
            }
            chatPreview={chatPreview}
            key={index}
            isFirst={index === 0}
          />
        ))
      )}
    </div>
  );
};

export default ChatList;
