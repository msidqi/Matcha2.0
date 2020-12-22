// import axios from "axios";
import React from "react";
import TextBuble from "@/components/ChatTextBuble";

interface TextMessage {
    date: Date;
    text: string;
    me: boolean;
}

const Chat = (): JSX.Element => {
  const textMessages: TextMessage[] = [
    {me: true, text: "Hello world Hello world Hello world ", date: new Date()},
    {me: false, text: "user2", date: new Date()},
    {me: true, text: "user3", date: new Date()},
    {me: false, text: "user4", date: new Date()},
    {me: true, text: "user5", date: new Date()},
    {me: true, text: "user6", date: new Date()}
  ]
  return (
    <div className="flex">
      <section className="bg-white flex flex-wrap flex-1 items-center justify-center items-center p-2 w-full">
        {textMessages.map(({me, text}, index) => (
            <div key={index} className="block w-full py-2">
                <TextBuble text={text} me={me} />
            </div>
        ))}
      </section>
    </div>
  );
};

export default Chat;
