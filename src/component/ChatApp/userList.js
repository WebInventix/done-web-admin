import React, { useEffect, useState } from "react";
import "./ChatApp.css";
import { Avatar, Stack, TextField, Typography } from "@mui/material";
import IconButton from "@mui/material/IconButton";
import SearchIcon from "@mui/icons-material/Search";
import { useDispatch, useSelector } from "react-redux";
import { img_url } from "../../utils/helper/urls";

const UserList = ({ onSelectUser }) => {
  const [selectedUser, setSelectedUser] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const { get_all_chats_data } = useSelector((state) => state.chatManage);

  const dispatch = useDispatch();

  // useEffect(() => {
  //   dispatch(getChatUsersListAsync());
  // }, []);

  const handleSelectUser = (user) => {
    setSelectedUser(user?.id);
    onSelectUser(user);
  };

  const filteredUsersList = get_all_chats_data.filter((user) => {
    const fullName = `${user?.first_name || ""} ${
      user?.last_name || ""
    }`.toLowerCase();
    return fullName.includes(searchTerm.toLowerCase());
  });

  const _handleLastMsgLength = (desc) => {
    const newDesc = desc?.slice(0, 35);
    return desc.length > 35 ? `${newDesc}...` : desc;
  };

  return (
    <div style={{ height: "100%", overflow: "hidden" }}>
      <Stack px={2} py={2.1}>
        <TextField
          placeholder={"Search User..."}
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          InputProps={{
            endAdornment: (
              <IconButton>
                <SearchIcon color="black" />
              </IconButton>
            ),
            sx: {
              "& ::placeholder": {
                color: "black",
                border: "none",
              },
              borderRadius: "10px",
              outline: "none",
              border: "none",
              height: "42px",
              border: "none",
              backgroundColor: "#d3d3d329",
            },
          }}
        />
      </Stack>
      <Stack sx={{ height: "100%", overflow: "auto" }}>
        {filteredUsersList?.map((user) => (
          <Stack
            key={user?.id}
            px={"18px"}
            py={"15px"}
            onClick={() => handleSelectUser(user)}
            flexDirection={"row"}
            className={`user ${selectedUser === user?.id ? "selected" : ""}`}
            gap={1}
          >
            <Stack mt={0.3}>
              <Avatar
                alt={user?.first_name || ""}
                src={`${img_url}${user?.avatar || ""}` || ""}
                sx={{ width: 60, height: 60 }}
              >
                {user?.first_name?.slice(0, 1) ?? ""}
                {user?.last_name?.slice(0, 1) ?? ""}
              </Avatar>
            </Stack>

            <Stack pl={1} pr={2} flexDirection={"column"} alignItems={"start"}>
              <Typography
                sx={{
                  fontSize: "24px",
                  fontWeight: "400",
                  color: selectedUser === user?.id ? "white" : "#13131A",
                  fontFamily: '"Poppins", sans-serif',
                  textTransform: "capitalize",
                  lineHeight: "normal",
                }}
              >
                {user?.first_name || ""} {user?.last_name || ""}
              </Typography>
              <Typography
                sx={{
                  fontSize: "16px",
                  fontWeight: "400",
                  color: selectedUser === user?._id ? "white" : "grey",
                  fontFamily: '"Poppins", sans-serif',
                  lineHeight: "normal",
                }}
              >
                {_handleLastMsgLength(
                  user?.lastmsgdata?.content ||
                    "Thanks, I can’t wait to see you tomorrow for coffee! "
                )}
              </Typography>
            </Stack>
          </Stack>
        ))}
      </Stack>
    </div>
  );
};

export default UserList;
