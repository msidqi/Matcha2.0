import { NotificationType } from "@/interfaces";

const Notification = ({
  type,
  notifier,
  seen,
}: NotificationType): JSX.Element => (
  <div
    className={`block px-4 py-2 text-sm text-gray-700 ${
      seen === false ? "hover:bg-gray-300 " : "hover:bg-gray-100 "
    }`}
  >
    {type === "empty" ? (
      <p>No new notification</p>
    ) : type === "consult" && notifier ? (
      <p>{`${notifier.userName} viewed your profile`}</p>
    ) : (
      <p>Empty Notification</p>
    )}
  </div>
);

export default Notification;
