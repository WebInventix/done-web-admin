import { Container, Stack } from "@mui/system";
import React, { useEffect, useState } from "react";
import { CircularProgress, Grid, Typography } from "@mui/material";
import { BsFillEyeFill, BsFillEyeSlashFill } from "react-icons/bs";
import { useNavigate } from "react-router-dom";
import Input from "../../component/common/Input";
import ButtonComp from "../../component/common/ButtonComp";
import { themeBlue, themeOrange } from "../../utils/colorTheme";
import { useDispatch, useSelector } from "react-redux";
import authImage from "../../assets/auth_image.png";
import Logo from "../../assets/logo.png";
import "./auth.css";
import { common_caption_strings } from "../../utils/language_controls/constant_strings";
import { login_service_auth } from "../../services/authentication";
import { asyncStatus } from "../../utils/asyncStatus";
import { setIdleStatus } from "../../store/slices/user_auth_slice";
import { LoadingButton } from "@mui/lab";

const Login = () => {
  const dispatch = useDispatch();
  const [showPass, setShowPass] = useState(true);
  // const [value, setValue] = useState(true)
  const [data, setData] = useState({});
  // const dispatch = useDispatch();
  const navigate = useNavigate();
  const { user_login_status } = useSelector((state) => state.userAuth);

  const isLoading = user_login_status === asyncStatus.LOADING;

  const submitHandle = () => {
    let obj = {
      email: "martingarix7878@gmail.com",
      password: "password",
    };
    console.log(data);
    dispatch(login_service_auth(data));
  };
  useEffect(() => {
    if (user_login_status === asyncStatus.SUCCEEDED) {
      navigate("/");
      dispatch(setIdleStatus(setIdleStatus));
    }
  }, [user_login_status]);

  return (
    <Stack alignItems={"center"} justifyContent={"center"} width={"100%"}>
      <Stack
        sx={{
          width: { xl: "50%", lg: "50%", md: "50%", sm: "100%", xs: "100%" },
        }}
      >
        <Grid container>
          <Grid
            item
            xs={12}
            sm={12}
            md={12}
            lg={12}
            xl={12}
            alignItems={"center"}
            justifyContent={"center"}
          >
            <Container maxWidth={"xl"}>
              <Stack mt={2}>
                <Stack
                  justifyContent={"flex-start"}
                  sx={{
                    width: "100%",
                    padding: 5,
                  }}
                  textAlign={"left"}
                  color={"black"}
                >
                  <Stack
                    spacing={3}
                    mt={{ xl: 15, lg: 15, md: 15, sm: 5, xs: 5 }}
                    mb={2}
                  >
                    <Stack spacing={1}>
                      <Stack className="auth_Heading">
                        <span className="auth_Heading">
                          Login To{" "}
                          <span style={{ color: themeOrange }}>
                            Admin Account
                          </span>
                        </span>
                      </Stack>
                      <Stack className="auth_sub_Heading">
                        <span>Please login to continue your account.</span>
                      </Stack>
                    </Stack>
                    <Stack>
                      <Grid container spacing={2}>
                        <Grid item xs={12} sm={12} md={12} lg={12}>
                          <Input
                            id={"email"}
                            onChange={(e) =>
                              setData({
                                ...data,
                                [e.target.id]: e.target.value,
                              })
                            }
                            style={{ borderRadius: "6px" }}
                            placeholder={common_caption_strings.example_email}
                            label="Email"
                          />
                        </Grid>

                        <Grid item xs={12} sm={12} md={12} lg={12}>
                          <Stack position={"relative"}>
                            <Input
                              id={"password"}
                              type={showPass ? "password" : "text"}
                              onChange={(e) =>
                                setData({
                                  ...data,
                                  [e.target.id]: e.target.value,
                                })
                              }
                              style={{ borderRadius: "6px" }}
                              placeholder={common_caption_strings.password}
                              label="Password"
                            />

                            {showPass ? (
                              <BsFillEyeFill
                                onClick={() => setShowPass(false)}
                                style={{
                                  position: "absolute",
                                  top: 20,
                                  right: 10,
                                  cursor: "pointer",
                                }}
                                size={18}
                              />
                            ) : (
                              <BsFillEyeSlashFill
                                onClick={() => setShowPass(true)}
                                style={{
                                  position: "absolute",
                                  top: 20,
                                  right: 10,
                                  cursor: "pointer",
                                }}
                                size={18}
                              />
                            )}
                          </Stack>
                          {/* <Stack my={0.5} alignItems={"end"}>
                                                    <Typography sx={{cursor:"pointer"}} onClick={()=>navigate("/forgot-password")} className="mainPara">Forgot password</Typography>
                                                </Stack> */}
                        </Grid>
                      </Grid>
                    </Stack>
                  </Stack>
                  <Stack>
                    <ButtonComp
                      onClick={submitHandle}
                      label={
                        isLoading ? (
                          <CircularProgress size={22} sx={{ color: "white" }} />
                        ) : (
                          common_caption_strings.Login
                        )
                      }
                      style={{
                        borderRadius: "10px",
                        background:
                          "var(--Orange, linear-gradient(180deg, #F15A24 0%, #C53F10 100%))",
                      }}
                    />
                  </Stack>
                  {/* <Stack mt={1} direction={"row"} justifyContent={"center"}>
                                    <Typography color={"#9F9F9F"}>{common_caption_strings.dont_have_account}</Typography><Typography onClick={() => navigate("/dashboard")} sx={{ color: themeOrange, mx: "2px", cursor: "pointer" }}>{common_caption_strings.Create_one}</Typography>
                                </Stack> */}
                </Stack>
              </Stack>
            </Container>
          </Grid>
        </Grid>
      </Stack>
    </Stack>
  );
};
export default Login;
