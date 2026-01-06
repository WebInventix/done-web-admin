import * as React from "react"
import PropTypes from "prop-types"
import AppBar from "@mui/material/AppBar"
import Box from "@mui/material/Box"
import CssBaseline from "@mui/material/CssBaseline"
import Divider from "@mui/material/Divider"
import Drawer from "@mui/material/Drawer"
import IconButton from "@mui/material/IconButton"
import List from "@mui/material/List"
import ListItem from "@mui/material/ListItem"
import ListItemButton from "@mui/material/ListItemButton"
import ListItemText from "@mui/material/ListItemText"
import MenuIcon from "@mui/icons-material/Menu"
import Typography from "@mui/material/Typography"
import logo from "../../assets/logo.png"
import { Container, Stack } from "@mui/material"
import { useNavigate } from "react-router-dom"
import "./navbar.css"
// import { useSelector } from "react-redux"

import SearchIcon from "@mui/icons-material/Search"
import { BsFillCartFill } from "react-icons/bs"
import { useSelector } from "react-redux"
import { success_toast_message } from "../../utils/toast_message"
import CustomButton from "../common/Button/Button"
import Input from "../common/Input/Input"
import { themeText } from "../../utils/colorTheme"
import { FaLocationDot } from "react-icons/fa6";
import ProfileMenu from "../common/menu/ProfileMenu"


const drawerWidth = 240

const navItemss = [
  {
    page: "Home",
    link: "/",
  },
  // {
  //   page: "test",
  //   link: "/",
  // },
  // {
  //   page: "test",
  //   link: "/",
  // },
  // {
  //   page: "test",
  //   link: "/",
  // },
  // {
  //   page: "test",
  //   link: "/",
  // },

  // {
  //   page: "test",
  //   link: "/",
  // },
]

