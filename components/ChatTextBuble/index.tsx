import React from "react";

interface TextBubleProps {
  text: string;
  isCurrentUser: boolean;
  chatBubblePosition: "top" | "middle" | "bottom" | "single";
}

const TextBuble = ({
  text,
  isCurrentUser,
  chatBubblePosition,
}: TextBubleProps): JSX.Element => {
  let classes = isCurrentUser
    ? "bg-green-400 text-white mr-0 ml-auto"
    : "bg-gray-200 text-gray-500 ml-0 mr-auto";
  classes += ` ${
    chatBubblePosition === "top"
      ? `rounded-b${isCurrentUser ? "r" : "l"}-md rounded-b${
          !isCurrentUser ? "r" : "l"
        }-xl`
      : chatBubblePosition === "bottom"
      ? `rounded-t${isCurrentUser ? "r" : "l"}-md rounded-t${
          !isCurrentUser ? "r" : "l"
        }-xl`
      : chatBubblePosition === "middle"
      ? `${
          isCurrentUser
            ? "rounded-l-xl rounded-r-md"
            : "rounded-r-xl rounded-l-md"
        }`
      : ""
  } rounded-3xl`;
  return <div className={`${classes} py-2 px-3 w-max max-w-1/2 `}>{text}</div>;
};

export default TextBuble;
