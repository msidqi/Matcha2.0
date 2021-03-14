import { formatDate } from "@/utils/date";
import { ChatPreview } from "@/utils/requests/userRequests";
import Link from "next/link";

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
      <h3 className="text-gray-700 font-bold">
        <Link href={`/profile/${chatPreview.id}`}>
          <a className="cursor-pointer">{chatPreview.userName}</a>
        </Link>
      </h3>
      <p className="text-gray-500 text-sm">
        {chatPreview.messagePreview?.content || "Start a new conversation!"}
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
