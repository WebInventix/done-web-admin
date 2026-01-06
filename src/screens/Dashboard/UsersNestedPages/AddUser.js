import {
  CircularProgress,
  Container,
  Grid,
  Stack,
  Typography,
} from "@mui/material";
import React, { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { themeOrange } from "../../../utils/colorTheme";
import Input from "../../../component/common/Input";
import CustomButton from "../../../component/common/Button/Button";
import { BsFillEyeFill, BsFillEyeSlashFill } from "react-icons/bs";
import { useDispatch, useSelector } from "react-redux";
import { asyncStatus } from "../../../utils/asyncStatus";
import { addUserAsync } from "../../../services/authentication";
import { setAddUserStatus } from "../../../store/slices/user_auth_slice";
import { validationsSchema } from "../../../utils/ValidationsSchema";
import { Form, Formik } from "formik";

const AddUsers = () => {
  const navigate = useNavigate();
  const [showPass, setShowPass] = useState({
    password: false,
    confirm_password: false,
  });
  const [data, setData] = useState({
    first_name: "",
    last_name: "",
    email: "",
    phone: "",
    password: "",
    confirm_password: "",
    user_role: 3,
  });
  const formikRef = useRef(null);

  const { add_user_status } = useSelector((state) => state.userAuth);
  const dispatch = useDispatch();
  const _showPasswordVisibility = (field) => {
    setShowPass({ ...showPass, [field]: !showPass[field] });
  };

  const addUserLoader = add_user_status === asyncStatus.LOADING;

  const _handleChange = (e, field) => {
    setData((prevData) => {
      if (Array.isArray(e)) {
        console.log("eeeeeee", e);
        // Ensure values are properly updated
        return { ...prevData, [field]: e };
      } else {
        console.log("eeeeeee>>>>>>>>>>", e);
        const { id, value } = e.target;
        return { ...prevData, [id]: value };
      }
    });
  };

  const usersFieldData = [
    {
      id: "first_name",
      type: "text",
      onchange: (e) => _handleChange(e, "first_name"),
      value: data.first_name,
      // defaultValue: "Jonas Khanwald",
      placeholder: "First Name",
      label: "First Name",
    },
    {
      id: "last_name",
      type: "text",
      onchange: (e) => _handleChange(e, "last_name"),
      value: data.last_name,
      // defaultValue: "Jonas Khanwald",
      placeholder: "Last Name",
      label: "Last Name",
    },
    {
      id: "email",
      type: "email",
      onchange: (e) => _handleChange(e, "email"),
      value: data.email,
      // defaultValue: "jonas_kahnwald@gmail.com",
      placeholder: "Email Id",
      label: "Email Id",
    },
    {
      id: "phone",
      type: "text",
      onchange: (e) => _handleChange(e, "phone"),
      value: data.phone,
      // defaultValue: "(123) 456-7890",
      placeholder: "Phone Number",
      label: "Phone Number",
    },
    {
      id: "password",
      type: showPass.password ? "text" : "password",
      onchange: (e) => _handleChange(e, "password"),
      value: data.password,
      // defaultValue: "john12345",
      placeholder: "Password",
      label: "Password",
    },
    {
      id: "confirm_password",
      type: showPass.confirm_password ? "text" : "password",
      onchange: (e) => _handleChange(e, "confirm_password"),
      value: data.confirm_password,
      // defaultValue: "john12345",
      placeholder: "Confirm Password",
      label: "Confirm Password",
    },
  ];

  const _handleSubmit = (values) => {
    const newObj = {
      first_name: values.first_name,
      last_name: values.last_name,
      email: values.email,
      phone: values.phone,
      password: values.password,
      user_role: 3,
    };
    console.log("services>>>>>>>>>>>>>", newObj);
    dispatch(addUserAsync(newObj));
  };

  useEffect(() => {
    if (add_user_status === asyncStatus.SUCCEEDED) {
      dispatch(setAddUserStatus());
      // Reset Formik form if ref is available
      if (formikRef.current) {
        formikRef.current.resetForm();
      }
      navigate("/users");
    }
  }, [add_user_status]);

  const initialValues = {
    first_name: "",
    last_name: "",
    email: "",
    phone: "",
    password: "",
    confirm_password: "",
    user_role: 3,
  };
  return (
    <Stack bgcolor={"#FAFAFA"}>
      <Stack sx={{ mx: "15px" }}>
        <Stack direction={"row"} alignItems={"center"} gap={1}>
          <Typography className="mainHeading" sx={{ cursor: "pointer" }}>
            Users
          </Typography>
        </Stack>
        <hr color={"#D1D1D1"} />
      </Stack>
      <Container
        sx={{
          maxWidth: { xl: "lg", lg: "md", md: "md", sm: "sm", xs: "xs" },
        }}
      >
        <Stack
          alignItems={"center"}
          justifyContent={"flex-start"}
          my={3}
          sx={{
            backgroundColor: "white",
            borderRadius: "10px",
            // overflow: "hidden",
          }}
        >
          <Stack
            alignItems={"center"}
            justifyContent={"center"}
            className="globleGradientBlue"
            sx={{
              width: "100%",
              mb: 10,
              borderTopLeftRadius: "10px",
              borderTopRightRadius: "10px",
            }}
          >
            <Stack
              direction={"row"}
              alignItems={"center"}
              justifyContent={"center"}
              flexWrap={"wrap"}
              py={2}
              px={2}
            >
              <Typography
                className="mainHeading"
                sx={{ fontWeight: "200 !important", color: "white" }}
              >
                Fill The Form To &nbsp;
              </Typography>
              <Typography
                className="mainHeading"
                sx={{ color: themeOrange, whiteSpace: "nowrap" }}
              >
                Add Users
              </Typography>
            </Stack>
          </Stack>

          <Formik
            initialValues={initialValues}
            validationSchema={validationsSchema("user_signup")}
            onSubmit={_handleSubmit}
            innerRef={formikRef}
          >
            {({ errors, touched, setFieldValue, values, handleSubmit }) => (
              <Form>
                <Stack alignItems={"center"} justifyContent={"center"} px={2}>
                  <Grid
                    alignItems={"center"}
                    justifyContent={"center"}
                    container
                    spacing={5}
                  >
                    {usersFieldData.map(
                      ({
                        id,
                        type,
                        onchange,
                        value,
                        label,
                        placeholder,
                        defaultValue,
                      }) => {
                        const isPasswordField =
                          id === "password" || id === "confirm_password";
                        return isPasswordField ? (
                          <Grid
                            item
                            key={id}
                            xl={5}
                            lg={5}
                            md={5}
                            sm={12}
                            xs={12}
                          >
                            <Stack position={"relative"}>
                              <Input
                                id={id}
                                type={type}
                                onChange={(e) =>
                                  setFieldValue(id, e.target.value)
                                }
                                style={{
                                  borderRadius: "6px",
                                  boxShadow:
                                    "0px 10.534px 31.601px 0px rgba(178, 178, 178, 0.20)",
                                }}
                                label={label}
                                defaultValue={defaultValue}
                                // value={value}
                                value={values[id]}
                              />

                              {isPasswordField && (
                                <span
                                  onClick={() => _showPasswordVisibility(id)}
                                  style={{
                                    position: "absolute",
                                    top: 20,
                                    right: 10,
                                    cursor: "pointer",
                                  }}
                                >
                                  {showPass[id] ? (
                                    <BsFillEyeFill size={18} />
                                  ) : (
                                    <BsFillEyeSlashFill size={18} />
                                  )}
                                </span>
                              )}
                            </Stack>
                            {errors[id] && touched[id] && (
                              <Typography color="error" variant="caption">
                                {errors[id]}
                              </Typography>
                            )}
                          </Grid>
                        ) : (
                          <Grid
                            item
                            key={id}
                            xl={5}
                            lg={5}
                            md={5}
                            sm={12}
                            xs={12}
                          >
                            <Input
                              id={id}
                              type={type}
                              onChange={(e) =>
                                setFieldValue(id, e.target.value)
                              }
                              style={{
                                borderRadius: "6px",
                                boxShadow:
                                  "0px 10.534px 31.601px 0px rgba(178, 178, 178, 0.20)",
                              }}
                              placeholder={placeholder}
                              label={label}
                              // value={value}
                              defaultValue={defaultValue}
                              value={values[id]}
                            />
                            {errors[id] && touched[id] && (
                              <Typography color="error" variant="caption">
                                {errors[id]}
                              </Typography>
                            )}
                          </Grid>
                        );
                      }
                    )}

                    <Grid item xl={10} lg={10} md={10} sm={10} xs={10} mb={2}>
                      <CustomButton
                        disable={addUserLoader}
                        onClick={handleSubmit}
                        style={{
                          width: "100%",
                          background:"var(--Orange, linear-gradient(180deg, #F15A24 0%, #C53F10 100%))"

                        }}
                      >
                        {addUserLoader ? (
                          <CircularProgress sx={{ color: "white" }} size={16} />
                        ) : (
                          <Typography
                            sx={{
                              fontSize: {
                                xl: "20px",
                                lg: "20px",
                                md: "18px",
                                sm: "18px",
                                xs: "17px",
                              },
                              fontWeight: "400",
                            }}
                          >
                            Add
                          </Typography>
                        )}
                      </CustomButton>
                    </Grid>
                  </Grid>
                </Stack>
              </Form>
            )}
          </Formik>
        </Stack>
      </Container>
    </Stack>
  );
};

export default AddUsers;
