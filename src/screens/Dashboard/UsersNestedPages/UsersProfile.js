import {
  Avatar,
  CircularProgress,
  Container,
  Grid,
  Stack,
  Typography,
} from "@mui/material";
import React, { useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import CustomButton from "../../../component/common/Button/Button";
import delete_icon from "../../../assets/delete.png";
import profile_img from "../../../assets/profile.png";
import { themeBlue, themeOrange } from "../../../utils/colorTheme";
import Input from "../../../component/common/Input";
import { useDispatch, useSelector } from "react-redux";
import { getUserByIdAsync } from "../../../services/DashboardUsers";
import { asyncStatus } from "../../../utils/asyncStatus";
import UserOrdersTable from "../../../component/common/customTable/UserOrdersTable";

const UsersProfile = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const {
    get_user_by_id_status,
    get_user_by_id_data,
    update_vendor_status_status,
  } = useSelector((state) => state.dashboard_users);

  const servicesListData = [
    {
      date: "29",
      month: "Mar",
      title: "BBQ Cleaning",
      full_date: "Tue, Feb 27, 2024 (Mor)",
      status: "Cancelled",
      price: "50",
    },
    {
      date: "28",
      month: "Mar",
      title: "BBQ Cleaning",
      full_date: "Tue, Feb 27, 2024 (Mor)",
      status: "Complete",
      price: "70",
    },
    {
      date: "27",
      month: "Mar",
      title: "BBQ Cleaning",
      full_date: "Tue, Feb 27, 2024 (Mor)",
      status: "Complete",
      price: "80",
    },
    {
      date: "26",
      month: "Mar",
      title: "BBQ Cleaning",
      full_date: "Tue, Feb 27, 2024 (Mor)",
      status: "In Process",
      price: "90",
    },
  ];

  useEffect(() => {
    dispatch(getUserByIdAsync(id));
  }, []);

  if (get_user_by_id_status === asyncStatus.LOADING) {
    return (
      <Stack alignItems={"center"} justifyContent={"center"} height={"60vh"}>
        {" "}
        <CircularProgress size={"30px"} sx={{ color: themeOrange }} />
      </Stack>
    );
  }

  return (
    <Stack bgcolor={"#FAFAFA"}>
      <Stack
        direction={"row"}
        alignItems={"center"}
        justifyContent={"space-between"}
        gap={1}
        my={1}
      >
        <Typography className="mainHeading" sx={{ cursor: "pointer" }}>
          User
        </Typography>
        <Stack
          className="globleGradientBlue"
          sx={{ borderRadius: "10px", overflow: "hidden", boxShadow: "none" }}
        >
          {/* <CustomButton
            style={{
              backgroundColor: "transparent",
              fontSize: "20px",
              fontWeight: "400",
              paddingTop: "10px",
              paddingBottom: "10px",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              gap: 10,
            }}
            onClick={() => navigate("/add-vendor")}
          >
            <img
              src={delete_icon}
              style={{ height: "24px", width: "24px", color: "white" }}
            />
            <Typography className="subHeading" sx={{ color: "white" }}>
              {" "}
              Delete
            </Typography>
          </CustomButton> */}
        </Stack>
      </Stack>
      <hr color={"#D1D1D1"} />
      <Container
        sx={{ maxWidth: { xl: "xl", lg: "lg", md: "md", sm: "sm", xs: "xs" } }}
      >
        <Stack alignItems={"center"} justifyContent={"center"} my={2}>
          <Grid container spacing={2}>
            {/* <!--------- USER PROFILE DETAIL ---------!> */}
            <Grid item xl={3} lg={3} md={4} sm={12} xs={12}>
              <Stack
                alignItems={"center"}
                justifyContent={"space-between"}
                sx={{
                  boxShadow: "1px 1px 8px 1px rgba(0, 0, 0, 0.15)",
                  borderRadius: "20px",
                  backgroundColor: "white",
                }}
                gap={4}
                py={4}
                px={1}
              >
                <Stack gap={2} alignItems={"center"} justifyContent={"center"}>
                  <Stack
                    alignItems={"center"}
                    justifyContent={"center"}
                    sx={{
                      height: "100px",
                      width: "100px",
                      borderRadius: "10px",
                      overflow: "hidden",
                    }}
                  >
                    {/* <img
                      src={get_user_by_id_data?.avatar || ""}
                      style={{
                        height: "100%",
                        width: "100%",
                        objectFit: "contain",
                      }}
                    /> */}

                    <Avatar
                      src={get_user_by_id_data?.avatar || ""}
                      sx={{
                        height: "100%",
                        width: "100%",
                        borderRadius: "10px",
                      }}
                    />
                  </Stack>

                  <Stack
                    direction={{
                      xl: "row",
                      lg: "column",
                      md: "column",
                      sm: "row",
                      xs: "row",
                    }}
                    alignItems={"center"}
                    justifyContent={"center"}
                  >
                    <Typography
                      className="mainHeading"
                      sx={{ fontWeight: "300 !important" }}
                    >
                      {get_user_by_id_data?.first_name || "-"} &nbsp;
                    </Typography>
                    <Typography
                      className="mainHeading"
                      sx={{ color: themeOrange }}
                    >
                      {get_user_by_id_data?.last_name || ""}
                    </Typography>
                  </Stack>
                </Stack>

                <Stack sx={{ width: "90%" }}>
                  <Input
                    disabled={true}
                    id={"Email Id"}
                    type={"email"}
                    onChange={() => {}}
                    style={{
                      borderRadius: "6px",
                      boxShadow:
                        "0px 10.534px 31.601px 0px rgba(178, 178, 178, 0.20)",
                    }}
                    // placeholder={""}
                    label={"Email Id"}
                    // value={value}
                    defaultValue={get_user_by_id_data?.email || ""}
                  />
                </Stack>

                <Stack sx={{ width: "90%" }}>
                  <Input
                    disabled={true}
                    id={"Phone Number"}
                    type={"number"}
                    onChange={() => {}}
                    style={{
                      borderRadius: "6px",
                      boxShadow:
                        "0px 10.534px 31.601px 0px rgba(178, 178, 178, 0.20)",
                    }}
                    // placeholder={""}
                    label={"Phone Number"}
                    // value={value}
                    defaultValue={get_user_by_id_data?.phone || ""}
                  />
                </Stack>
              </Stack>
            </Grid>
            <Grid item xl={9} lg={9} md={8} sm={12} xs={12}>
              <Stack gap={3}>
                {/* <!--------- ALL SERVICES RECORD CARDS ---------!> */}
                <Grid container spacing={3}>
                  <Grid item xl={4} lg={4} md={6} sm={12} xs={12}>
                    <Stack
                      justifyContent={"center"}
                      gap={3}
                      sx={{
                        boxShadow: "1px 1px 8px 1px rgba(0, 0, 0, 0.15)",
                        borderRadius: "20px",
                        backgroundColor: "white",
                      }}
                      px={2}
                      py={5}
                    >
                      <Typography
                        className="mainHeading"
                        sx={{ fontWeight: "700 !important" }}
                      >
                        {get_user_by_id_data?.data?.total_orders || 0}
                      </Typography>

                      <Stack
                        direction={"row"}
                        alignItems={"center"}
                        justifyContent={"flex-start"}
                      >
                        <Typography
                          className="mainHeading"
                          sx={{ fontWeight: "300 !important" }}
                        >
                          All &nbsp;
                        </Typography>
                        <Typography
                          className="mainHeading"
                          sx={{ color: themeOrange }}
                        >
                          Services
                        </Typography>
                      </Stack>
                    </Stack>
                  </Grid>
                  <Grid item xl={4} lg={4} md={6} sm={12} xs={12}>
                    <Stack
                      justifyContent={"center"}
                      gap={3}
                      sx={{
                        boxShadow: "1px 1px 8px 1px rgba(0, 0, 0, 0.15)",
                        borderRadius: "20px",
                        backgroundColor: "white",
                      }}
                      px={2}
                      py={5}
                    >
                      <Typography
                        className="mainHeading"
                        sx={{ fontWeight: "700 !important" }}
                      >
                        {get_user_by_id_data?.data?.completed || 0}
                      </Typography>

                      <Stack
                        direction={"row"}
                        alignItems={"center"}
                        justifyContent={"flex-start"}
                      >
                        <Typography
                          className="mainHeading"
                          sx={{ fontWeight: "300 !important" }}
                        >
                          Comp
                        </Typography>
                        <Typography
                          className="mainHeading"
                          sx={{ color: themeOrange }}
                        >
                          leted
                        </Typography>
                      </Stack>
                    </Stack>
                  </Grid>
                  <Grid item xl={4} lg={4} md={6} sm={12} xs={12}>
                    <Stack
                      justifyContent={"center"}
                      gap={3}
                      sx={{
                        boxShadow: "1px 1px 8px 1px rgba(0, 0, 0, 0.15)",
                        borderRadius: "20px",
                        backgroundColor: "white",
                      }}
                      px={2}
                      py={5}
                    >
                      <Typography
                        className="mainHeading"
                        sx={{ fontWeight: "700 !important" }}
                      >
                        {get_user_by_id_data?.data?.current || 0}
                      </Typography>

                      <Stack
                        direction={"row"}
                        alignItems={"center"}
                        justifyContent={"flex-start"}
                      >
                        <Typography
                          className="mainHeading"
                          sx={{
                            fontWeight: "300 !important",
                            fontFamily: `Raleway, sans-serif`,
                          }}
                        >
                          {/* Cancel &nbsp; */}
                          Current&nbsp;
                        </Typography>
                        <Typography
                          className="mainHeading"
                          sx={{
                            color: themeOrange,
                            fontFamily: `Raleway, sans-serif !important`,
                          }}
                        >
                          Jobs
                        </Typography>
                      </Stack>
                    </Stack>
                  </Grid>
                </Grid>

                <Stack
                  sx={{
                    overflow: "auto",
                    boxShadow: "1px 1px 8px 1px rgba(0, 0, 0, 0.15)",
                    borderRadius: "20px",
                    backgroundColor: "white",
                    minHeight: "auto",
                    // maxHeight: "400px",
                  }}
                >
                  <Stack
                    justifyContent={"center"}
                    sx={{
                      minWidth: "530px",
                    }}
                    px={2}
                  >
                    <Stack
                      alignItems={"flex-start"}
                      justifyContent={"center"}
                      py={2}
                      px={2}
                      sx={{ borderBottom: "1px solid #F1F1F1" }}
                      className="user_profile_services_wrapper"
                    >
                      <Typography className="mainHeading">Services</Typography>
                    </Stack>

                    {get_user_by_id_data?.data?.orders?.length > 0 ? (
                      <UserOrdersTable
                        data={get_user_by_id_data?.data?.orders}
                      />
                    ) : (
                      <Stack
                        sx={{ height: "28vh" }}
                        alignItems={"center"}
                        justifyContent={"center"}
                      >
                        <Typography
                          className="mainPara"
                          sx={{
                            fontWeight: "200 !important",
                            color: themeBlue,
                            p: 0,
                            lineHeight: "22px",
                          }}
                        >
                          No services found
                        </Typography>
                      </Stack>
                    )}
                  </Stack>
                </Stack>
              </Stack>
            </Grid>
          </Grid>
        </Stack>
      </Container>
    </Stack>
  );
};

export default UsersProfile;
