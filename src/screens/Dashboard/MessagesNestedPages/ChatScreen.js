import React, { useEffect, useMemo, useState } from "react";
import { Divider, Grid, Stack, Typography } from "@mui/material";
import { themeGray } from "../../../utils/colorTheme";
import ChatApp from "../../../component/ChatApp/ChatApp";
import UserList from "../../../component/ChatApp/userList";
import { useDispatch, useSelector } from "react-redux";
import { useLocation } from "react-router-dom";
import { io } from "socket.io-client";
import chat_start from "../../../assets/chat_start.png";

const ChatScreen = () => {
  const location = useLocation();
  const { id, first_name, last_name, avatar } = location.state || {};
  const { user } = useSelector((state) => state.userAuth);
  // const { get_all_chats_data } = useSelector((state) => state.chatManage);
  console.log("iddddd", first_name);
  console.log("iddddd", last_name);
  console.log("iddddd", avatar);
  const [selectedUser, setSelectedUser] = useState(null);
  const [messages, setMessages] = useState([]);
  const [message, setMessage] = useState("");
  const [roomId, setRoomId] = useState("");
  const [callType, setCallType] = useState(null);

  const socket = useMemo(
    () => io("https://chat-soft-2f178ffd0d28.herokuapp.com"),
    []
  );
  const dispatch = useDispatch();

  const createRoomId = (senderId, receiverId) => {
    const ids = [senderId, receiverId].sort();
    return `${ids[0]}-${ids[1]}`;
  };

  const handleSubmit = () => {
    if (!roomId || !message || !user?.id || !id) return;
    const currentDate = new Date().toISOString();
    socket.emit("message", {
      message,
      roomId,
      senderId: user?.id,
      receiverId: id,
      createdAt: currentDate,
      companyId: "66c7dcd95dbdcd5ccb67432a",
    });
    setMessage("");
  };

  const joinRoom = () => {
    if (!user?.id || !id) return;

    const newRoomId = createRoomId(user?.id, id);
    setRoomId(newRoomId);
    socket.emit("join-room", newRoomId);
    socket.emit("fetch-messages", {
      roomId: newRoomId,
      companyId: "66c7dcd95dbdcd5ccb67432a",
    });
  };

  useEffect(() => {
    if (id) {
      joinRoom();
    }
  }, [id]);

  useEffect(() => {
    socket.on("connect", () => {
      console.log("connected", socket.id);
    });

    socket.on("receive-message", (data) => {
      if (!data.createdAt) {
        data.createdAt = new Date().toISOString();
        console.log("receive-message", data);
      }

      setMessages((prevMessages) => [...prevMessages, data]);
    });

    socket.on("previous-messages", (data) => {
      console.log("previous-message", data);
      setMessages(data);
    });

    return () => {
      socket.off();
    };
  }, []);

  return (
    <div style={{ position: "relative", backgroundColor: themeGray }}>
      <Stack gap={1}>
        <Typography
          sx={{
            fontFamily: "Poppins, sans-serif",
            color: "black",
            fontSize: "32px",
            fontWeight: "bold",
            letterSpacing: "normal",
            lineHeight: "normal",
          }}
        >
          Messages
        </Typography>
        <Divider />
      </Stack>

      <Grid
        container
        alignItems={"stretch"}
        sx={{
          marginTop: "10px",
          borderRadius: "10px",
          overflow: "hidden",
        }}
      >
        <>
          {/* <Grid
              item
              xl={4}
              lg={4}
              md={4}
              sm={4}
              xs={12}
              sx={{
                display: {
                  xl: "block",
                  lg: "block",
                  md: "block",
                  sm: "block",
                  xs: id || selectedUser?.id ? "none" : "block",
                },
                position: "relative",
                height: "80vh",
              }}
            >
              <Stack
                sx={{
                  height: "100%",
                  backgroundColor: "#efefef",
                  position: "absolute",
                  left: "0px",
                  width: "100%",
                }}
              >
                <UserList onSelectUser={setSelectedUser} />
              </Stack>
            </Grid> */}

          <Grid
            item
            xl={8}
            lg={8}
            md={8}
            sm={8}
            xs={id ? 12 : 8}
            sx={{
              display: {
                xl: "block",
                lg: "block",
                md: "block",
                sm: "block",
                xs: id ? "block" : "none",
              },
              backgroundColor: "white",
              height: "80vh",
            }}
          >
            <Stack sx={{ height: "100%" }}>
              {id ? (
                <ChatApp
                  messages={messages}
                  setMessage={setMessage}
                  sendMessage={handleSubmit}
                  userName={`${first_name} ${last_name}`}
                  // backValue={() => setSelectedUser(null)}
                  handleVideCall={() => setCallType("video")}
                  handleAudioCall={() => setCallType("audio")}
                  user_profile={avatar || ""}
                />
              ) : (
                <Stack
                  sx={{
                    height: "100%",
                    backgroundColor: "white",
                  }}
                  alignItems={"center"}
                  justifyContent={"center"}
                >
                  <img
                    src={chat_start}
                    style={{
                      height: "25vw",
                      objectFit: "contain",
                    }}
                  />
                </Stack>
              )}
            </Stack>
          </Grid>
        </>
      </Grid>
    </div>
  );
};

export default ChatScreen;
