import React, { useState } from "react";
import "./../styleCss/ChatInput.css";

function ChatInput({ channelName, channelId }) {
  const [input, setInput] = useState("");

  const sendMessage = (e) => {
    e.preventDefault();

    if(channelId){
        
    }
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
