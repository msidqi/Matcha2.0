import React from "react";
import { formatDate } from "@/utils/date";
import { useGetAllMatches, ChatPreview } from "@/utils/requests/userRequests";
import { useUser } from "@/components/auth";
import { LoadingAnimation } from "@/components/ui/Icons/LoadingIcon";
import { isArray } from "util";
import { OtherUser } from "@/interfaces";
import { useChatUsers } from "../useChat";

const ChatListSingle = ({
  chatPreview,
  isFirst,
  onClick,
}: {
  chatPreview: ChatPreview;
} & {
  isFirst?: boolean;
  onClick?: () => void;
}): JSX.Element => (
  <div
    onClick={onClick}
    className={`relative flex justify-start items-center h-24 px-6 hover:bg-gray-50 ${
      !isFirst ? "border-t border-gray-200" : ""
    }`}
  >
    <div className="rounded-lg h-14 w-14 overflow-hidden">
      <img
        src={
          chatPreview.images.find((elem) => elem.isProfilePicture == 1)?.src ??
          ""
        }
        className="object-cover object-center rounded-full h-full w-full"
      />
    </div>
    <div className="pl-4 pr-2">
      <h3 className="text-gray-700 font-bold">{chatPreview.userName}</h3>
      <p className="text-gray-500">{chatPreview.messagePreview.content}</p>
    </div>
    <div className="absolute right-4 top-5">
      {console.log(chatPreview)}
      <p className="text-gray-500">
        {formatDate(chatPreview.messagePreview.date) || ""}
      </p>
    </div>
  </div>
);

const ChatList = ({
  onClick,
}: {
  onClick?: (otherUser: OtherUser) => void;
}): JSX.Element => {
  const [{ user }] = useUser();
  const { authorization } = user!;
  const { isLoading, data } = useGetAllMatches({ authorization });
  const handlePreviewClick = (otherUser: OtherUser) => onClick?.(otherUser);
  const { addOtherUsers, otherUser } = useChatUsers();

  // select default user
  React.useEffect(() => {
    if (data?.[0] && otherUser?.id === -1) {
      addOtherUsers({
        userName: data[0].userName,
        id: data[0].id,
        image: data[0].images.find((elem) => elem.isProfilePicture),
      });
    }
  }, [isLoading]);

  return (
    <div className="bg-white h-full overflow-y-auto hidden sm:block sm:border-r sm:border-l sm:border-gray-200 sm:w-5/12">
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
