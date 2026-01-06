import {
  Avatar,
  Box,
  Divider,
  IconButton,
  Stack,
  Typography,
} from "@mui/material";
import React from "react";
import { IoCall } from "react-icons/io5";
import { FaVideo } from "react-icons/fa";
import { themeOrange } from "../../utils/colorTheme";
import { IoIosArrowBack } from "react-icons/io";
import { img_url } from "../../utils/helper/urls";

const ChatHeader = ({
  user_profile,
  user_name,
  handleVideCall,
  handleAudioCall,
  setBackValue,
}) => {
  const _handleBack = () => {
    setBackValue(false);
  };
  return (
    <div style={{ height: "10%" }}>
      <Stack
        direction={"row"}
        justifyContent={"space-between"}
        alignItems={"center"}
        sx={{
          background: "white",
          padding: "8px 20px",
          marginBottom: "10px",
          borderBottom: "1px solid #F1F1F1",
        }}
      >
        <Stack flexDirection={"row"} alignItems={"center"} gap={3}>
          <Stack
            direction={"row"}
            alignItems={"center"}
            justifyContent={"center"}
            gap={1}
          >
            <Box
              sx={{
                display: {
                  xl: "none",
                  lg: "none",
                  md: "none",
                  sm: "none",
                  xs: "block",
                },
                cursor: "pointer",
              }}
              onClick={_handleBack}
            >
              <IoIosArrowBack size={20} color="black" />
            </Box>
            <Avatar
              alt="Remy Sharp"
              src={user_profile || ""}
              sx={{ width: 50, height: 50 }}
            />
          </Stack>
          <Stack>
            <Typography
              sx={{
                fontSize: "18px",
                fontWeight: "500",
                fontFamily: '"Poppins", sans-serif',
                color: "#13131A",
                textTransform: "capitalize",
              }}
            >
              {user_name || ""}
            </Typography>
            <Typography
              sx={{
                fontSize: "16px",
                fontWeight: "400",
                fontFamily: '"Poppins", sans-serif',
                color: "#969696",
              }}
            >
              online
            </Typography>
          </Stack>
        </Stack>
        {/* <Stack flexDirection={"row"} alignItems={"center"} gap={2} px={1}>
          <IconButton onClick={handleAudioCall}>
            <IoCall size={20} color="white" />
          </IconButton>
          <IconButton onClick={handleVideCall}>
            <FaVideo size={20} color="white" />
          </IconButton>
        </Stack> */}
      
      </Stack>
    </div>
  );
};

export default ChatHeader;
