import "./style.css";
import * as React from "react";
import { Box, Stack } from "@mui/material";
import { NavLink, useNavigate } from "react-router-dom";
import logo from "../../../assets/ServiceHub4-w.png";
import ButtonComp from "../ButtonComp";
import { sideBar } from "../../../utils/sideBar";

export default function Templates_SideBar({
  change_side_menu_handle,
  active_sidebar_index,
}) {
  // const { role } = useSelector((state) => state.userAuth);
  const navigate = useNavigate();

  return (
    <>
      <div style={{ backgroundColor: "#00397f" }} className="main_dashoard">
        <Stack
          display={{ md: "none", sm: "none", xs: "none", lg: "flex" }}
          py={3}
          justifyContent={"center"}
          alignItems={"center"}
          onClick={()=>navigate("/")}
          sx={{cursor:"pointer"}}
        >
          <img
            style={{ maxWidth: 180, height: 50, width: "100%" }}
            src={logo}
            alt="logo"
          />
        </Stack>

        {sideBar.map((e, i) => {
          const { name, linkTo, element, icon, list_in_sidebar, player, both } =
            e;
          return (
            list_in_sidebar && (
              <>
                {
                  <NavLink
                    to={`/dashboard${linkTo}`}
                    onClick={() => change_side_menu_handle(i)}
                    style={{
                      ":hover": {
                        backgroundColor: "#514e4e",
                        textDecoration: "none",
                      },
                      backgroundColor: i === active_sidebar_index && "#042650",
                      textDecoration: "none",
                    }}
                    className="iconsList"
                  >
                    <div className="contentparent">
                      <Box className="iconsbtn" color={"white"}>{icon}</Box>
                      <Box
                        sx={{
                          fontSize: "17px",
                          color: "white",
                          display: {
                            md: "none",
                            sm: "none",
                            xs: "none",
                            lg: "block",
                          },
                        }}
                      >
                        {name}
                      </Box>
                    </div>
                  </NavLink>
                }
              </>
            )
          );
        })}
        <Stack
          display={{ md: "none", sm: "none", xs: "none", lg: "flex" }}
          py={3}
          justifyContent={"center"}
          alignItems={"center"}
        >
          <Stack>
            <ButtonComp
              onClick={() => navigate("/")}
              // disabled={value}
              style={{
                padding: "10px 30px",

                fontSize: "18px",
                borderRadius: "8px",
              }}
              label="Log Out"
            />
          </Stack>
        </Stack>
      </div>
      <div></div>
    </>
  );
}
