import React, { useRef, useEffect, useState } from "react";
import { Avatar, Stack, Typography } from "@mui/material";
import { useSelector } from "react-redux";
import { img_url } from "../../utils/helper/urls";

const chatMsgDateFormate = (apiDate) => {
  const date = new Date(apiDate);

  // Format the date
  const formattedDate = date.toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  // Format the time
  const formattedTime = date.toLocaleTimeString("en-US", {
    hour: "2-digit",
    minute: "2-digit",
  });

  return `${formattedDate} at ${formattedTime}`;
};

const ChatWindow = ({ messages, avatar }) => {
  const chatWindowRef = useRef(null);
  const { user } = useSelector((state) => state.userAuth);

  useEffect(() => {
    if (chatWindowRef.current) {
      chatWindowRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [messages]);

  return (
    <Stack className="chat-window" gap={2}>
      {messages?.map((message, i) => {
        return (
          <Stack
            key={i}
            alignItems={
              +user?.id === +message?.senderId ? "flex-end" : "flex-start"
            }
            sx={{ width: "100%" }}
          >
            <Stack
              flexDirection={
                +user?.id === +message?.senderId ? "row-reverse" : "row"
              }
              gap={1}
              alignItems={"flex-end"}
            >
              <Stack>
                <Stack>
                  <Avatar
                    alt="Remy Sharp"
                    src={
                      +user?.id === +message?.senderId
                        ? user?.avatar
                        : avatar
                    }
                    sx={{ width: 30, height: 30 }}
                  />
                </Stack>
              </Stack>
              <Stack
                sx={{
                  background:
                    +user?.id === +message?.senderId
                      ? "#F1EBEB"
                      : "var(--Button-blue, linear-gradient(90deg, #071D5B 0%, #071D5B 100%))",
                  py: "10px",
                  px: "20px",
                  borderRadius: "9px",
                }}
                gap={1}
                justifyContent={"space-between"}
              >
                <Typography
                  sx={{
                    fontSize: 14,
                    lineHeight: "20px",
                    letterSpacing: "0.53px",
                    fontFamily: '"Poppins", sans-serif',
                    color: +user?.id === +message?.senderId ? "black" : "white",
                  }}
                >
                  {message?.content || ""}
                </Typography>

                <Typography
                  sx={{
                    fontSize: 9,
                    lineHeight: "20px",
                    letterSpacing: "0.53px",
                    fontFamily: '"Poppins", sans-serif',
                    color: +user?.id === +message?.senderId ? "black" : "white",
                    textAlign:
                      +user?.id === +message?.senderId ? "start" : "end",
                  }}
                >
                  {chatMsgDateFormate(message?.createdAt) || ""}
                </Typography>
              </Stack>
            </Stack>
          </Stack>
        );
      })}
      <div ref={chatWindowRef}></div>
    </Stack>
  );
};

export default ChatWindow;
