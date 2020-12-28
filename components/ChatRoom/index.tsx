// import axios from "axios";
import React from "react";
import TextBuble from "@/components/ChatTextBuble";
import { io } from "socket.io-client";
// import ArrowBack from "@/components/ui/Icons/ArrowBack";

interface TextMessage {
  date: Date;
  text: string;
  me: boolean;
}

interface ChatProps {
  onClickBack?: () => void;
}

const Chat = (_: ChatProps): JSX.Element => {
  const [hasScrolled] = React.useState<boolean>(true);

  React.useEffect(() => {
    const socket = io("http://localhost:3001");
    console.log(socket);
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
    { me: false, text: "user4", date: new Date() },
    { me: true, text: "user5", date: new Date() },
    { me: true, text: "user6", date: new Date() },
    { me: true, text: "user6", date: new Date() },
    { me: true, text: "user6", date: new Date() },
    { me: true, text: "user6", date: new Date() },
    { me: true, text: "user6", date: new Date() },
    { me: true, text: "user6", date: new Date() },
    { me: true, text: "user6", date: new Date() },
    { me: true, text: "user6", date: new Date() },
    { me: true, text: "user6", date: new Date() },
    { me: true, text: "user6", date: new Date() },
    { me: true, text: "user6", date: new Date() },
    { me: true, text: "user6", date: new Date() },
    { me: true, text: "user6", date: new Date() },
    { me: true, text: "user6", date: new Date() },
    { me: true, text: "user6", date: new Date() },
    { me: true, text: "user6", date: new Date() },
    { me: true, text: "user6", date: new Date() },
    { me: true, text: "user6", date: new Date() },
    { me: true, text: "user6", date: new Date() },
    { me: true, text: "user6", date: new Date() },
    { me: true, text: "user6", date: new Date() },
  ];

  const handleGroup = (index: number) => {
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
        {/* <button
          className="rounded-full bg-gray-200 w-8 h-8 flex items-center justify-center"
          onClick={onClickBack}
        >
          <ArrowBack color="#fff" />
        </button> */}
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
      <div
        id="chatbox"
        className="w-full pb-2 px-4 h-full overflow-y-auto"
        style={{ height: "calc(100% - 5.3rem)" }}
      >
        {textMessages.map(({ me, text }, index) => (
          <div key={index} className="block w-full my-0.5">
            <TextBuble text={text} me={me} group={handleGroup(index)} />
          </div>
        ))}
      </div>
      {/* chat input section --start-- */}
      <div
        className={`bg-white absolute bottom-0 left-0 w-full pt-1 pb-3 px-4  ${
          hasScrolled ? "shadow " : ""
        }`}
      >
        <input
          className="bg-gray-100 rounded-3xl py-2 px-3 w-full placeholder-gray-400 focus:outline-none sm:focus:ring focus:border-blue-300"
          placeholder="type something"
        />
      </div>
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
