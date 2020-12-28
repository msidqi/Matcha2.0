import React from "react";
import {io} from 'socket.io-client';

export function Chat(): JSX.Element {
  React.useEffect(() => {
	const socket = io('http://localhost:3001');
	console.log(socket)
  }, [io]);
  return (
    <div className="m-auto">
      <div className="chat-container">
        <input type="text" placeholder="Type a message" />
        <button>Send</button>
      </div>
    </div>
  );
}
