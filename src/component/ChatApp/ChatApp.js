import React, { useEffect, useMemo, useState } from "react";
import ChatWindow from "./ChatWindow";
import ChatHeader from "./ChatHeader";
import "./ChatApp.css";
import { IoIosSend } from "react-icons/io";
import { IoMdAddCircleOutline } from "react-icons/io";
import { socket } from "../../config/apiHandle/apiHandle";
import { useDispatch, useSelector } from "react-redux";
import { Divider, Grid, Stack, Typography } from "@mui/material";
import { io } from "socket.io-client";

const ChatApp = ({
  messages,
  setMessage,
  sendMessage,
  userName,
  handleVideCall,
  handleAudioCall,
  user_profile,
  backValue
}) => {
  const [newMessage, setNewMessage] = useState("");

  const handleMessageChange = (event) => {
    setNewMessage(event.target.value);
    setMessage(event.target.value);
  };

  const handleSendMessage = (event) => {
    event.preventDefault();
    if (newMessage.trim() !== "") {
      sendMessage();
      setNewMessage("");
    }
  };
  return (
    <Stack justifyContent={"space-between"} sx={{ height: "100%" }}>
      <ChatHeader
        user_profile={user_profile}
        setBackValue={backValue}
        user_name={userName}
        handleVideCall={handleVideCall}
        handleAudioCall={handleAudioCall}
      />
      <ChatWindow messages={messages} avatar={user_profile} />

      <form className="input-container" onSubmit={handleSendMessage}>
        <input
          className="input-field"
          placeholder="Message"
          type="text"
          value={newMessage}
          onChange={handleMessageChange}
          style={{
            fontFamily: '"Poppins", sans-serif',
          }}
        />
        <button
          type="submit"
          className="submit-btn"
          style={{ cursor: "pointer" }}
        >
          <IoIosSend size={27} color={"white"} />
        </button>
      </form>
    </Stack>
  );
};

export default ChatApp;

{
  /* <IoMdAddCircleOutline size={40} color={"black"} /> */
}
