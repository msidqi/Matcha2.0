import { NotificationType } from "@/interfaces";

const getNotificationView = ({ type, notifier }: NotificationType) => {
  switch (type) {
    case "empty":
      return <p>No new notification</p>;
    case "consult":
      return <p>{`${notifier.userName} viewed your profile`}</p>;
    case "liked back":
      return <p>{`${notifier.userName} viewed your profile`}</p>;
    case "matched user unliked you":
      return <p>{`${notifier.userName} viewed your profile`}</p>;
    case "new message":
      return <p>{`${notifier.userName} viewed your profile`}</p>;
    default:
      return <p>Empty Notification</p>;
  }
};

const Notification = ({ type, notifier }: NotificationType): JSX.Element => {
  const main = getNotificationView(type, notifier);
  return (
    <div className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
      {main}
    </div>
  );
};

export default Notification;

/*
The user received a “like”.
///• The user’s profile has been checked.
• The user received a message.
• A “liked” user “liked” back.
• A connected user “unliked” you.
*/
