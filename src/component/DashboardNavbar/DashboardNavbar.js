import * as React from "react"
import PropTypes from "prop-types"
import AppBar from "@mui/material/AppBar"
import Box from "@mui/material/Box"
import CssBaseline from "@mui/material/CssBaseline"
import Divider from "@mui/material/Divider"
import Drawer from "@mui/material/Drawer"
import IconButton from "@mui/material/IconButton"
import List from "@mui/material/List"
import MenuIcon from "@mui/icons-material/Menu"
import Typography from "@mui/material/Typography"
import logo from "../../assets/logo.png"
import { Container, Stack } from "@mui/material"
import { useNavigate } from "react-router-dom"
import "./DashboardNavbar.css"
import CustomButton from "../common/Button/Button"
import { themeText } from "../../utils/colorTheme"
import { FaLocationDot } from "react-icons/fa6";
import ProfileMenu from "../common/menu/ProfileMenu"
import MailBadge from "../common/notificationsLabel/notificationsLabel"
import { AiOutlineMessage } from "react-icons/ai";





const drawerWidth = 240


function DashboardNavbar(props) {
  const { window } = props
  const [mobileOpen, setMobileOpen] = React.useState(false)
  const navigate = useNavigate()

  const handleDrawerToggle = () => {
    setMobileOpen((prevState) => !prevState)
  }
  // const { userAuth } = useSelector((state) => state.auth)


  const handleSignUp = () => {
    navigate("/Signup")
  }

  const handleLogin = () => {

  }


  const drawer = (
    <Box onClick={handleDrawerToggle} sx={{ textAlign: "center" }}>
      <Typography variant="h6" sx={{ my: 2 }}>
        <img style={{ objectFit: "cover", width: "60%" }} src={logo} />
      </Typography>
      <Divider />
      <List>
        <Stack
          spacing={2}
          style={{ flexWrap: "wrap", justifyContent: "space-between" }}
        >
          <>
            <Stack justifyContent={"center"} alignItems="center">
              <AiOutlineMessage size={35} cursor={'pointer'} />
            </Stack>
            <Stack justifyContent={"center"} alignItems="center">
              <ProfileMenu />
            </Stack>

          </>

        </Stack>
      </List>
    </Box>
  )
  const container =
    window !== undefined ? () => window().document.body : undefined
  return (
    <Container maxWidth={'xl'}  >
      <Box sx={{ display: "flex", color: "black" }} mt={2}>
        <CssBaseline />
        <AppBar
          component="nav"
          color="inherit"
          position="fixed"
          sx={{  pt: 2 }}
          elevation={1}

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

              <Stack className="cart">
                <Stack
                  sx={{
                    flexDirection: "row",
                    justifyContent: "center",
                    alignItems: "center",
                    gap: 2,
                    position: "absolute",
                    right: 1,
                    top:13
                  }}
                >
                  <Stack justifyContent={"center"} alignItems="center">
                    <AiOutlineMessage size={35} cursor={'pointer'} />
                  </Stack>
                  <Stack justifyContent={"center"} alignItems="center">
                    <ProfileMenu />
                  </Stack>
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

              <>
                <Stack justifyContent={"center"} alignItems="center">
                  <AiOutlineMessage size={35} cursor={'pointer'} />
                </Stack>
                <Stack justifyContent={"center"} alignItems="center">
                  <ProfileMenu />
                </Stack>
              </>
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
DashboardNavbar.propTypes = {
  /**
   * Injected by the documentation to work in an iframe.
   * You won't need it on your project.
   */
  window: PropTypes.func,
}
export default DashboardNavbar
