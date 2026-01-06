import { Container, Stack } from "@mui/system";
import React, { useEffect, useState } from "react";
import { Grid, Typography } from "@mui/material";
import { BsFillEyeFill, BsFillEyeSlashFill } from "react-icons/bs";
import { useNavigate } from "react-router-dom";
import Input from "../../component/common/Input";
import ButtonComp from "../../component/common/ButtonComp";
import { themeBlue, themeOrange } from "../../utils/colorTheme";
import { useDispatch, useSelector } from "react-redux";
import authImage from '../../assets/auth_image.png'
import Logo from '../../assets/logo.png'
import './auth.css'
import { common_caption_strings } from "../../utils/language_controls/constant_strings";
import { login_service_auth } from "../../services/authentication";
import { asyncStatus } from "../../utils/asyncStatus";
import { setIdleStatus } from "../../store/slices/user_auth_slice";
import { LoadingButton } from "@mui/lab";

const CheckYourEmail = () => {
    const dispatch = useDispatch()
    const [showPass, setShowPass] = useState(true);
    // const [value, setValue] = useState(true)
    const [data, setData] = useState({});
    // const dispatch = useDispatch();
    const navigate = useNavigate();
    const { user_login_status } = useSelector((state) => state.userAuth);

    const submitHandle = () => {
        // let obj = {
        //     email: "martingarix7878@gmail.com",
        //     password: "password"
        // }
        // console.log(data);
        // dispatch(login_service_auth(data))

    }
    useEffect(() => {
        // if (user_login_status === asyncStatus.SUCCEEDED) {
        //     navigate("/")
        //     dispatch(setIdleStatus(setIdleStatus))

        // }
    }, [])



    return (
        <Stack>
            <Grid container >
                <Grid item xs={12} sm={12} md={6} lg={6} >
                    <Container maxWidth={"xl"}>
                        <Stack mt={2} >
                            <Stack
                                justifyContent={"flex-start"}
                                sx={{
                                    width: "100%",
                                    padding: 5,
                                }}
                                textAlign={"left"}
                                color={"black"}
                            >
                                <Stack spacing={3} mt={{ xl: 15, lg: 15, md: 15, sm: 5, xs: 5 }} mb={2}>
                                    <Stack spacing={1}>
                                        <Stack className="auth_Heading">
                                            <span className="auth_Heading">Check Your<span style={{ color: themeOrange, }}>Email</span></span>
                                        </Stack>
                                        <Stack className="auth_sub_Heading">
                                            <span>
                                                we have sent a password recovery instruction to your email.
                                            </span>

                                        </Stack>
                                    </Stack>
                                    <Stack >
                                        <Grid container spacing={2}>
                                            <Grid item xs={12} sm={12} md={12} lg={12} >
                                                <Input
                                                    id={"email"}
                                                    onChange={(e) =>
                                                        setData({ ...data, [e.target.id]: e.target.value })
                                                    }
                                                    style={{ borderRadius: "6px" }}
                                                    placeholder={"Enter Code"}
                                                    label="Enter Your email"
                                                />
                                                <Stack mt={0.5}>
                                                    <span className="mainPara">
                                                        Didn't receive the email? Check your spam filter or try <br />
                                                        <span style={{color:"#1C77BF",textDecorationLine:"underline",cursor:"pointer",lineHeight:2}}>
                                                            another email address.
                                                        </span>
                                                    </span>
                                                </Stack>
                                            </Grid>
                                        </Grid>
                                    </Stack>
                                </Stack>
                                <Stack>

                                    <LoadingButton
                                        onClick={submitHandle}
                                        style={{ padding: "16px 8px", fontSize: "18px", borderRadius: "8px", backgroundColor: themeOrange }}
                                        loading={user_login_status === asyncStatus.LOADING ? true : false} variant="contained">
                                        {common_caption_strings.confirm}
                                    </LoadingButton>
                                </Stack>
                                <Stack mt={1} direction={"row"} justifyContent={"center"}>
                                    <Typography sx={{ color: themeOrange, mx: "2px", cursor: "pointer",textDecorationLine:"underline" }}>{common_caption_strings.resend}</Typography>
                                </Stack>


                            </Stack>
                        </Stack>
                    </Container>
                </Grid>
                <Grid item xs={12} sm={12} md={6} lg={6} >
                    <Stack alignItems={"center"} className="bgImageSignup" width={1}>
                        {/* <img src={authImage} style={{  width: '80%', }} /> */}
                        <Stack mt={10} width={"70%"} className="transparent-bg" p={4} gap={5}>
                            <Stack>
                                <img width={"100px"} src={Logo} />
                            </Stack>
                            <Stack>
                                <Typography textAlign={"start"} className="subHeading" color={"white"}>We are <br />
                                    Invite Only Right Now</Typography>
                                <Typography className="mainPara" color={"white"}>Lorem ipsum dolor sit amet consectetur. Duis in venenatis nibh ipsum. At mattis praesent id odio. Adipiscing vel amet laoreet vel.</Typography>
                            </Stack>
                            <Stack mt={20}>
                                <Typography className="mainPara" color={"white"}>Already have an Account?</Typography>
                                <Typography className="mainPara" color={themeOrange}>Submit</Typography>
                            </Stack>
                        </Stack>
                    </Stack>
                </Grid>
            </Grid>
        </Stack>
    );

}
export default CheckYourEmail;