function Navbar(props) {
  const { window } = props
  const [mobileOpen, setMobileOpen] = React.useState(false)
  const navigate = useNavigate()

  const { user , userAuth } = useSelector((state) => state.userAuth);
  const handleDrawerToggle = () => {
    setMobileOpen((prevState) => !prevState)
  }
  // const { userAuth } = useSelector((state) => state.auth)


  const handleSignUp = () => {
    navigate("/Signup")
  }

  const handleLogin = () => {
    navigate("/Login")
  }
  const handleSignUpUser = () => {
    navigate("/signup-user")
  }
  const token = JSON.parse(localStorage.getItem("auth"));

  // Agar token mojood hai
  // if (token) {
  //   // Token ka istemal karein
  //   console.log("Token: ", token);
  //   navigate("/ServiceDetails")
  // } else {
  //   // Agar token mojood nahi hai
  //   console.log("Token mojood nahi hai.");
  //   navigate("/Login")
  // }


  const drawer = (
    <Box onClick={handleDrawerToggle} sx={{ textAlign: "center" }}>
      <Typography variant="h6" sx={{ my: 2 }}>
        <img style={{ objectFit: "cover", width: "60%" }} src={logo} />
      </Typography>
      <Divider />
      <List>
        {/* {navItemss.map((item, index) => (
          <ListItem key={index} disablePadding>
            <ListItemButton
              onClick={() => navigate(item.link)}
              sx={{ textAlign: "center", color: "black" }}
            >
              <ListItemText primary={item.page} />
            </ListItemButton>
          </ListItem>
        ))} */}
        <Stack
          spacing={2}
          style={{ flexWrap: "wrap", justifyContent: "space-between" }}
        >
          {
            !token && <>
              <Stack justifyContent={"center"} alignItems="center">
                <CustomButton onClick={handleSignUpUser} >
                  Signup
                </CustomButton>
              </Stack>
              <Stack justifyContent={"center"} alignItems="center">
                <CustomButton onClick={handleLogin} >
                  Login
                </CustomButton>
              </Stack>
              <Stack justifyContent={"center"} alignItems="center">
                <CustomButton onClick={handleSignUp} >
                  Pro Signup
                </CustomButton>
              </Stack>


            </>
          }

        </Stack>
      </List>
    </Box>
  )
  const container =
    window !== undefined ? () => window().document.body : undefined
  return (
    <Container maxWidth="xl">
      <Box sx={{ display: "flex", color: "black" }} mt={2}>
        <CssBaseline />
        <AppBar
          component="nav"
          color="inherit"
          position="static"
          sx={{ boxShadow: "none" }}
        >
          {/* <Stack justifyContent={"flex-start"}>
                </Stack> */}
          <Stack
            className="sethampburger"
            display={"flex"}
            flexDirection={"row"}
            alignItems={"center"}
          >
            {/* <Toolbar > */}
            <IconButton
              color="inherit"
              aria-label="open drawer"
              edge="start"
              className="hamBurger"
              onClick={handleDrawerToggle}
              sx={{
                mr: 2,
                display: "none",
              }}
            >
              <MenuIcon />
            </IconButton>
            <Typography
              variant="h6"
              sx={{ display: { md: "block", sm: "none", xs: "none" } }}
            >
              <img style={{ objectFit: "cover", width: "134px" }} src={logo} />
            </Typography>
            <Stack
              sx={{
                flexGrow: {
                  xs: 1,
                  sm: 1,
                  md: 0,
                },
              }}
              direction="row"
              alignItems="center"
              gap={2}
            >
              {/* CART */}


              <Stack position={"relative"} className="cart">
                <Stack
                  sx={{
                    flexDirection: "row",
                    justifyContent: "center",
                    alignItems: "center",
                    gap: 2,
                  }}
                >
                  {
                    !token ?
                      <>
                        <Stack justifyContent={"center"} alignItems="center" px={2}>
                          <CustomButton style={{ backgroundColor: "#FFE2D8", color: themeText, borderRadius: "60px", alignItems: "center", justifyContent: "center", display: "flex", padding: "11px 28px" }}>
                            <FaLocationDot color="#f2561d" style={{ margin: "4px 5px" }} size={20} /> New York
                          </CustomButton>
                        </Stack>
                        <Stack justifyContent={"center"} alignItems="center">
                          <CustomButton onClick={handleSignUp}  >
                            Signup
                          </CustomButton>
                        </Stack>
                        {/* <Divider orientation="vertical" variant="middle" flexItem /> */}
                        <Stack justifyContent={"center"} alignItems="center">
                          <CustomButton onClick={handleLogin} style={{ backgroundColor: "transparent", color: themeText, border: `1px solid ${themeText}`, }}>
                            Login
                          </CustomButton>
                        </Stack>
                        <Stack justifyContent={"center"} alignItems="center">
                          <CustomButton onClick={handleSignUp} style={{ backgroundColor: "transparent", color: themeText, border: `1px solid ${themeText}`, }}>
                            Pro Signup
                          </CustomButton>
                        </Stack>
                      </> :
                      <Stack>

                        <Stack justifyContent={"center"} alignItems="center" px={2}>
                          <CustomButton style={{ backgroundColor: "#FFE2D8", color: themeText, borderRadius: "60px", alignItems: "center", justifyContent: "center", display: "flex", padding: "11px 28px" }}>
                            <FaLocationDot color="#f2561d" style={{ margin: "4px 5px" }} size={20} /> New York
                          </CustomButton>
                        </Stack>
                        <Stack>
                          <ProfileMenu />
                        </Stack>
                      </Stack>
                  }
                </Stack>
              </Stack>



              <Stack
                sx={{
                  display: {
                    xs: "none",
                    sm: "none",
                    md: "flex",
                    lg: "flex",
                    xl: "flex"
                  },
                }}
              >

              </Stack>
            </Stack>
            <Stack
              sx={{
                display: {
                  xs: "none",
                  sm: "none",

                  md: "flex",
                  color: "black",
                  flexDirection: "row",
                },
                flexDirection: "row",
                justifyContent: "center",
                alignItems: "center",
                gap: 2,
              }}
            >

              {
                !token ? <>
                  <Stack justifyContent={"center"} alignItems="center" px={2}>
                    <CustomButton style={{ backgroundColor: "#FFE2D8", color: themeText, borderRadius: "50px", alignItems: "center", justifyContent: "center", display: "flex", padding: "11px 28px" }}>

                      <FaLocationDot color="#f2561d" style={{ margin: "4px 5px" }} size={20} /> New York
                    </CustomButton>
                  </Stack>
                  <Stack justifyContent={"center"} alignItems="center">
                    <CustomButton onClick={handleSignUpUser} >
                      Signup
                    </CustomButton>
                  </Stack>
                  {/* <Divider orientation="vertical" variant="middle" flexItem /> */}
                  <Stack justifyContent={"center"} alignItems="center">
                    <CustomButton onClick={handleLogin} style={{ backgroundColor: "transparent", color: themeText, border: `1px solid ${themeText}`, }}>
                      Login
                    </CustomButton>
                  </Stack>
                  <Stack justifyContent={"center"} alignItems="center">
                    <CustomButton onClick={handleSignUp} style={{ backgroundColor: "transparent", color: themeText, border: `1px solid ${themeText}`, }}>
                      Pro Signup
                    </CustomButton>
                  </Stack>
                </> : <Stack flexDirection={'row'} alignItems={'center'}> <Stack justifyContent={"center"} alignItems="center" px={2}>
                  <CustomButton style={{ backgroundColor: "#FFE2D8", color: themeText, borderRadius: "50px", alignItems: "center", justifyContent: "center", display: "flex", padding: "11px 28px" }}>

                    <FaLocationDot color="#f2561d" style={{ margin: "4px 5px" }} size={20} /> New York
                  </CustomButton>
                </Stack>
                  <Stack>
                    <ProfileMenu />
                  </Stack>
                </Stack>
              }
              {/* )} */}
            </Stack>
          </Stack>
        </AppBar>
        <nav>
          <Drawer
            container={container}
            variant="temporary"
            open={mobileOpen}
            onClose={handleDrawerToggle}
            ModalProps={{
              keepMounted: true, // Better open performance on mobile.
            }}
            sx={{
              display: { xs: "block", sm: "block", md: "none" },
              "& .MuiDrawer-paper": {
                boxSizing: "border-box",
                width: drawerWidth,
              },
            }}
          >
            {drawer}
          </Drawer>
        </nav>
      </Box>
    </Container>
  )
}
Navbar.propTypes = {
  /**
   * Injected by the documentation to work in an iframe.
   * You won't need it on your project.
   */
  window: PropTypes.func,
}
export default Navbar
