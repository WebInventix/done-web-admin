import {
  CircularProgress,
  Container,
  Grid,
  Stack,
  Typography
} from "@mui/material";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import profile from "../../assets/profile.png";
import users_img from "../../assets/user.png";
import vendor_img from "../../assets/vendor.png";
import DashboardNewUsersVendorsTable from "../../component/common/customTable/DashboardNewUsersVendorsTable";
import MonthlyJobsChart from "../../component/MonthlyJobsChart/MonthlyJobsChart";
import { getDashboardDataAsync } from "../../services/AdminServiceManage";
import { asyncStatus } from "../../utils/asyncStatus";
import { themeBlue, themeOrange } from "../../utils/colorTheme";

const DashboardHome = () => {
  const { get_dashboard_data_status, get_dashboard_data_data } = useSelector(
    (state) => state.admin_manage
  );

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getDashboardDataAsync());
  }, []);

  const percentage = 66;

  const usersVendorsList = [
    {
      key: "user",
      avatar_img: profile,
      name: "johnnc001",
      email: "jonnc001@gmail.com",
    },
    {
      key: "vendor",
      avatar_img: profile,
      name: "johnnc001",
      email: "jonnc001@gmail.com",
    },
    {
      key: "user",
      avatar_img: profile,
      name: "johnnc001",
      email: "jonnc001@gmail.com",
    },
    {
      key: "vendor",
      avatar_img: profile,
      name: "johnnc001",
      email: "jonnc001@gmail.com",
    },
    {
      key: "user",
      avatar_img: profile,
      name: "johnnc001",
      email: "jonnc001@gmail.com",
    },
    {
      key: "vendor",
      avatar_img: profile,
      name: "johnnc001",
      email: "jonnc001@gmail.com",
    },
  ];

  const newUsersList = get_dashboard_data_data?.data?.users
    ?.toSorted((a, b) => new Date(b.created_at) - new Date(a.created_at))
    .map((data) => ({
      key: data?.type,
      avatar_img: data?.avatar,
      name: `${data?.first_name} ${data?.last_name}`,
      email: data?.email,
      phone: data?.phone,
    }));

  console.log("newUsersList", get_dashboard_data_data?.data?.user || "");

  if (get_dashboard_data_status === asyncStatus.LOADING) {
    return (
      <Stack alignItems={"center"} justifyContent={"center"} height={"60vh"}>
        {" "}
        <CircularProgress size={"30px"} sx={{ color: themeOrange }} />
      </Stack>
    );
  }

  return (
    <Stack bgcolor={"#FAFAFA"}>
      <Stack gap={1} my={1}>
        <Typography className="mainHeading">Dashboard</Typography>
      </Stack>
      <hr color={"#D1D1D1"} />
      <Container
        sx={{ maxWidth: { xl: "xl", lg: "lg", md: "md", sm: "sm", xs: "xs" } }}
      >
        <Stack my={2}>
          <Grid container spacing={5}>
            {/* <!--------- TOTAL VENDORS ---------!> */}
            <Grid item xl={6} lg={6} md={12} sm={12} xs={12}>
              <Stack
                sx={{
                  boxShadow: "0px 4px 10px 0px #00000026",
                  borderRadius: "20px",
                  backgroundColor: "white",
                }}
                p={3}
              >
                <Grid
                  container
                  direction={{
                    xl: "row",
                    lg: "row",
                    md: "row",
                    sm: "row",
                    xs: "column-reverse",
                  }}
                  spacing={2}
                >
                  <Grid item xl={6} lg={6} md={6} sm={6} xs={12}>
                    <Stack gap={1}>
                      <Typography
                        className="mainHeading"
                        sx={{
                          color: themeBlue,
                          fontSize: {
                            xl: "60px !important",
                            lg: "58px !important",
                            md: "57px !important",
                            sm: "56px !important",
                            xs: "55px !important",
                          },
                        }}
                      >
                        {get_dashboard_data_data?.data?.host || "0"}
                      </Typography>
                      <Stack
                        direction={"row"}
                        alignItems={"flex-start"}
                        justifyContent={"flex-start"}
                      >
                        <Typography
                          className="mainHeading"
                          sx={{
                            fontWeight: "300 !important",
                            lineHeight: "28px",
                          }}
                        >
                          Total &nbsp;
                        </Typography>
                        <Typography
                          className="mainHeading"
                          sx={{ color: themeOrange, lineHeight: "28px" }}
                        >
                          Vendors
                        </Typography>
                      </Stack>
                    </Stack>
                  </Grid>
                  <Grid item xl={6} lg={6} md={6} sm={6} xs={12}>
                    <Stack alignItems={"center"} justifyContent={"center"}>
                      <Stack sx={{ width: "150px", height: "100%" }}>
                        <img
                          src={vendor_img}
                          style={{ objectFit: "contain" }}
                        />
                      </Stack>
                    </Stack>
                  </Grid>
                </Grid>
              </Stack>
            </Grid>
            {/* <!--------- TOTAL USERS ---------!> */}
            <Grid item xl={6} lg={6} md={12} sm={12} xs={12}>
              <Stack
                sx={{
                  boxShadow: "0px 4px 10px 0px #00000026",
                  borderRadius: "20px",
                  backgroundColor: "white",
                }}
                p={3}
              >
                <Grid
                  container
                  direction={{
                    xl: "row",
                    lg: "row",
                    md: "row",
                    sm: "row",
                    xs: "column-reverse",
                  }}
                  spacing={2}
                >
                  <Grid item xl={6} lg={6} md={6} sm={6} xs={12}>
                    <Stack gap={1}>
                      <Typography
                        className="mainHeading"
                        sx={{
                          color: themeBlue,
                          fontSize: {
                            xl: "60px !important",
                            lg: "58px !important",
                            md: "57px !important",
                            sm: "56px !important",
                            xs: "55px !important",
                          },
                        }}
                      >
                        {get_dashboard_data_data?.data?.user || "0"}
                      </Typography>
                      <Stack
                        direction={"row"}
                        alignItems={"flex-start"}
                        justifyContent={"flex-start"}
                      >
                        <Typography
                          className="mainHeading"
                          sx={{
                            fontWeight: "300 !important",
                            lineHeight: "28px",
                          }}
                        >
                          Total &nbsp;
                        </Typography>
                        <Typography
                          className="mainHeading"
                          sx={{ color: themeOrange, lineHeight: "28px" }}
                        >
                          Users
                        </Typography>
                      </Stack>
                    </Stack>
                  </Grid>
                  <Grid item xl={6} lg={6} md={6} sm={6} xs={12}>
                    <Stack alignItems={"center"} justifyContent={"center"}>
                      <Stack sx={{ width: "150px", height: "100%" }}>
                        <img src={users_img} style={{ objectFit: "contain" }} />
                      </Stack>
                    </Stack>
                  </Grid>
                </Grid>
              </Stack>
            </Grid>
            <Grid item xl={12} lg={12} md={12} sm={12} xs={12}>
              <Stack my={1}>
                <Typography className="mainHeading">
                  Monthly Jobs Overview
                </Typography>
              </Stack>

              <Stack
                sx={{
                  boxShadow: "0px 4px 10px 0px #00000026",
                  borderRadius: "20px",
                  backgroundColor: "white",
                }}
                p={3}
              >
                <MonthlyJobsChart
                  monthlyData={
                    get_dashboard_data_data?.data?.monthly_order_graph
                  }
                  themeBlue={themeBlue}
                  themeOrange={themeOrange}
                />
              </Stack>
            </Grid>
            {/* <!--------- PROFILE ANALYTICS ---------!> */}
            {/* <Grid item xl={6} lg={6} md={12} sm={12} xs={12}>
              <Stack my={1}>
                <Typography className="mainHeading">
                  Top Month Seller
                </Typography>
              </Stack>

              <Stack
                sx={{
                  boxShadow: "0px 4px 10px 0px #00000026",
                  borderRadius: "20px",
                  backgroundColor: "white",
                }}
                p={3}
              >
                <Stack
                  direction={{
                    xl: "row",
                    lg: "row",
                    md: "row",
                    sm: "column",
                    xs: "column",
                  }}
                  gap={2}
                  sx={{ borderBottom: "1px solid #dadada", pb: 2 }}
                >
                  <Stack alignItems={"center"}>
                    <img
                      style={{ width: "120px", borderRadius: "10px" }}
                      src={profile}
                    />
                  </Stack>

                  <Stack
                    flexDirection={"row"}
                    alignItems={"center"}
                    justifyContent={"space-between"}
                    sx={{
                      width: "100%",
                      overflow: "auto",
                    }}
                  >
                    <Stack gap={1}>
                      <Stack
                        direction={{
                          xl: "row",
                          lg: "column",
                          md: "column",
                          sm: "column",
                          xs: "column",
                        }}
                        alignItems={"flex-start"}
                        justifyContent={"center"}
                      >
                        <Typography
                          className="mainHeading"
                          sx={{
                            fontWeight: "300 !important",
                            lineHeight: "28px",
                          }}
                        >
                          Jonas &nbsp;
                        </Typography>
                        <Typography
                          className="mainHeading"
                          sx={{ color: themeOrange, lineHeight: "28px" }}
                        >
                          kahnwald
                        </Typography>
                      </Stack>

                      <Typography className="mainPara">
                        jonas_kahnwald@gmail.com
                      </Typography>
                      <Typography className="mainPara">
                        (123) 456-7890
                      </Typography>
                    </Stack>
                    <Stack
                      alignItems={"center"}
                      justifyContent={"center"}
                      sx={{
                        height: "100px",
                        width: "100px",
                        position: "relative",
                        // backgroundColor:"red",
                        minWidth: "100px",
                        minHeight: "100%",
                      }}
                    >
                      <CircularProgressbar
                        value={percentage}
                        styles={buildStyles({
                          rotation: 0.25,
                          strokeLinecap: "round",
                          textSize: "16px",
                          pathTransitionDuration: 0.5,
                          pathColor: themeOrange,
                          textColor: "black",
                          trailColor: "#d6d6d6",
                          backgroundColor: "#3e98c7",
                          strokeWidth: 30,
                          circleRatio: 0.1,
                        })}
                      />
                      <Typography
                        className="mainHeading"
                        sx={{
                          lineHeight: "28px",
                          position: "absolute",
                          top: "50%",
                          left: "50%",
                          transform: "translate(-50%, -50%)",
                        }}
                      >
                        {percentage}%
                      </Typography>
                    </Stack>
                  </Stack>
                </Stack>

                <Stack
                  direction={"row"}
                  alignItems={"center"}
                  justifyContent={"space-around"}
                >
                  <Stack
                    alignItems={"center"}
                    justifyContent={"center"}
                    gap={0.5}
                  >
                    <Typography className="mainHeading">$240k</Typography>

                    <Typography
                      className="mainPara"
                      sx={{
                        lineHeight: "28px",
                        color: themeOrange,
                      }}
                    >
                      From the running month
                    </Typography>
                  </Stack>

                  <Stack
                    gap={0.5}
                    alignItems={"center"}
                    justifyContent={"center"}
                  >
                    <ReactStars
                      count={5}
                      onChange={"ratingChanged"}
                      size={24}
                      activeColor="#ffd700"
                    />
                    <Typography fontWeight={600} className="mainHeading">
                      4.27 / 5
                    </Typography>
                    <Typography className="mainPara">Avg.rating</Typography>
                  </Stack>
                </Stack>
              </Stack>
            </Grid> */}

            {/* <!--------- NEW USERS AND VENDORS JOINED THIS WEEK ---------!> */}
            <Grid item xl={12} lg={12} md={12} sm={12} xs={12}>
              <Stack my={1}>
                <Typography className="mainHeading">
                  New User’s / Vendor’s Joined this Week
                </Typography>
              </Stack>

              <Stack sx={{ minWidth: "478px" }}>
                {get_dashboard_data_data?.data?.length === 0 ? (
                  <Stack
                    sx={{ height: "30vh" }}
                    alignItems={"center"}
                    justifyContent={"center"}
                  >
                    <Typography
                      className="mainPara"
                      sx={{
                        lineHeight: "28px",
                      }}
                    >
                      No users and vendors found
                    </Typography>
                  </Stack>
                ) : (
                  <DashboardNewUsersVendorsTable />
                )}
              </Stack>
            </Grid>
          </Grid>
        </Stack>
      </Container>
    </Stack>
  );
};

export default DashboardHome;
