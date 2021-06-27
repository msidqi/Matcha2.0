import { NotificationType } from "@/interfaces";
import Link from "next/link";

const NotificationView = ({ type, notifier, isActive }: NotificationType) => {
  switch (type) {
    case "empty":
      return <p>No new notification</p>;
    case "consult":
      return (
        <p>
          <strong>{notifier?.userName}</strong>
          {` viewed your profile`}
        </p>
      );
    case "like":
      return (
        <p>
          <strong>{notifier?.userName}</strong>
          {` liked you`}
        </p>
      );
    case "unlike":
      return (
        <p>
          <strong>{notifier?.userName}</strong>
          {` unliked you`}
        </p>
      );
    case "match":
      return (
        <p>
          <strong>{notifier?.userName}</strong>
          {` liked you back`}
        </p>
      );
    case "message":
      return (
        <p>
          <strong>{notifier?.fromName}</strong>
          {` sent you a `}
          <Link href={`/messages?user=${notifier?.fromId}`}>
            <a className="underline">message</a>
          </Link>
        </p>
      );
    case "noNew":
      return <p>No new notifications</p>;
    default:
      return <p>Empty notification</p>;
  }
};

const Notification = (props: NotificationType): JSX.Element => {
  return (
    <div className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
      <NotificationView {...props} />
    </div>
  );
};

export default Notification;
