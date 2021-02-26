// import axios from "axios";
import React from "react";
import TextBuble from "@/components/ChatTextBuble";
import ArrowBack from "@/components/ui/Icons/ArrowBack";
import { debounce } from "@/utils/debounce";
// import ArrowBack from "@/components/ui/Icons/ArrowBack";
import { textMessagesData, currentUser } from "./data.json";
import {
  emitOnConnect,
  listenOnConnect,
  emitOnEnter,
} from "@/utils/observers/chatObservers";
import { of, fromEvent } from "rxjs";
import { filter, map } from "rxjs/operators";
import { useUser } from "@/components/auth";
import { User } from "@/components/auth/classes";
import { io } from "socket.io-client";
import { userInfo } from "os";
import { useMessages, useGetAllMatches } from "@/utils/requests/userRequests";
import { TextMessage } from "@/interfaces";
import { LoadingAnimation } from "@/components/ui/Icons/LoadingIcon";

interface TextMessageOld {
  date: Date;
  text: string;
  me: boolean;
}

interface ChatProps {
  onClickBack?: () => void;
  otherUserId?: number;
}
// connectedUser 260
// test2 261
const Chat = ({ onClickBack, otherUserId = 261 }: ChatProps): JSX.Element => {
  const [isAtBottom, setIsAtBottom] = React.useState<boolean>(true);
  const [state] = useUser();
  const { authorization }: User = state.user!;
  // const { data, isLoading } = useGetAllMatches({ authorization });
  // data?.find((elem) => elem.id)
  const {
    data: messagesHistory,
    fetchNextPage: fetchNextMessages,
    isLoading: isLoadingMessages,
  } = useMessages({ authorization, userId: otherUserId });
  // console.log("all messages", messagesHistory?.pages);
  const chatContainerRef = React.useRef<HTMLDivElement>(null);
  // React.useEffect(() => {
  //   (async () => {
  //     fetchNextMessages();
  //     console.log("all messages 2", messagesHistory?.pages);
  //   })();
  // }, [isLoadingMessages]);
  /* -- scroll to bottom && set onscroll event -- */
  React.useEffect(() => {
    let _mount = true;

    if (chatContainerRef.current) {
      chatContainerRef.current.scrollTop =
        chatContainerRef.current.scrollHeight;
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
  React.useEffect(() => {
    const socket = io("localhost:3001/", { auth: { token: authorization } });
    socket.on("connect", () => {
      // console.log(
      //   "connected"

      // );

      const input = messageInputRef.current;
      if (input) {
        const enterPressLogMessage$ = emitOnEnter(input).pipe(
          map(({ content }) =>
            socket.emit("message", {
              to: "test2",
              message: content,
            })
          )
        );
        enterPressLogMessage$.subscribe();
      }
    });
    /*emitOnConnect(
      of({
        to: "connectedUser",
        message: "this is a new message",
      })
    ).subscribe();
    listenOnConnect("message")
      .pipe(map((e) => console.log(e)))
      .subscribe();
    listenOnConnect("error")
      .pipe(map((e) => console.error(e)))
      .subscribe();*/
    // socket.on("message", (data: any) => {
    //   console.log("you just revieced a message2", data);
    // });
    // socket.on("error", console.error);
    // const data$ = of({ id });
    // const s$ = emitOnConnect(data$).subscribe(({ socket, data }) =>
    //   socket.send(data)
    // );
    // listenOnConnect("message").subscribe(() => {});
    // return s$.unsubscribe.bind(s$);
  }, []);

  const isOtherUserMessage = (textMessage: TextMessage) =>
    textMessage.receiver === otherUserId;

  const messagesHistoryPages: TextMessage[] =
    messagesHistory?.pages.flatMap((singlePage) => singlePage.data).reverse() ||
    [];

  const chatBubblePosition = (index: number) => {
    const context = [
      messagesHistoryPages[index - 1]?.receiver === otherUserId,
      messagesHistoryPages[index]?.receiver === otherUserId,
      messagesHistoryPages[index + 1]?.receiver === otherUserId,
    ];
    if (context[0] !== context[1] && context[1] === context[2]) return "top";
    if (context[0] === context[1] && context[1] !== context[2]) return "bottom";
    if (context[0] === context[1] && context[1] === context[2]) return "middle";
    return "single";
  };
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
            src="/profile.jpg"
            className="object-cover object-center h-full w-full"
          />
        </div>
        <div className="">
          <h3 className="font-bold">{currentUser.name}</h3>
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
          // onKeyUp={onEnter}
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

export default Chat;
