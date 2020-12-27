// import axios from "axios";
import React from "react";

interface TextBubleProps {
  text: string;
  me: boolean;
  group: "top" | "middle" | "bottom" | "single";
}

const TextBuble = ({ text, me, group }: TextBubleProps): JSX.Element => {
  let classes = me
    ? "bg-green-400 text-white mr-0 ml-auto"
    : "bg-gray-200 text-gray-500 ml-0 mr-auto";
  classes += ` ${
    group === "top"
      ? `rounded-b${me ? "r" : "l"}-md`
      : group === "bottom"
      ? `rounded-t${me ? "r" : "l"}-md`
      : group === "middle"
      ? "rounded-tr-md rounded-br-md"
      : ""
  } rounded-3xl`;
  return <div className={`${classes} py-2 px-3 w-max max-w-1/2 `}>{text}</div>;
};

export default TextBuble;
