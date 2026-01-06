import { Divider, IconButton, Stack, SvgIcon } from "@mui/material";
import React, { useState } from "react";
import { NavLink, useLocation, useNavigate } from "react-router-dom";
import Typography from "@mui/material/Typography";
import { MdClose } from "react-icons/md";
import { useDispatch, useSelector } from "react-redux";
import logo_text from "../../assets/logo.png";
import { themeOrange } from "../../utils/colorTheme";
import useWindowDimensions from "../../utils/hooks/windowDimensions";
import { mdDownLayout } from "../../utils/helper/mdDownLayoutListener";
import { userDashboardRoutes } from "../../utils/sideRoute";
import { exit_session } from "../../config/apiHandle/apiHandle";
import CustomModal from "../common/CustomModal/CustomModal";
import ButtonComp from "../common/ButtonComp";
import { RxCross2 } from "react-icons/rx";
import { HiOutlineLogout } from "react-icons/hi";

export const UserSideBar = (props) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { pathname } = useLocation();
  const [openModal, setOpenModal] = useState(false);

  const { width } = useWindowDimensions();
  const { active, hidden, activeChangeHandle } = props;

  const { sideBarHide } = useSelector((state) => state.layout_controler);

  // Function to handle navigation and close the sidebar on mobile view
  const handleNavigation = (linkTo) => {
    navigate(linkTo);
    if (width <= 850) {
      activeChangeHandle(); // Close the sidebar if in mobile view
    }
  };

  return (
    <Stack
      spacing={2}
      className={`sidebar ${active && "active"} ${
        hidden && "hidden-side-bar"
      } ${sideBarHide && "hideSideBar"}`}
      justifyContent={"space-between"}
    >
      <Stack>
        {width > 850 ? (
          <Stack
            direction="row"
            alignItems="center"
            pl={4}
            pt={5}
            pb={12}
            spacing={1}
            sx={{ height: "45px" }}
          >
            <img
              onClick={() => navigate("/")}
              className="content-effect-logo-text"
              src={logo_text}
              style={{ cursor: "pointer" }}
            />
          </Stack>
        ) : (
          <Stack
            direction="row"
            alignItems="center"
            paddingX={2}
            justifyContent="space-between"
            pb={5}
          >
            <Stack
              direction="row"
              alignItems="center"
              mt={2.5}
              mb={2}
              spacing={1}
              sx={{ height: "45px" }}
            >
              <img
                onClick={() => navigate("/")}
                className="content-effect"
                style={{
                  width: "100px",
                  transition: "width 0.35s ease-in-out",
                  objectFit: "contain",
                  cursor: "pointer",
                }}
                src={logo_text}
              />
            </Stack>
            <Stack>
              <IconButton onClick={activeChangeHandle} size="large">
                <MdClose color="black" />
              </IconButton>
            </Stack>
          </Stack>
        )}

        {/* <!------------ USERFROMUSERSIDEROUTES ------------!> */}

        <Stack
          style={{ paddingLeft: width > 850 ? "0px" : "10px" }}
          spacing={1}
        >
          {React.Children.toArray(
            userDashboardRoutes.map((e) => {
              const { caption, linkTo, icon, list_in_sidebar } = e;
              const isActivePath = linkTo.split("/")[1];

              const isSidebarActive =
                pathname === "" ? "" : pathname.split("/")[1];

              return (
                list_in_sidebar && (
                  <NavLink
                    style={({ isActive }) => ({
                      textDecoration: "inherit",
                      borderRadius: "0px 50px 10px 0px",
                      height: "45px",
                      marginRight: "10px",
                      display: "flex",
                      alignItems: "center",
                      color: isActive ? "white" : "black",
                      background:
                        isSidebarActive === isActivePath
                          ? "var(--Orange, linear-gradient(180deg, #F15A24 0%, #C53F10 100%))"
                          : "rgba(250, 250, 250)",
                      // boxShadow:
                      //   mdDownLayout(width) &&
                      //   isActive &&
                      //   "rgba(0, 0, 0, 0.1) 0px 4px 12px",
                    })}
                    to={`${linkTo}`}
                    onClick={() => handleNavigation(linkTo)} // Call handleNavigation on click
                  >
                    <Stack
                      direction="row"
                      spacing={1}
                      style={{ paddingLeft: "23px" }}
                    >
                      <SvgIcon
                        style={{
                          paddingRight: "2px",
                          color:
                            isSidebarActive === isActivePath
                              ? "rgba(250, 250, 250)"
                              : "black",
                        }}
                      >
                        {icon}
                      </SvgIcon>

                      <Typography
                        noWrap
                        sx={{
                          color:
                            isSidebarActive === isActivePath
                              ? "rgba(250, 250, 250)"
                              : "black",
                        }}
                      >
                        {caption}
                      </Typography>
                    </Stack>
                  </NavLink>
                )
              );
            })
          )}
        </Stack>
      </Stack>

      <Stack sx={{ paddingBottom: "25px" }}>
        <Divider sx={{ my: 2 }} />
        <Stack
          direction={"row"}
          alignItems={"center"}
          onClick={() => setOpenModal(true)}
          sx={{
            paddingLeft: "23px",
            cursor: "pointer",
            marginBottom: "20px !important",
          }}
          gap={1}
        >
          <HiOutlineLogout
            style={{ color: "#071D5B", fontSize: "1.5rem", flexShrink: 0 }}
          />
          <Typography
            noWrap
            sx={{
              color: "black",
            }}
          >
            Sign Out
          </Typography>
        </Stack>
      </Stack>

      {/* <!--------- LOGOUT WARNING MODAL ---------!> */}
      <CustomModal
        isOpen={openModal}
        setIsOpen={() => setOpenModal(!openModal)}
      >
        <Stack
          sx={{
            overflow: "auto",
            backgroundColor: "white",
            borderRadius: "10px",
            zIndex: 100000,
          }}
          alignItems={"center"}
          p={1}
        >
          <Stack sx={{ width: "100%" }} alignItems={"flex-end"}>
            <IconButton
              onClick={() => {
                setOpenModal(!openModal);
              }}
            >
              <RxCross2 size={20} sx={{ color: "black" }} />
            </IconButton>
          </Stack>

          <Stack gap={2} px={1} sx={{ width: "100%" }}>
            <Typography
              sx={{
                color: "black",
                fontSize: "16px",
                fontWeight: "500",
                lineHeight: "24px",
              }}
            >
              Are you sure you want to logout?
            </Typography>

            <Stack
              gap={2}
              direction={"row"}
              alignItems={"center"}
              justifyContent={"flex-end"}
            >
              <ButtonComp
                onClick={() => exit_session()}
                label={"Yes"}
                style={{
                  width: "auto",
                  height: "auto",
                  borderRadius: "15px",
                  background:
                    "var(--Orange, linear-gradient(180deg, #F15A24 0%, #C53F10 100%))",
                }}
              />
              <ButtonComp
                onClick={() => {
                  setOpenModal(!openModal);
                }}
                label={"No"}
                style={{
                  width: "auto",
                  height: "auto",
                  borderRadius: "15px",
                  background:
                    "var(--Orange, linear-gradient(180deg, #F15A24 0%, #C53F10 100%))",
                }}
              />
            </Stack>
          </Stack>
        </Stack>
      </CustomModal>
    </Stack>
  );
};
