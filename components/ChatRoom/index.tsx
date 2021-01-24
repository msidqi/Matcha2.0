// import axios from "axios";
import React from "react";
import TextBuble from "@/components/ChatTextBuble";
import { io } from "socket.io-client";
import ArrowBack from "../ui/Icons/ArrowBack";
import { debounce } from "@/utils/debounce";
// import ArrowBack from "@/components/ui/Icons/ArrowBack";

interface TextMessage {
  date: Date;
  text: string;
  me: boolean;
}

interface ChatProps {
  onClickBack?: () => void;
}

const Chat = ({ onClickBack }: ChatProps): JSX.Element => {
  const [isAtBottom, setIsAtBottom] = React.useState<boolean>(true);
  const chatContainerRef = React.useRef<HTMLDivElement>(null);

  /* -- scroll to bottom && set onscroll event -- */
  React.useEffect(() => {
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
          setIsAtBottom(true);
        } else if (isAtBottom) {
          setIsAtBottom(false);
        }
      }, 100);
    }
  }, []);

  React.useEffect(() => {
    const socket = io("http://localhost:3001");
    console.log(socket);
    return () => {
      socket.close();
    };
  }, [io]);

  const currentUser = { name: "Mouad", lastConnected: "connected 2h ago" };
  const textMessages: TextMessage[] = [
    {
      me: true,
      text: "Hello world Hello world Hello world ",
      date: new Date(),
    },
    { me: false, text: "user2", date: new Date() },
    { me: true, text: "user3", date: new Date() },
    {
      me: false,
      text: "Lorem ipsum dolor sit, amet ",
      date: new Date(),
    },
    {
      me: false,
      text: "consectetur adipisicing elit",
      date: new Date(),
    },
    {
      me: false,
      text: "Distinctio inventore esse odio omnis repellendus autem est",
      date: new Date(),
    },
    { me: true, text: "Hey, How are you doing!", date: new Date() },
    { me: true, text: "beatae nostrum accusamus, laborum", date: new Date() },
    { me: true, text: "totam sit accusantium tenetur", date: new Date() },
    { me: true, text: "quidem corporis veniam", date: new Date() },
    { me: false, text: "another text", date: new Date() },
    { me: true, text: "some text", date: new Date() },
    { me: false, text: "another text", date: new Date() },
    { me: true, text: "some text", date: new Date() },
    { me: false, text: "another text", date: new Date() },
    { me: true, text: "some text", date: new Date() },
    { me: false, text: "another text", date: new Date() },
    { me: true, text: "some text", date: new Date() },
    { me: false, text: "another text", date: new Date() },
    { me: true, text: "some text", date: new Date() },
    { me: false, text: "another text", date: new Date() },
    { me: true, text: "some text", date: new Date() },
    { me: false, text: "another text", date: new Date() },
    { me: true, text: "some text", date: new Date() },
    { me: false, text: "another text", date: new Date() },
  ];

  const groupPosition = (index: number) => {
    const context = [
      textMessages[index - 1]?.me,
      textMessages[index]?.me,
      textMessages[index + 1]?.me,
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
        {textMessages.map(({ me, text }, index) => (
          <div key={index} className="block w-full my-0.5">
            <TextBuble
              text={text}
              isCurrentUser={me}
              group={groupPosition(index)}
            />
          </div>
        ))}
      </section>
      {/* chat input section --start-- */}
      <section
        className={`bg-white absolute bottom-0 left-0 w-full pt-1 pb-3 px-4  ${
          isAtBottom ? "" : "shadow"
        }`}
      >
        <input
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
