import { Container, Stack } from "@mui/system";
import React, { useEffect, useState } from "react";
import { Grid, Typography } from "@mui/material";
import { BsFillEyeFill, BsFillEyeSlashFill } from "react-icons/bs";
import { useNavigate } from "react-router-dom";
import Input from "../../component/common/Input";
import ButtonComp from "../../component/common/ButtonComp";
import { themeBlue, themeOrange } from "../../utils/colorTheme";
import { useDispatch, useSelector } from "react-redux";
import { common_caption_strings } from "../../utils/language_controls/constant_strings";
import authImage from '../../assets/auth_image.png'
import Logo from '../../assets/logo.png'
import './auth.css'
import { signup_service_auth } from "../../services/authentication";
import { toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import { asyncStatus } from "../../utils/asyncStatus";
import { setIdleRegisterStatus } from "../../store/slices/user_auth_slice";
import { LoadingButton } from "@mui/lab";
import { error_toast_message } from "../../utils/toast_message";


const UserSignUp = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch()
    const { user_register_status } = useSelector((state) => state.userAuth);


    const [data, setData] = useState({});
    const [showPass, setShowPass] = useState(true);
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [errorMessage, setErrorMessage] = useState('');

    const handlePasswordChange = (event) => {
        setPassword(event.target.value);
    };

    const handleConfirmPasswordChange = (event) => {
        setConfirmPassword(event.target.value);
    };


    const submitHandle = () => {

        if (password !== confirmPassword) {
            error_toast_message("Passwords do not match")
        } else if (password.length < 7) {
            error_toast_message("The password must be at least 7 characters")
        } else {
            let obj = {
                ...data,
                password: password,
                user_role: 2
            }
            dispatch(signup_service_auth(obj))
            // console.log(obj);
        }

    }

    useEffect(() => {
        if (user_register_status === asyncStatus.SUCCEEDED) {
            navigate("/")
            dispatch(setIdleRegisterStatus(setIdleRegisterStatus))

        }
    }, [user_register_status])
    return (
        <Stack>
            <Grid container >
                <Grid item xs={12} sm={12} md={6} lg={6} >
                    <Container maxWidth={"xl"}>
                        <Stack  mt={{ xl: 8, lg: 8, md: 8, sm: 5, xs: 5 }}>
                            <Stack
                                justifyContent={"flex-start"}
                                sx={{
                                    padding: 5,
                                }}
                                textAlign={"left"}
                                color={"black"}
                            >
                                <Stack spacing={3} mb={2}>
                                    <Stack spacing={1}>
                                        <Stack className="auth_Heading">
                                            <span className="auth_Heading">Welcome To <span style={{ color: themeOrange, }}>Done</span></span>
                                        </Stack>
                                        <Stack className="auth_sub_Heading">
                                            <span>
                                                Create a free account with Done. Have an account?<span onClick={()=>navigate("/login")} style={{ color: themeBlue, fontWeight: "bold", cursor: "pointer" }}>Log In</span>
                                            </span>

                                        </Stack>
                                    </Stack>
                                    <Stack >
                                        <Grid container spacing={2}>
                                            <Grid item xs={12} sm={12} md={6} lg={6} >
                                                <Input
                                                    id={"first_name"}
                                                    onChange={(e) =>
                                                        setData({ ...data, [e.target.id]: e.target.value })
                                                    }
                                                    style={{ borderRadius: "6px" ,outlined:"none",border:"none"}}
                                                    placeholder={common_caption_strings.first_name}
                                                    label="First Name"
                                                />
                                            </Grid>
                                            <Grid item xs={12} sm={12} md={6} lg={6} >
                                                <Input
                                                    id={"last_name"}
                                                    type={"text"}
                                                    onChange={(e) =>
                                                        setData({ ...data, [e.target.id]: e.target.value })
                                                    }
                                                    style={{ borderRadius: "6px" }}
                                                    placeholder={common_caption_strings.last_name}
                                                    label="Last Name"
                                                />
                                            </Grid>
                                            <Grid item xs={12} sm={12} md={6} lg={6} >
                                                <Input
                                                    id={"email"}
                                                    type={"text"}
                                                    onChange={(e) =>
                                                        setData({ ...data, [e.target.id]: e.target.value })
                                                    }
                                                    style={{ borderRadius: "86x" }}
                                                    placeholder={common_caption_strings.example_email}
                                                    label="Email"
                                                />
                                            </Grid>
                                            <Grid item xs={12} sm={12} md={6} lg={6} >
                                                <Input
                                                    // id={"phone"}
                                                    type={"text"}
                                                    // onChange={(e) =>
                                                    //     setData({ ...data, [e.target.id]: e.target.value })
                                                    // }
                                                    style={{ borderRadius: "86x" }}
                                                    placeholder={common_caption_strings.phone}
                                                    label="Phone"
                                                />
                                            </Grid>

                                            <Grid item xs={12} sm={12} md={6} lg={6} >
                                                <Stack position={"relative"}>
                                                    <Input
                                                        // id={"password"}
                                                        type={showPass ? "password" : "text"}
                                                        onChange={handlePasswordChange}
                                                        style={{ borderRadius: "6px" }}
                                                        placeholder={common_caption_strings.password}
                                                        label="Password"
                                                        value={password}
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
                                            </Grid>
                                            <Grid item xs={12} sm={12} md={6} lg={6} >
                                                <Stack position={"relative"}>
                                                    <Input
                                                        // id={"confirn_password"}
                                                        type={showPass ? "password" : "text"}
                                                        onChange={handleConfirmPasswordChange}
                                                        style={{ borderRadius: "6px" }}
                                                        placeholder={common_caption_strings.confirm_Password}
                                                        label="Confirm Password"
                                                        value={confirmPassword}
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
                                            </Grid>
                                            {/* <Grid item xs={12} sm={12} md={6} lg={6} >
                                                <Input
                                                    id={"services"}
                                                    type={"text"}
                                                    // onChange={(e) =>
                                                    //     setData({ ...data, [e.target.id]: e.target.value })
                                                    // }
                                                    style={{ borderRadius: "86x" }}
                                                    placeholder={"services"}
                                                    label={"services"}
                                                />
                                            </Grid>
                                            <Grid item xs={12} sm={12} md={6} lg={6} >
                                                <Input
                                                    id={"service_area"}
                                                    type={"text"}
                                                    // onChange={(e) =>
                                                    //     setData({ ...data, [e.target.id]: e.target.value })
                                                    // }
                                                    style={{ borderRadius: "86x" }}
                                                    placeholder={"Service Area"}
                                                    label={"Service Area"}
                                                />
                                            </Grid> */}

                                        </Grid>
                                    </Stack>
                                </Stack>
                                <Stack>
                                    <LoadingButton
                                        onClick={submitHandle}
                                        style={{ padding: "16px 8px", fontSize: "18px", borderRadius: "8px", backgroundColor: themeOrange }}
                                        loading={user_register_status === asyncStatus.LOADING ? true : false} variant="contained">
                                        {common_caption_strings.Signup}
                                    </LoadingButton>
                                </Stack>
                                <Stack mt={1} direction={"row"} justifyContent={"center"}>
                                    <Typography color={"#9F9F9F"}>{common_caption_strings.already_have_account}</Typography><Typography onClick={() => navigate("/login")} sx={{ color: themeOrange, mx: "2px", cursor: "pointer" }}>{common_caption_strings.Login}</Typography>
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
                                <Typography className="mainPara" color={themeOrange}>Sign In</Typography>
                            </Stack>
                        </Stack>
                    </Stack>

                </Grid>
            </Grid>
        </Stack>
    );

}
export default UserSignUp;