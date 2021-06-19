import { formatDate } from "@/utils/date";
import { Image } from "@/components/auth/classes";

const ChatListSingle = ({
  isFirst,
  onClick,
  image,
  dateMessage,
  lastMessage,
  userName,
}: {
  image: Image;
  dateMessage: string | null;
  userName: string;
  lastMessage: string | null;
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
        src={image.src ?? ""}
        className="object-cover object-center rounded-full h-full w-full"
      />
    </div>
    <div className="pl-4 pr-2">
      <h3 className="text-gray-700 font-bold">{userName}</h3>
      <p className="text-gray-500 text-sm">
        {lastMessage
          ? lastMessage.length < 20
            ? lastMessage
            : `${lastMessage.substr(0, 20)}...`
          : "Start a new conversation!"}
      </p>
    </div>
    <div className="absolute right-4 top-5">
      <p className="text-gray-500">
        {lastMessage && dateMessage ? formatDate(dateMessage) : ""}
      </p>
    </div>
  </div>
);

export default ChatListSingle;
