import React from "react";
import "./../styleCss/Messages.css";
function Messages({ message, date, username, userimg }) {
  return (
    <div className="message">
      <img src={userimg} alt="" />
      <div className="messsage__info">
        <h4>
          {username}
          <span className="message__timestamp">
            {message ? new Date(date).toUTCString() : ""}
          </span>
        </h4>
        <p>{message}</p>
      </div>
    </div>
  );
}

export default Messages;
