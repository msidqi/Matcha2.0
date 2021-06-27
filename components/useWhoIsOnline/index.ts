import { useEffect, useState } from 'react'
import { useSocketConnection } from '../Sockets';

const EVENT_KEY_USER_DISCONNECTED = "user-disconnected";
const EVENT_KEY_RESPONSE_CONNECTED_USER = "responseConnectedUser";
const EVENT_KEY_CHECK_CONNECTED_USER = "checkConnectedUser";

type OtherUserStateType =
  | { connected: true; lastSeen: null, userId: number }
  | { connected: false; lastSeen: string, userId: number }
  | null;


const useWhoIsOnline = () => {
  const { socket } = useSocketConnection();
  const [whoIsOnline, setWhoIsOnline] =
   useState<Map<number, OtherUserStateType>>(new Map());
  console.log({ whoIsOnline });

  function updateOnlineState(userIds: number | number[]) {
    socket?.emit(EVENT_KEY_CHECK_CONNECTED_USER, userIds || whoIsOnline.keys());
  }

  function isUserOnline(id: number) {
    if (!whoIsOnline.has(id)) updateOnlineState([id])
    return Boolean(whoIsOnline?.get(id))
  }

  useEffect(() => {
    const timer = setInterval(updateOnlineState, 10000);
    return () => {
      clearInterval(timer);
    };
  }, []);

  useEffect(() => {
    if (socket) {
      // subscribe to event to check if user is connected
      socket.on(EVENT_KEY_RESPONSE_CONNECTED_USER, (data: any) => {
        console.log( EVENT_KEY_RESPONSE_CONNECTED_USER, data)
        if (Array.isArray(data)) {
          data.forEach((elem) => {
            console.log('userId', elem)
            whoIsOnline.set(elem.userId, elem)
          })
          setWhoIsOnline(new Map(whoIsOnline));
        }
      });

      socket.on(EVENT_KEY_USER_DISCONNECTED, (data: any) => {
        console.log(EVENT_KEY_USER_DISCONNECTED, data)
      })
    }

    return () => {
      socket?.off(EVENT_KEY_RESPONSE_CONNECTED_USER)
    }
  }, [socket]);

  return {
    whoIsOnline,
    isUserOnline,
  }
}

export default useWhoIsOnline
