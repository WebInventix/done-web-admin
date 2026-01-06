import React, { useEffect } from "react";
import {
  AppBar,
  Avatar,
  IconButton,
  Stack,
  Toolbar,
  Typography,
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import { useDispatch, useSelector } from "react-redux";
import { Container } from "@mui/system";
import "./style.css";
import { PiNotificationFill } from "react-icons/pi";
import { IoIosArrowForward } from "react-icons/io";
import { img_url } from "./../../utils/helper/urls";
import { TbNotification } from "react-icons/tb";
import { useNavigate } from "react-router-dom";

export const UserTopAppBar = ({ onClickHanlde }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { topbarHide } = useSelector((state) => state.layout_controler);
  const { user } = useSelector((state) => state.userAuth);
console.log("user",user)
  return (
    <Stack zIndex={1001}>
      <AppBar
        elevation={0}
        className={`topBarStyle ${topbarHide && "hideTopBar"}`}
        sx={{
          backgroundColor: "rgba(250, 250, 250)",
          width: "100%",
          height: 80,
          boxShadow: "0px 3px 5px -5px rgba(0, 0, 0, 0.75)",
        }}
        position="static"
      >
        <Toolbar sx={{ px: 5 }}>
          <Stack
            alignItems="center"
            sx={{ width: "100%" }}
            direction="row"
            justifyContent="space-between"
          >
            <IconButton
              onClick={onClickHanlde}
              size="large"
              edge="start"
              sx={{ color: "#0000008a" }}
              aria-label="menu"
            >
              <MenuIcon
                sx={{
                  display: {
                    xl: "none",
                    lg: "none",
                    md: "none",
                    sm: "flex",
                    xs: "flex",
                  },
                }}
              />
            </IconButton>

            <Container disableGutters maxWidth={"xl"}>
              <Stack
                sx={{ marginTop: "5px" }}
                direction="row"
                justifyContent="flex-end"
                alignItems="center"
                gap={3}
              >
                {/* <Stack
                  alignItems={"center"}
                  justifyContent={"center"}
                  sx={{
                    width: 43,
                    height: 43,
                    borderRadius: "15px",
                    border: "1px solid #F1F1F1",
                  }}
                >
                  <TbNotification
                    style={{ fontSize: "30px", color: "#646464" }}
                  />
                </Stack> */}

                <Stack
                  onClick={() => navigate("/")}
                  direction={"row"}
                  alignItems={"center"}
                  justifyContent={"space-between"}
                  sx={{
                    height: 43,
                    borderRadius: "15px",
                    border: "1px solid #F1F1F1",
                    overflow: "hidden",
                    cursor: "pointer",
                    ":hover": {
                      backgroundColor: "#f3f3f3",
                    },
                  }}
                  gap={1}
                >
                  <Avatar
                    alt="Remy Sharp"
                    src={user?.avatar || ""}
                    sx={{ width: "43px", height: "100%", borderRadius: "15px" }}
                  />

                  <Typography
                    sx={{
                      color: "#000",
                      fontSize: "16px",
                      fontWeight: "600",
                      fontFamily: '"Montserrat", sans-serif',
                    }}
                  >
                    {user?.first_name || ""}
                  </Typography>
                  <Stack
                    alignItems={"center"}
                    justifyContent={"center"}
                    sx={{ width: "43px", height: "100%" }}
                  >
                    <IoIosArrowForward
                      style={{ fontSize: "20px", color: "#000" }}
                    />
                  </Stack>
                </Stack>
              </Stack>
            </Container>
          </Stack>
        </Toolbar>
      </AppBar>
    </Stack>
  );
};
