import { useEffect, useState } from 'react'
import { useSocketConnection } from '../Sockets';

const EVENT_KEY_RESPONSE_CONNECTED_USER = "responseConnectedUser";
const EVENT_KEY_CHECK_CONNECTED_USER = "checkConnectedUser";

type OtherUserStateType =
  | { isConnected: true; lastSeen: null }
  | { isConnected: false; lastSeen: string }
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
    const timer = setInterval(updateOnlineState, 5000);
    return () => {
      clearInterval(timer);
    };
  }, []);

  useEffect(() => {
    if (socket) {
      // subscribe to event to check if user is connected
      socket.on(EVENT_KEY_RESPONSE_CONNECTED_USER, (data: any) => {
        console.log('EVENT_KEY_RESPONSE_CONNECTED_USER', EVENT_KEY_RESPONSE_CONNECTED_USER, data)
        const result = data?.[0]
        if (Array.isArray(result)) {
          result.forEach(({lastSeen, connected: isConnected,userId}) => {
            whoIsOnline.set(userId, { lastSeen, isConnected })
          })
          setWhoIsOnline(new Map(whoIsOnline));
        }
      });
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
