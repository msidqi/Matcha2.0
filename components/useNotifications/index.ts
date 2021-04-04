import { NotificationType } from "@/interfaces";
import React from "react";
import { useSocketConnection } from "@/components/Sockets";

const EVENT_KEY_NOTIFICATION = "notification";

type NotificationSeenType = NotificationType & { seen: boolean };

const makeSeen = (notif: NotificationType): NotificationSeenType => ({
  ...notif,
  seen: true,
});
const makeUnSeen = (notif: NotificationType): NotificationSeenType => ({
  ...notif,
  seen: true,
});

const useNotifications = (): {
  notifications: NotificationSeenType[];
  makeNotificationsSeen: () => void;
  newNotificationsNumber: number;
} => {
  const { socket } = useSocketConnection();
  const [notifications, setNotifications] = React.useState<
    NotificationSeenType[]
  >([]);
  React.useEffect(() => {
    if (socket) {
      socket.on(EVENT_KEY_NOTIFICATION, (data: NotificationType[]) => {
        console.log("event", data);
        setNotifications((prev) => prev.concat(data.map(makeUnSeen)));
      });
    }
  }, [socket]);

  const makeNotificationsSeen = () =>
    setNotifications((prev) => prev.map(makeSeen));

  const newNotificationsNumber = notifications.reduce(
    (prevValue, currentValue) =>
      currentValue.seen == false ? prevValue + 1 : prevValue,
    0
  );
  console.log(notifications);
  return { notifications, newNotificationsNumber, makeNotificationsSeen };
};

export default useNotifications;

/*
The user received a “like”.
• The user’s profile has been checked.
• The user received a message.
• A “liked” user “liked” back.
• A connected user “unliked” you.
*/
