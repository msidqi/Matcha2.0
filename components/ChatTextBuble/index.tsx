// import axios from "axios";
import React from "react";

interface TextBubleProps {
    text:string;
    me: boolean;
}

const TextBuble = ({text, me}: TextBubleProps): JSX.Element => {
    const classes = me ? 'bg-gray-200 text-gray-500' : 'bg-green-400 text-white'
    return (
        <div className={`${classes} rounded-3xl py-2 px-3 w-max max-w-1/2 `}>
            {text}
        </div>
    )
}

export default TextBuble;
