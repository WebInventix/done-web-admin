import {
  CircularProgress,
  Container,
  Grid,
  Stack,
  Typography,
} from "@mui/material";
import React, { useEffect, useRef, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { themeOrange } from "../../../utils/colorTheme";
import Input from "../../../component/common/Input";
import CustomButton from "../../../component/common/Button/Button";
import { BsFillEyeFill, BsFillEyeSlashFill } from "react-icons/bs";
import { useDispatch, useSelector } from "react-redux";
import { asyncStatus } from "../../../utils/asyncStatus";
import { Form, Formik } from "formik";
import { validationsSchema, vendorValidationsSchema } from "../../../utils/ValidationsSchema";
import CustomSelectBox from "../../../component/common/selectComp/CustomSelectBox";
import { setAddVendorStatus } from "../../../store/slices/user_auth_slice";
import { getUserByIdAsync, updateUserByIdAsync } from "../../../services/DashboardUsers";
import { addVendorAsync, get_signup_services } from "../../../services/authentication";
import { setAsyncStatusIDLE } from "../../../store/slices/dashboard_users_slice";

const AddVendor = () => {
  const { id } = useParams();
  const isEditMode = Boolean(id);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const formikRef = useRef(null);
  const [showPass, setShowPass] = useState({ password: false, confirmPassword: false });
  const [initialValues, setInitialValues] = useState({
    first_name: "",
    last_name: "",
    email: "",
    password: "",
    confirmPassword: "",
    phone: "",
    services: [],
    cities: [],
  });

  const { add_vendor_status, get_services_for_signup_data } = useSelector(
    (state) => state.userAuth
  );
  const { get_user_by_id_data, update_user_status } = useSelector(
    (state) => state.dashboard_users || {}
  );

  const isLoading = add_vendor_status === asyncStatus.LOADING || update_user_status === asyncStatus.LOADING;

  useEffect(() => {
    dispatch(get_signup_services({ services: "yes", city: "yes" }));
    if (isEditMode) dispatch(getUserByIdAsync(id));
  }, [isEditMode, id]);

  useEffect(() => {
    if (isEditMode && get_user_by_id_data) {
      const vendorData = get_user_by_id_data;
      setInitialValues({
        first_name: vendorData?.first_name || "",
        last_name: vendorData?.last_name || "",
        email: vendorData?.email || "",
        phone: vendorData?.phone || "",
        password: "",
        confirmPassword: "",
        services: vendorData?.services?.map((s) => ({
          label: s.service?.name,
          value: s.service?.id,
        })) || [],
        cities: vendorData?.cities?.map((c) => ({
          label: c.city?.name,
          value: c.city?.id,
        })) || [],
      });
    }
  }, [get_user_by_id_data]);

  useEffect(() => {
    if (add_vendor_status === asyncStatus.SUCCEEDED) {
      dispatch(setAddVendorStatus());
      if (formikRef.current) formikRef.current.resetForm();
      navigate("/vendor");
    }
  }, [add_vendor_status]);

  useEffect(() => {
    if (update_user_status === asyncStatus.SUCCEEDED) {
      dispatch(setAsyncStatusIDLE())
      navigate("/vendor");
    }
  }, [update_user_status]);

  const _handleSubmit = (values) => {
    const payload = {
      first_name: values.first_name,
      last_name: values.last_name,
      email: values.email,
      phone: values.phone,
      services: values.services.map((data) => data.value),
      cities: values.cities.map((data) => data.value),
    };
    
    if (!isEditMode) {
      payload.password = values.password;
      dispatch(addVendorAsync(payload));
    } else {
      dispatch(updateUserByIdAsync({ id, data: payload }));
    }
  };

  const getValidationSchema = () => {
    return isEditMode 
      ? vendorValidationsSchema("vendorEdit")
      : vendorValidationsSchema("signup");
  };


  console.log(initialValues ,"initialValues")

  return (
    <Stack bgcolor={"#FAFAFA"}>
      {/* Header Section */}
      <Stack sx={{ mx: "15px" }}>
        <Stack direction={"row"} alignItems={"center"} gap={1}>
          <Typography className="mainHeading" sx={{ cursor: "pointer" }}>
            {isEditMode ? "Edit Vendor" : "Add Vendors"}
          </Typography>
        </Stack>
        <hr color={"#D1D1D1"} />
      </Stack>

      {/* Form Container */}
      <Container sx={{ maxWidth: { xl: "lg", lg: "md", md: "md", sm: "sm", xs: "xs" } }}>
        <Stack alignItems={"center"} justifyContent={"flex-start"} my={3} sx={{
          backgroundColor: "white",
          borderRadius: "10px",
        }}>
          {/* Form Header */}
          <Stack className="globleGradientBlue" alignItems={"center"}
            justifyContent={"center"} sx={{
            width: "100%",
            mb: 10,
            borderTopLeftRadius: "10px",
            borderTopRightRadius: "10px",
          }}>
            <Stack direction={"row"} alignItems={"center"} justifyContent={"center"} flexWrap={"wrap"} py={2} px={2}>
              <Typography className="mainHeading" sx={{ fontWeight: "200 !important", color: "white" }}>
                Fill The Form To &nbsp;
              </Typography>
              <Typography className="mainHeading" sx={{ color: themeOrange, whiteSpace: "nowrap" }}>
                {isEditMode ? "Edit Vendor" : "Add Vendor"}
              </Typography>
            </Stack>
          </Stack>

          {/* Formik Form */}
          <Formik
            initialValues={initialValues}
            validationSchema={getValidationSchema()}
            onSubmit={_handleSubmit}
            innerRef={formikRef}
            enableReinitialize={true}
          >
            {({ errors, touched, setFieldValue, values, handleSubmit }) => (
              <Form>
                <Stack alignItems={"center"} justifyContent={"center"} px={2}>
                  <Grid container spacing={5}>
                    {/* First Name */}
                    <Grid item xl={5} lg={5} md={5} sm={12} xs={12}>
                      <Input
                        id="first_name"
                        type="text"
                        onChange={(e) => setFieldValue("first_name", e.target.value)}
                        style={{
                          borderRadius: "6px",
                          boxShadow: "0px 10.534px 31.601px 0px rgba(178, 178, 178, 0.20)",
                        }}
                        placeholder="First Name"
                        label="First Name"
                        value={values.first_name}
                      />
                      {errors.first_name && touched.first_name && (
                        <Typography color="error" variant="caption">
                          {errors.first_name}
                        </Typography>
                      )}
                    </Grid>

                    {/* Last Name */}
                    <Grid item xl={5} lg={5} md={5} sm={12} xs={12}>
                      <Input
                        id="last_name"
                        type="text"
                        onChange={(e) => setFieldValue("last_name", e.target.value)}
                        style={{
                          borderRadius: "6px",
                          boxShadow: "0px 10.534px 31.601px 0px rgba(178, 178, 178, 0.20)",
                        }}
                        placeholder="Last Name"
                        label="Last Name"
                        value={values.last_name}
                      />
                      {errors.last_name && touched.last_name && (
                        <Typography color="error" variant="caption">
                          {errors.last_name}
                        </Typography>
                      )}
                    </Grid>

                    {/* Email - Editable in both modes */}
                    <Grid item xl={5} lg={5} md={5} sm={12} xs={12}>
                      <Input
                        id="email"
                        type="email"
                        onChange={(e) => setFieldValue("email", e.target.value)}
                        style={{
                          borderRadius: "6px",
                          boxShadow: "0px 10.534px 31.601px 0px rgba(178, 178, 178, 0.20)",
                        }}
                        placeholder="Email Id"
                        label="Email Id"
                        value={values.email}
                      />
                      {errors.email && touched.email && (
                        <Typography color="error" variant="caption">
                          {errors.email}
                        </Typography>
                      )}
                    </Grid>

                    {/* Phone */}
                    <Grid item xl={5} lg={5} md={5} sm={12} xs={12}>
                      <Input
                        id="phone"
                        type="text"
                        onChange={(e) => setFieldValue("phone", e.target.value)}
                        style={{
                          borderRadius: "6px",
                          boxShadow: "0px 10.534px 31.601px 0px rgba(178, 178, 178, 0.20)",
                        }}
                        placeholder="Phone Number"
                        label="Phone Number"
                        value={values.phone}
                      />
                      {errors.phone && touched.phone && (
                        <Typography color="error" variant="caption">
                          {errors.phone}
                        </Typography>
                      )}
                    </Grid>

                    {/* Password Fields - Only in Add mode */}
                    {!isEditMode && (
                      <>
                        <Grid item xl={5} lg={5} md={5} sm={12} xs={12}>
                          <PasswordInput 
                            id="password"
                            label="Password"
                            value={values.password}
                            onChange={(e) => setFieldValue("password", e.target.value)}
                            showPass={showPass}
                            setShowPass={setShowPass}
                            error={errors.password}
                            touched={touched.password}
                          />
                        </Grid>

                        <Grid item xl={5} lg={5} md={5} sm={12} xs={12}>
                          <PasswordInput 
                            id="confirmPassword"
                            label="Confirm Password"
                            value={values.confirmPassword}
                            onChange={(e) => setFieldValue("confirmPassword", e.target.value)}
                            showPass={showPass}
                            setShowPass={setShowPass}
                            error={errors.confirmPassword}
                            touched={touched.confirmPassword}
                          />
                        </Grid>
                      </>
                    )}

                    {/* Services */}
                    <Grid item xl={5} lg={5} md={5} sm={12} xs={12}>
                      <CustomSelectBox
                        options={
                          get_services_for_signup_data?.services?.map((data) => ({
                            value: data?.id,
                            label: data.name,
                          })) || []
                        }
                        isMulti={true}
                        value={values.services}
                        onChange={(e) => setFieldValue("services", e)}
                        placeholder="Services"
                        label="Services"
                        customStyles={{
                          control: {
                            borderRadius: "3px",
                            height: "auto",
                            minHeight: "56px",
                            width: "100%",
                          },
                        }}
                      />
                      {errors.services && touched.services && (
                        <Typography color="error" variant="caption">
                          {errors.services}
                        </Typography>
                      )}
                    </Grid>

                    {/* Cities */}
                    <Grid item xl={5} lg={5} md={5} sm={12} xs={12}>
                      <CustomSelectBox
                        options={
                          get_services_for_signup_data?.cities?.map((data) => ({
                            value: data?.id,
                            label: data.name,
                          })) || []
                        }
                        isMulti={true}
                        value={values.cities}
                        onChange={(e) => setFieldValue("cities", e)}
                        placeholder="Service Area (City / State / Town)"
                        label="Service Area (City / State / Town)"
                        customStyles={{
                          control: {
                            borderRadius: "3px",
                            height: "auto",
                            minHeight: "56px",
                            width: "100%",
                          },
                        }}
                      />
                      {errors.cities && touched.cities && (
                        <Typography color="error" variant="caption">
                          {errors.cities}
                        </Typography>
                      )}
                    </Grid>

                    {/* Submit Button */}
                    <Grid item xl={10} lg={10} md={10} sm={10} xs={10} mb={2}>
                      <CustomButton
                        disable={isLoading}
                        onClick={handleSubmit}
                        style={{
                          width: "100%",
                          background: "var(--Orange, linear-gradient(180deg, #F15A24 0%, #C53F10 100%))",
                        }}
                      >
                        {isLoading ? (
                          <CircularProgress sx={{ color: "white" }} size={16} />
                        ) : (
                          <Typography sx={{
                            fontSize: {
                              xl: "20px",
                              lg: "20px",
                              md: "18px",
                              sm: "18px",
                              xs: "17px",
                            },
                            fontWeight: "400",
                          }}>
                            {isEditMode ? "Update" : "Add"}
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

// Reusable Password Input Component
const PasswordInput = ({ id, label, value, onChange, showPass, setShowPass, error, touched }) => {
  return (
    <Stack position={"relative"}>
      <Input
        id={id}
        type={showPass[id] ? "text" : "password"}
        onChange={onChange}
        style={{
          borderRadius: "6px",
          boxShadow: "0px 10.534px 31.601px 0px rgba(178, 178, 178, 0.20)",
        }}
        placeholder={label}
        label={label}
        value={value}
      />
      <span
        onClick={() => setShowPass({ ...showPass, [id]: !showPass[id] })}
        style={{
          position: "absolute",
          top: 20,
          right: 10,
          cursor: "pointer",
        }}
      >
        {showPass[id] ? <BsFillEyeFill size={18} /> : <BsFillEyeSlashFill size={18} />}
      </span>
      {error && touched && (
        <Typography color="error" variant="caption">
          {error}
        </Typography>
      )}
    </Stack>
  );
};

export default AddVendor;