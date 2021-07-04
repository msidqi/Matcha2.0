import { useEffect, useState } from "react";
import { useSocketConnection } from "../Sockets";

const EVENT_KEY_USER_DISCONNECTED = "user-disconnected";
const EVENT_KEY_RESPONSE_CONNECTED_USER = "responseConnectedUser";
const EVENT_KEY_CHECK_CONNECTED_USER = "checkConnectedUser";

export type OtherUserStateType =
  | { connected: true; lastSeen: null; userId: number }
  | { connected: false; lastSeen: string; userId: number }
  | null;

const useWhoIsOnline = () => {
  const { socket } = useSocketConnection();
  const [whoIsOnline, setWhoIsOnline] = useState<
    Map<number, OtherUserStateType>
  >(new Map());

  function updateOnlineState(ids?: number[]) {
    if (!ids?.length && whoIsOnline.size == 0) return;

    socket?.emit(
      EVENT_KEY_CHECK_CONNECTED_USER,
      ids?.length ? ids : [...whoIsOnline.keys()]
    );
  }

  function isUserOnline(id: number) {
    return Boolean(whoIsOnline?.get(id));
  }

  useEffect(() => {
    const timer = setInterval(updateOnlineState, 3000);
    return () => {
      clearInterval(timer);
    };
  }, []);

  useEffect(() => {
    if (socket) {
      // subscribe to event to check if user is connected
      socket.on(EVENT_KEY_RESPONSE_CONNECTED_USER, (data: any) => {
        if (Array.isArray(data) && Array.isArray(data[0])) {
          const updatedWhoIsOnline = new Map();
          data[0].forEach((elem) => {
            if (elem.userId) updatedWhoIsOnline.set(elem.userId, elem);
          });
          setWhoIsOnline(updatedWhoIsOnline);
        }
      });

      socket.on(EVENT_KEY_USER_DISCONNECTED, (data: any) => {
        const userId = data[0]?.userId;
        if (
          Array.isArray(data) &&
          typeof userId == "number" &&
          whoIsOnline.has(userId)
        ) {
          whoIsOnline.set(userId, data[0]);
          setWhoIsOnline(new Map(whoIsOnline));
        }
      });
    }

    return () => {
      socket?.off(EVENT_KEY_RESPONSE_CONNECTED_USER);
      socket?.off(EVENT_KEY_USER_DISCONNECTED);
    };
  }, [socket]);

  return {
    whoIsOnline,
    isUserOnline,
    setWhoIsOnline,
    updateOnlineState,
  };
};

export default useWhoIsOnline;
