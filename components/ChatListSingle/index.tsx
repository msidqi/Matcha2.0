import { formatDate } from "@/utils/date";
import { ChatPreview } from "@/utils/requests/userRequests";

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
    className={`relative flex justify-start items-center h-24 px-6 hover:bg-gray-50 cursor-pointer ${
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
      <p className="text-gray-500 text-sm">
        {chatPreview.messagePreview
          ? chatPreview.messagePreview.content.length < 20
            ? chatPreview.messagePreview.content
            : `${chatPreview.messagePreview.content.substr(0, 20)}...`
          : "Start a new conversation!"}
      </p>
    </div>
    <div className="absolute right-4 top-5">
      <p className="text-gray-500">
        {chatPreview.messagePreview
          ? formatDate(chatPreview.messagePreview.date)
          : ""}
      </p>
    </div>
  </div>
);

export default ChatListSingle;
