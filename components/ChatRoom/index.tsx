import React from "react";
import TextBuble from "@/components/ChatTextBuble";
import ArrowBack from "@/components/ui/Icons/ArrowBack";
import { debounce } from "@/utils/debounce";
import { currentUser } from "./data.json";
import { useUser } from "@/components/auth";
import { User } from "@/components/auth/classes";
import { useMessages, useGetAllMatches } from "@/utils/requests/userRequests";
import { TextMessage, OtherUser } from "@/interfaces";
import { LoadingAnimation } from "@/components/ui/Icons/LoadingIcon";
import { useSocketConnection } from "../Sockets";
import { useChatUsers } from "../useChat";

type SocketMessageEventPayload = {
  to: string;
  message: string;
};

const EVENT_KEY_MESSAGE_SEND = "message";
const EVENT_KEY_MESSAGE_RECIEVE = "message";
const EVENT_KEY_CONNECT = "connect";
type MessageRecievedType = { from: string; message: string; date: string };

const scrollToBottom = (container: HTMLDivElement) => {
  container.scrollTop = container.scrollHeight;
};

interface ChatProps {
  onClickBack?: () => void;
}
// connectedUser 260
// test2 261
const ChatRoom = ({ onClickBack }: ChatProps): JSX.Element => {
  const [isAtBottom, setIsAtBottom] = React.useState<boolean>(true);
  const [message, setMessage] = React.useState<string>("");
  const [state] = useUser();
  const { socket } = useSocketConnection();
  const { otherUser } = useChatUsers();
  const { authorization, data: userData }: User = state.user!;
  // const { data, isLoading } = useGetAllMatches({ authorization });
  // data?.find((elem) => elem.id)
  const [messagesHistoryLocal, setMessagesHistoryLocal] = React.useState<
    TextMessage[]
  >([]);
  const {
    data: messagesHistory,
    fetchNextPage: fetchNextMessages,
    isLoading: isLoadingMessages,
  } = useMessages({
    authorization,
    userId: otherUser.id,
    onSuccess: () => setMessagesHistoryLocal([]),
  });
  // merge fetched messages and local messages
  const messagesHistoryPages: TextMessage[] = [
    ...(messagesHistory?.pages
      .flatMap((singlePage) => singlePage.data)
      .reverse() || []),
    ...messagesHistoryLocal,
  ];
  const chatContainerRef = React.useRef<HTMLDivElement>(null);
  // scroll to bottom of chat box
  React.useEffect(() => {
    chatContainerRef.current && scrollToBottom(chatContainerRef.current);
  }, [messagesHistoryLocal, chatContainerRef]);

  /*React.useEffect(() => {
    (async () => {
      fetchNextMessages();
      console.log("all messages 2", messagesHistory?.pages);
    })();
  }, [isLoadingMessages]);*/

  /* -- scroll to bottom && set onscroll event -- */
  React.useEffect(() => {
    let _mount = true;

    if (chatContainerRef.current) {
      scrollToBottom(chatContainerRef.current);
      chatContainerRef.current.onscroll = debounce(() => {
        if (
          chatContainerRef.current &&
          chatContainerRef.current.scrollTop +
            chatContainerRef.current.clientHeight ===
            chatContainerRef.current.scrollHeight
        ) {
          _mount && setIsAtBottom(true);
        } else if (isAtBottom) {
          _mount && setIsAtBottom(false);
        }
      }, 100);
    }

    return () => {
      _mount = false;
    };
  }, []);

  const onKeyEnterUp = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.keyCode === 13 && message && otherUser.id !== -1) {
      const newMessage: SocketMessageEventPayload = {
        to: otherUser.userName,
        message: message,
      };
      socket?.emit(EVENT_KEY_MESSAGE_SEND, newMessage);
      setMessage("");
      const textMessage: TextMessage = {
        content: message,
        date: new Date(),
        sender: userData.id,
        receiver: otherUser.id,
      };
      setMessagesHistoryLocal((prev) => [...prev, textMessage]);
    }
  };

  // connect with sockets
  React.useEffect(() => {
    if (socket && otherUser.id !== -1) {
      socket.on(EVENT_KEY_MESSAGE_RECIEVE, (data: MessageRecievedType[][]) => {
        console.log("on message", data);
        const messages: TextMessage[] = data.flat().map((elem) => ({
          content: elem.message,
          date: new Date(elem.date),
          sender: otherUser.id,
          receiver: userData.id,
        }));
        setMessagesHistoryLocal((prev) => [...prev, ...messages]);
      });
    } else if (socket) {
      socket.off(EVENT_KEY_CONNECT);
      socket.off(EVENT_KEY_MESSAGE_RECIEVE);
    }
  }, [otherUser.id]);

  const isOtherUserMessage = (textMessage?: TextMessage) =>
    typeof textMessage?.sender === "number" &&
    textMessage.sender === otherUser.id;

  const chatBubblePosition = (index: number) => {
    const context = [
      isOtherUserMessage(messagesHistoryPages[index - 1]),
      isOtherUserMessage(messagesHistoryPages[index]),
      isOtherUserMessage(messagesHistoryPages[index + 1]),
    ];
    if (context[0] !== context[1] && context[1] === context[2]) return "top";
    if (context[0] === context[1] && context[1] !== context[2]) return "bottom";
    if (context[0] === context[1] && context[1] === context[2]) return "middle";
    return "single";
  };

  // if (!otherUser || otherUser?.id === -1) return <>no user selected...</>;

  return (
    <div className="bg-white p-2 pb-14 h-full  relative w-full sm:w-7/12 sm:border-r sm:border-gray-200">
      <header className="p-2 pb-0 flex justify-start items-center w-full mb-5">
        {onClickBack && (
          <button
            className="sm:hidden rounded-full bg-gray-200 w-8 h-8 flex items-center justify-center"
            onClick={onClickBack}
          >
            <ArrowBack color="#fff" />
          </button>
        )}
        <div className="rounded-full h-14 w-14 overflow-hidden mx-2">
          <img
            src={otherUser.image?.src ?? "/profile.jpg"}
            className="object-cover object-center h-full w-full"
          />
        </div>
        <div className="">
          <h3 className="font-bold">{otherUser.userName}</h3>
          <p className="text-gray-500 text-xs">{currentUser.lastConnected}</p>
        </div>
      </header>
      {/* chat bubbles section --start-- */}
      <section
        ref={chatContainerRef}
        id="chatbox"
        className="w-full pb-2 px-4 h-full overflow-y-auto relative "
        style={{ height: "calc(100% - 5.3rem)" }}
      >
        {isLoadingMessages ? (
          <div className="flex justify-center items-center h-full">
            <LoadingAnimation height="30" width="30" />
          </div>
        ) : messagesHistoryPages.length === 0 ? (
          <div className="absolute bottom-10 transform -translate-x-1/2 left-1/2">
            <p className="text-gray-400">Start a new conversation !</p>
          </div>
        ) : (
          messagesHistoryPages.map((message, index) => (
            <div key={index} className="block w-full my-0.5">
              <TextBuble
                text={message.content}
                isCurrentUser={!isOtherUserMessage(message)}
                chatBubblePosition={chatBubblePosition(index)}
              />
            </div>
          ))
        )}
      </section>
      {/* chat input section --start-- */}
      <section
        className={`bg-white absolute bottom-0 left-0 w-full pt-1 pb-3 px-4  ${
          isAtBottom ? "" : "shadow"
        }`}
      >
        <input
          // ref={messageInputRef}
          onKeyUp={onKeyEnterUp}
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          className="bg-gray-100 rounded-3xl py-2 px-3 w-full placeholder-gray-400 focus:outline-none sm:focus:ring focus:border-blue-300"
          placeholder="type something"
        />
      </section>
      <style jsx>{`
        @media (max-width: 640px) {
          #chatbox::-webkit-scrollbar {
            display: none;
          }
          #chatbox {
            -ms-overflow-style: none; /* IE and Edge */
            scrollbar-width: none; /* Firefox */
          }
        }
      `}</style>
    </div>
  );
};

export default ChatRoom;
