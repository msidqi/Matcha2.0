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

  function updateOnlineState(userId: number) {
    socket?.emit(EVENT_KEY_CHECK_CONNECTED_USER, userId);
  }
  function isUserOnline(id: number) {
    return Boolean(whoIsOnline?.get(id))
  }

  function subscribeEffect() {
    if (socket) {
      // subscribe to event to check if user is connected
      socket.on(EVENT_KEY_RESPONSE_CONNECTED_USER, (data: any) => {
        console.log('EVENT_KEY_RESPONSE_CONNECTED_USER', EVENT_KEY_RESPONSE_CONNECTED_USER, data)
        const { lastSeen, connected: isConnected,userId  } = data?.[0] || {};
        setWhoIsOnline(new Map(whoIsOnline.set(userId, { lastSeen, isConnected })));
      });
    }

    return () => {
      socket?.off(EVENT_KEY_RESPONSE_CONNECTED_USER)
    }
  }

  useEffect(() => {
    const timer = setInterval(updateOnlineState, 5000);
    return () => {
      clearInterval(timer);
    };
  }, []);


  useEffect(subscribeEffect, [socket]);
  return {
    whoIsOnline,
    isUserOnline,
  }
}

export default useWhoIsOnline
