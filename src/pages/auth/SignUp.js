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
import { get_signup_services, signup_service_auth, signup_vendor_auth } from "../../services/authentication";
import { toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import { asyncStatus } from "../../utils/asyncStatus";
import { setIdleRegisterStatus } from "../../store/slices/user_auth_slice";
import { LoadingButton } from "@mui/lab";
import { error_toast_message } from "../../utils/toast_message";
import SelectComp from "../../component/common/selectComp/SelectComp";
import MultiSelectComp from "../../component/common/selectComp/MultiSelectComp";


const SignUp = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch()
    const { user_register_status, get_services_for_signup_data, get_services_for_signup_status, vendor_register_status, user } = useSelector((state) => state.userAuth);


    const [data, setData] = useState({});
    const [showPass, setShowPass] = useState(true);
    const [showPass2, setShowPass2] = useState(true);
    const [password, setPassword] = useState();
    const [confirmPassword, setConfirmPassword] = useState('');
    const [errorMessage, setErrorMessage] = useState('');

    const handlePasswordChange = (event) => {
        setPassword(event.target.value);
    };

    const handleConfirmPasswordChange = (event) => {
        setConfirmPassword(event.target.value);
    };




    useEffect(() => {
        if (user_register_status === asyncStatus.SUCCEEDED) {
            navigate("/")
            dispatch(setIdleRegisterStatus(setIdleRegisterStatus))

        }
    }, [user_register_status])

    // console.log(get_services_for_signup_data?.cities,get_services_for_signup_status)

    //Select handling


    const [serviceName, setServiceName] = React.useState([]);
    const [serviceNameIndex, setServiceNameIndex] = React.useState([]);
    const [serviceAreaName, setServiceAreaName] = React.useState([]);
    const [serviceAreaNameIndex, setServiceAreaNameIndex] = React.useState([]);

    const handleChangeService = (event) => {
        const {
            target: { value },
        } = event;
        setServiceName(
            // On autofill we get a stringified value.
            typeof value === 'string' ? value.split(',') : value,
        );
        const selectedIndex = value.map((selectedValue) => {
            const selectedIndex = get_services_for_signup_data?.services.find((option) => option.name === selectedValue);
            // console.log("option",option);
            return selectedIndex?.id;
            // console.log(selectedIndex);
        });

        setServiceNameIndex(selectedIndex)

    };

    const handleChangeServiceArea = (event) => {
        const {
            target: { value },
        } = event;
        // console.log(event)
        setServiceAreaName(
            // On autofill we get a stringified value.
            typeof value === 'string' ? value.split(',') : value,
        );
        const selectedOptions = value.map((selectedValue) => {
            const selectedIndex = get_services_for_signup_data?.cities.find((option) => option.name === selectedValue);
            return selectedIndex?.id;
            // console.log(selectedIndex);
        });

        setServiceAreaNameIndex(selectedOptions);
        // console.log(event)
    };

    useEffect(() => {

        dispatch(get_signup_services({ services: "yes", city: "yes" }))

    }, [])

    // console.log(serviceName, serviceAreaName, serviceAreaNameIndex ,serviceNameIndex)
    // console.log(data, password, serviceAreaNameIndex, serviceNameIndex)




    //Select handling



    const submitHandle = () => {

        if (password !== confirmPassword) {
            error_toast_message("Passwords do not match")
        } else if (password.length < 7) {
            error_toast_message("The password must be at least 7 characters")
        } else {
            let abc = [1, 2]
            let xyz = [1, 2]
            let obj = {
                ...data,
                password: password,
                // services:serviceNameIndex,
                // cities:serviceAreaNameIndex
                services: JSON.stringify(serviceNameIndex),
                cities: JSON.stringify(serviceAreaNameIndex),
                // user_role: 2
            }
            dispatch(signup_vendor_auth(obj))
            console.log(obj);
        }

    }

    // console.log(vendor_register_status, user)
    useEffect(() => {

        if(vendor_register_status === asyncStatus.SUCCEEDED){
            navigate('/')
        }
      
    }, [vendor_register_status])
    



    return (
        <Stack>
            <Grid container >
                {/* <Grid item xs={12} sm={12} md={12} lg={12} >
                    <Stack sx={{
                        paddingLeft: 7,
                        paddingRight: 7,
                        position: 'absolute',
                        top: 15,
                        width: '100%'
                    }}>
                        <div style={{
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'space-between',
                        }}>
                            <div>
                                <img src={Logo} style={{ objectFit: "cover", width: "134px" }} />
                            </div>
                            <div className="LoginProButton">
                                <div className="LoginProText">
                                    Login Pro
                                </div>
                            </div>
                        </div>
                    </Stack>
                </Grid> */}
                <Grid item xs={12} sm={12} md={6} lg={6} >
                    <Container maxWidth={"xl"}>
                        <Stack mt={{ xl: 8, lg: 8, md: 8, sm: 5, xs: 5 }}>
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
                                                Create a free account with Done. Have an account?<span onClick={() => navigate("/login")} style={{ color: themeBlue, fontWeight: "bold", cursor: "pointer" }}>Log In</span>
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
                                                    style={{ borderRadius: "6px", outlined: "none", border: "none" }}
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
                                                    id={"phone"}
                                                    type={"number"}
                                                    onChange={(e) =>
                                                        setData({ ...data, [e.target.id]: e.target.value })
                                                    }
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
                                                        type={showPass2 ? "password" : "text"}
                                                        onChange={handleConfirmPasswordChange}
                                                        style={{ borderRadius: "6px" }}
                                                        placeholder={common_caption_strings.confirm_Password}
                                                        label="Confirm Password"
                                                        value={confirmPassword}
                                                    />

                                                    {showPass2 ? (
                                                        <BsFillEyeFill
                                                            onClick={() => setShowPass2(false)}
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
                                                            onClick={() => setShowPass2(true)}
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
                                                {/* <Input
                                                    id={"services"}
                                                    type={"text"}
                                                    // onChange={(e) =>
                                                    //     setData({ ...data, [e.target.id]: e.target.value })
                                                    // }
                                                    style={{ borderRadius: "86x" }}
                                                    placeholder={"services"}
                                                    label={"services"}
                                                /> */}
                                                {/* <SelectComp placeholder={"Select Services"}/> */}
                                                <MultiSelectComp propValue={serviceName} onChange={handleChangeService} optionArray={get_services_for_signup_data?.services} placeholder={"Services"} />
                                            </Grid>
                                            <Grid item xs={12} sm={12} md={6} lg={6} >
                                                {/* <Input
                                                    id={"service_area"}
                                                    type={"text"}
                                                    // onChange={(e) =>
                                                    //     setData({ ...data, [e.target.id]: e.target.value })
                                                    // }
                                                    style={{ borderRadius: "86x" }}
                                                    placeholder={"Service Area"}
                                                    label={"Service Area"}
                                                /> */}
                                                <MultiSelectComp propValue={serviceAreaName} onChange={handleChangeServiceArea} optionArray={get_services_for_signup_data?.cities} placeholder={"Service Area"} />
                                            </Grid>

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
export default SignUp;