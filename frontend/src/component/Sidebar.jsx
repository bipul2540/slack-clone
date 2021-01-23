import React, { useEffect, useState } from "react";
import "./../styleCss/Sidebar.css";
import FiberManualRecordIcon from "@material-ui/icons/FiberManualRecord";
import CreateIcon from "@material-ui/icons/Create";
import InsertCommentIcon from "@material-ui/icons/InsertComment";
import SidebarOption from "./SidebarOption";
import InboxIcon from "@material-ui/icons/Inbox";
import DraftsIcon from "@material-ui/icons/Drafts";
import PeopleAltIcon from "@material-ui/icons/PeopleAlt";
import AppsIcon from "@material-ui/icons/Apps";
import FileCopyIcon from "@material-ui/icons/FileCopy";
import ExpandLessIcon from "@material-ui/icons/ExpandLess";
import BookmarkBorderIcon from "@material-ui/icons/BookmarkBorder";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import AddIcon from "@material-ui/icons/Add";
import axios from "./../axios";
import Pusher from "pusher-js";

function Sidebar() {
  const [channels, setChannel] = useState([]);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const response = await axios.get("/api/rooms/get");
      const data = await response.data;
      setChannel(
        data.map((item) => ({
          id: item._id,
          name: item.rname,
        }))
      );
    } catch (error) {
      console.log(error);
    }
  };

  //   applyiing pusher

  useEffect(() => {
    const pusher = new Pusher("3e9e59fcb70fcd44553b", {
      cluster: "ap2",
    });

    const channel = pusher.subscribe("rooms");
    channel.bind("inserted", function (newRooms) {
      //   alert(JSON.stringify(newRooms));
      setChannel([...channels, { id: newRooms._id, name: newRooms.rname }]);
    });

    return () => {
      channel.unbind_all();
      // channel.unsubscribe();
    };
  }, [channels]);

  console.log(channels);
  return (
    <div className="sidebar">
      <div className="sidebar__header">
        <div className="sidebar__info">
          <h2>Cleaver Programmer</h2>
          <h3>
            <FiberManualRecordIcon />
            Bipul kumar
          </h3>
        </div>
        <CreateIcon />
      </div>
      <SidebarOption Icon={InsertCommentIcon} title="Threads" />
      <SidebarOption Icon={InboxIcon} title="Mention & reactions" />
      <SidebarOption Icon={DraftsIcon} title="Saved items" />
      <SidebarOption Icon={BookmarkBorderIcon} title="channel browser" />
      <SidebarOption Icon={PeopleAltIcon} title="People & user groups" />
      <SidebarOption Icon={AppsIcon} title="Apps" />
      <SidebarOption Icon={FileCopyIcon} title="File browser" />
      <SidebarOption Icon={ExpandLessIcon} title="Show less" />
      <hr />
      <SidebarOption Icon={ExpandMoreIcon} title="Show more" />
      <hr />
      <SidebarOption Icon={AddIcon} addChannelOption title="Channel" />

      {channels.map((channel) => {
        return (
          <SidebarOption
            key={channel.id}
            id={channel.id}
            title={channel.name}
          />
        );
      })}
    </div>
  );
}

export default Sidebar;
