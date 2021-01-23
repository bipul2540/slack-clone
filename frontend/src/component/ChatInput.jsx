import React, { useState } from "react";
import "./../styleCss/ChatInput.css";
import axios from "./../axios";
import { useStateValue } from "../StateProvider";

function ChatInput({ channelName, channelId }) {
  const [input, setInput] = useState("");
  const [{ user }] = useStateValue();

  const sendMessage = async (e) => {
    e.preventDefault();

    if (channelId) {
      const data = await axios.post(`/api/room/message/${channelId}`, {
        message: input,
        username: user.displayName,
        userimg: user.photoURL,
      });
      console.log(data);
    }

    setInput("");
  };

  return (
    <div className="chatinput">
      <form action="">
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder={`Message #${channelName}`}
        />
        <button type="submit" onClick={sendMessage}>
          send
        </button>
      </form>
    </div>
  );
}

export default ChatInput;
