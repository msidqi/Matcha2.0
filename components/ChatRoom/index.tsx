import React from "react";
import TextBuble from "@/components/ChatTextBuble";
import ArrowBack from "@/components/ui/Icons/ArrowBack";
import { debounce } from "@/utils/debounce";
import { currentUser } from "./data.json";
import {
  emitOnConnect,
  listenOnConnect,
  emitOnEnter,
} from "@/utils/observers/chatObservers";
import { fromEvent, Subscription } from "rxjs";
import { map, tap, switchMap } from "rxjs/operators";
import { useUser } from "@/components/auth";
import { User } from "@/components/auth/classes";
import { useMessages, useGetAllMatches } from "@/utils/requests/userRequests";
import { TextMessage, OtherUser } from "@/interfaces";
import { LoadingAnimation } from "@/components/ui/Icons/LoadingIcon";
import { useSocketConnection } from "../Sockets";
import { useChatUsers } from "../useChat";

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
  const [state] = useUser();
  const { isOnline, connect$, socket } = useSocketConnection();
  const { otherUser } = useChatUsers();
  const { authorization }: User = state.user!;
  // const { data, isLoading } = useGetAllMatches({ authorization });
  // data?.find((elem) => elem.id)
  const {
    data: messagesHistory,
    fetchNextPage: fetchNextMessages,
    isLoading: isLoadingMessages,
  } = useMessages({ authorization, userId: otherUser.id });
  const [messagesHistoryLocal, setMessagesHistoryLocal] = React.useState<
    TextMessage[]
  >([]);
  // merge fetched messages and local messages
  const messagesHistoryPages: TextMessage[] = [
    ...(messagesHistory?.pages
      .flatMap((singlePage) => singlePage.data)
      .reverse() || []),
    ...messagesHistoryLocal,
  ];
  const chatContainerRef = React.useRef<HTMLDivElement>(null);
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

  const messageInputRef = React.useRef<HTMLInputElement>(null);
  // connect with sockets
  React.useEffect(
    () => {
      const input = messageInputRef.current;
      const subscriptions: Subscription[] = [];
      if (input && socket && connect$ /*&& otherUser.id !== -1*/) {
        // console.log(
        //   "otherUser.id 2",
        //   input,
        //   socket,
        //   connect$,
        //   otherUser.id,
        //   isOnline
        // );
        const sendOnConnect$ = connect$.pipe(
          switchMap((socket) =>
            emitOnEnter(input).pipe(
              map(({ content }) => {
                const newMessage = {
                  to: "test2", //otherUser.userName,
                  message: content,
                };
                const textMessage: TextMessage = {
                  content,
                  date: new Date(),
                  sender: 260,
                  receiver: 261, //otherUser.id,
                };
                setMessagesHistoryLocal((prev) => [...prev, textMessage]);
                socket.emit("message", newMessage);
                // scroll to bottom of chat box
                chatContainerRef.current &&
                  scrollToBottom(chatContainerRef.current);
              })
            )
          )
        );
        subscriptions.push(
          sendOnConnect$.subscribe(
            () => console.log("success"),
            (error) => console.log("error", error)
          )
        );
        const onMessageRecieved$ = connect$.pipe(
          switchMap((socket) => fromEvent<TextMessage>(socket, "message")),
          map((data) => {
            setMessagesHistoryLocal((prev) => [...prev, data]);
            // scroll to bottom of chat box
            chatContainerRef.current &&
              scrollToBottom(chatContainerRef.current);
          })
        );
        subscriptions.push(onMessageRecieved$.subscribe());
      }
      return () => subscriptions.forEach((sub) => sub.unsubscribe());
    },
    [
      /*otherUser.id*/
    ]
  );

  const isOtherUserMessage = (textMessage: TextMessage) =>
    textMessage.sender === otherUser.id;

  const chatBubblePosition = (index: number) => {
    const context = [
      messagesHistoryPages[index - 1]?.receiver === otherUser.id,
      messagesHistoryPages[index]?.receiver === otherUser.id,
      messagesHistoryPages[index + 1]?.receiver === otherUser.id,
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
        className="w-full pb-2 px-4 h-full overflow-y-auto"
        style={{ height: "calc(100% - 5.3rem)" }}
      >
        {isLoadingMessages ? (
          <div className="flex justify-center items-center h-full">
            <LoadingAnimation height="30" width="30" />
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
          ref={messageInputRef}
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
