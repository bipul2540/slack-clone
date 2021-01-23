import React, { useEffect, useState } from "react";
import "./../styleCss/Chat.css";
import { useParams } from "react-router-dom";
import StarBorderIcon from "@material-ui/icons/StarBorder";
import InfoOutlinedIcon from "@material-ui/icons/InfoOutlined";
import axios from "./../axios";
import Messages from "./Messages";
import ChatInput from "./ChatInput";

function Chat() {
  const { roomId } = useParams();
  const [roomDetails, setRoomDetails] = useState(null);
  const [roomMessages, setRoomMessages] = useState(null);

  useEffect(() => {
    const getData = async () => {
      if (roomId) {
        const response = await axios.get(`/api/room/${roomId}`);
        setRoomDetails(response.data);
      }

      // get only messages  in sorted format
      const response = await axios.get(`/api/room/messages/${roomId}`);
      setRoomMessages(response.data);
    };
    getData();
  }, [roomId]);

  console.log("room details is:-", roomDetails);
  console.log("room messages is:-", roomMessages);

  return (
    <div className="chat">
      <div className="chat__header">
        <div className="chat__headerLeft">
          <h4 className="chat__channelName">
            <strong># {roomDetails ? roomDetails.rname : ""}</strong>
            <StarBorderIcon />
          </h4>
        </div>
        <div className="chat__headerRight">
          <p>
            <InfoOutlinedIcon /> Details
          </p>
        </div>
      </div>
      <div className="chat__messages">
        {roomMessages ? (
          <Messages
            key={roomMessages._id}
            message={roomMessages.messages.message}
            username={roomMessages.messages.username}
            userimg={roomMessages.messages.userimg}
            date={roomMessages.messages.date}
          />
        ) : (
          ""
        )}
      </div>
      <ChatInput channelName={roomDetails?.rname} />
    </div>
  );
}

export default Chat;
