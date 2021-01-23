import React, { useEffect, useState } from "react";
import "./../styleCss/Chat.css";
import { useParams } from "react-router-dom";
import StarBorderIcon from "@material-ui/icons/StarBorder";
import InfoOutlinedIcon from "@material-ui/icons/InfoOutlined";
import axios from "./../axios";
import Messages from "./Messages";
import ChatInput from "./ChatInput";
import Pusher from "pusher-js";

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
      setRoomMessages(response.data.messages);
    };
    getData();
  }, [roomId]);


  useEffect(() => {
    const pusher = new Pusher("3e9e59fcb70fcd44553b", {
      cluster: "ap2",
    });

    const channel = pusher.subscribe("rooms");
    channel.bind("inserted", function (newChats) {
      alert(JSON.stringify(newChats));
      setRoomMessages([...roomMessages, { message: newChats.message }]);
    });

    return () => {
      channel.unbind_all();
      // channel.unsubscribe();
    };
  }, [roomMessages]);

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
        {roomMessages
          ? roomMessages.map((message) => {
              return (
                <Messages
                  key={message._id}
                  message={message.message}
                  username={message.username}
                  userimg={message.userimg}
                  date={message.date}
                />
              );
            })
          : ""}
      </div>
      <ChatInput channelName={roomDetails?.rname} channelId={roomId} />
    </div>
  );
}

export default Chat;
