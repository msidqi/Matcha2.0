// import axios from "axios";
import React from "react";
import { formatDate } from "@/utils/formatDate";

interface ChatPreview {
  preview: string;
  username: string;
  image: string;
  date: string;
}

const ChatList = (): JSX.Element => {
  const chatpreview: ChatPreview[] = [
    {
      preview: "some preview text",
      username: "user2",
      image: "/profile.jpg",
      date: new Date(2020, 12, 25).toJSON(),
    },
    {
      preview: "some preview text",
      username: "user3",
      image: "/profile.jpg",
      date: new Date(2020, 12, 23).toJSON(),
    },
    {
      preview: "some preview text",
      username: "user4",
      image: "/profile.jpg",
      date: new Date(2020, 12, 24).toJSON(),
    },
    {
      preview: "some preview text",
      username: "user5",
      image: "/profile.jpg",
      date: new Date(2020, 12, 24).toJSON(),
    },
    {
      preview: "some preview text",
      username: "user6",
      image: "/profile.jpg",
      date: new Date(2020, 12, 22).toJSON(),
    },
    {
      preview: "some preview text",
      username: "user6",
      image: "/profile.jpg",
      date: new Date(2020, 12, 22).toJSON(),
    },
    {
      preview: "some preview text",
      username: "user6",
      image: "/profile.jpg",
      date: new Date(2020, 12, 21).toJSON(),
    },
    {
      preview: "some preview text",
      username: "user6",
      image: "/profile.jpg",
      date: new Date(2020, 12, 21).toJSON(),
    },
    {
      preview: "some preview text",
      username: "user6",
      image: "/profile.jpg",
      date: new Date(2020, 12, 21).toJSON(),
    },
    {
      preview: "some preview text",
      username: "user6",
      image: "/profile.jpg",
      date: new Date(2020, 12, 21).toJSON(),
    },
    {
      preview: "some preview text",
      username: "user6",
      image: "/profile.jpg",
      date: new Date(2020, 12, 21).toJSON(),
    },
    {
      preview: "some preview text",
      username: "user6",
      image: "/profile.jpg",
      date: new Date(2020, 12, 21).toJSON(),
    },
    {
      preview: "some preview text",
      username: "user6",
      image: "/profile.jpg",
      date: new Date(2020, 12, 24).toJSON(),
    },
    {
      preview: "some preview text",
      username: "user6",
      image: "/profile.jpg",
      date: new Date(2020, 12, 24).toJSON(),
    },
  ];
  return (
    <div className="bg-white h-full overflow-y-auto hidden sm:block sm:border-r sm:border-l sm:border-gray-200 sm:w-5/12">
      {chatpreview.map((elem, index) => (
        <div
          key={index}
          className={`relative flex justify-start items-center h-24 px-6 ${
            index !== 0 ? "border-t border-gray-200" : ""
          }`}
        >
          <div className="rounded-lg h-14 w-14 overflow-hidden">
            <img
              src={elem.image}
              className="object-cover object-center rounded-full h-full w-full"
            />
          </div>
          <div className="pl-4 pr-2">
            <h3 className="text-gray-700 font-bold">{elem.username}</h3>
            <p className="text-gray-500">{elem.preview}</p>
          </div>
          <div className="absolute right-4 top-5">
            <p className="text-gray-500">{formatDate(elem.date) || ""}</p>
          </div>
        </div>
      ))}
    </div>
  );
};

export default ChatList;
