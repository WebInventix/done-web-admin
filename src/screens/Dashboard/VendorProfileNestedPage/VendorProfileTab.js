import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { asyncStatus } from "../../../utils/asyncStatus";
import { Avatar, Box, CircularProgress, Container, createTheme, Divider, Grid, Stack, Typography } from "@mui/material";
import { getUserByIdAsync, updateVendorStatusAsync } from "../../../services/DashboardUsers";
import { themeOrange } from "../../../utils/colorTheme";
import ReactStars from "react-rating-stars-component";
import VendorServicesTable from "../../../component/common/customTable/VendorServicesTable";
import CustomSelectBox from "../../../component/common/selectComp/CustomSelectBox";
import ButtonComp from "../../../component/common/ButtonComp";

const VendorProfileTab = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const {
    get_user_by_id_status,
    get_user_by_id_data,
    update_vendor_status_status,
  } = useSelector((state) => state.dashboard_users);

  const isLoading = update_vendor_status_status === asyncStatus.LOADING;

  const [status, setStatus] = useState({});
  const ratingChanged = (newRating) => {
    console.log(newRating);
  };
  const theme1 = createTheme({
    palette: {
      primary: {
        main: "#F39473", // Color 1
      },
    },
  });

  useEffect(() => {
    dispatch(getUserByIdAsync(id));
  }, []);

  const statusArr = [
    {
      label: "Approved",
      value: 1,
    },
    {
      label: "Rejected",
      value: 2,
    },
    {
      label: "Pending",
      value: 0,
    },
  ];

  useEffect(() => {
    if (Object.keys(get_user_by_id_data || {})?.length > 0) {
      setStatus(
        statusArr.find(
          (option) => option.value === +get_user_by_id_data?.status
        ) || null
      );
    }
  }, [get_user_by_id_data]);

  const _handleStatusUpdate = () => {
    const finalObj = { user_id: id, status: status.value };
    dispatch(updateVendorStatusAsync(finalObj));
  };

  const formatTwoDigits = (num) => String(num).padStart(2, "0");

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
     
      <Divider />
      <Container maxWidth="lg">
        <Stack gap={3}>
          {/* <!--------- VENDORS PROFILE ---------!> */}
          <Stack
            bgcolor={"white"}
            mt={2}
            sx={{
              boxShadow: "0px 4px 10px 0px #00000026",
              borderRadius: "4px",
            }}
          >
            <Stack
              flexDirection={{
                xl: "row",
                lg: "row",
                md: "row",
                sm: "row",
                xs: "column",
              }}
              alignItems={"center"}
              gap={1.5}
              p={2}
            >
              <Avatar
                src={get_user_by_id_data?.avatar || ""}
                sx={{ width: "120px", height: "120px", borderRadius: "10px" }}
              />

              <Stack
                sx={{ width: "100%" }}
                direction={"row"}
                alignItems={"center"}
                justifyContent={"space-between"}
              >
                <Stack gap={2}>
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
                        textTransform: "capitalize",
                      }}
                    >
                      {get_user_by_id_data?.first_name || ""} &nbsp;
                    </Typography>
                    <Typography
                      className="mainHeading"
                      sx={{
                        color: themeOrange,
                        lineHeight: "28px",
                        textTransform: "capitalize",
                      }}
                    >
                      {get_user_by_id_data?.last_name || ""}
                    </Typography>
                  </Stack>

                  <Typography className="mainPara">
                    {get_user_by_id_data?.email || ""}
                  </Typography>
                  <Typography className="mainPara">
                    {get_user_by_id_data?.phone || ""}
                  </Typography>
                </Stack>
                <Stack gap={1} alignItems={"center"} justifyContent={"center"}>
                  <ReactStars
                    edit={false}
                    count={5}
                    value={get_user_by_id_data?.rating || 0}
                    onChange={ratingChanged}
                    size={24}
                    activeColor="#ffd700"
                  />
                  <Typography fontWeight={600} className="mainHeading">
                    {get_user_by_id_data?.rating} / 5
                  </Typography>
                  <Typography className="mainPara">Avg.rating</Typography>
                </Stack>
              </Stack>
            </Stack>
          </Stack>

          <Grid
            container
            spacing={2}
            rowSpacing={5}
            mb={2}
            sx={{ backgroundColor: "FAFAFA" }}
          >
            <Grid item xl={8} lg={8} md={8} sm={12} xs={12}>
              {/* <!--------- POPULAR SERVICES ---------!> */}{" "}
              {/* <Stack>
              <Typography className="mainHeading" fontWeight={700}>
                Popular Services
              </Typography>
              <Stack
                mt={2}
                sx={{
                  borderRadius: "4px",
                  boxShadow: "0px 4px 10px 0px #00000026",
                  backgroundColor: "white",
                  overflow: "auto",
                }}
              >
                <Stack sx={{ minWidth: "350px" }}>
                  <Stack
                    flexDirection={"row"}
                    gap={1}
                    p={2}
                    justifyContent={"space-between"}
                    alignItems={"center"}
                  >
                    <Stack width={"200px"}>
                      <Typography fontWeight={600} className="subpara">
                        Appliance Install
                      </Typography>
                    </Stack>
                    <Stack
                      width={"100%"}
                      gap={2}
                      p={4}
                      direction={"row"}
                      alignItems={"center"}
                    >
                      <Typography>20%</Typography>
                      <Stack width={"100%"}>
                        <ThemeProvider theme={theme1}>
                          <LinearProgress
                            style={{ backgroundColor: "#ffff" }}
                            variant="determinate"
                            sx={{ borderRadius: 10 }}
                            value={100}
                          />
                        </ThemeProvider>
                      </Stack>
                    </Stack>
                  </Stack>
                  <Stack
                    flexDirection={"row"}
                    gap={1}
                    p={2}
                    justifyContent={"space-between"}
                    alignItems={"center"}
                  >
                    <Stack width={"200px"}>
                      <Typography fontWeight={600} className="subpara">
                        Appliance Install
                      </Typography>
                    </Stack>
                    <Stack
                      width={"100%"}
                      gap={2}
                      p={4}
                      direction={"row"}
                      alignItems={"center"}
                    >
                      <Typography>20%</Typography>
                      <Stack width={"100%"}>
                        <ThemeProvider theme={theme2}>
                          <LinearProgress
                            style={{ backgroundColor: "#ffff" }}
                            variant="determinate"
                            sx={{ borderRadius: 10 }}
                            value={100}
                          />
                        </ThemeProvider>
                      </Stack>
                    </Stack>
                  </Stack>
                  <Stack
                    flexDirection={"row"}
                    gap={1}
                    p={2}
                    justifyContent={"space-between"}
                    alignItems={"center"}
                  >
                    <Stack width={"200px"}>
                      <Typography fontWeight={600} className="subpara">
                        Appliance Install
                      </Typography>
                    </Stack>
                    <Stack
                      width={"100%"}
                      gap={2}
                      p={4}
                      direction={"row"}
                      alignItems={"center"}
                    >
                      <Typography>20%</Typography>
                      <Stack width={"100%"}>
                        <ThemeProvider theme={theme3}>
                          <LinearProgress
                            style={{ backgroundColor: "#ffff" }}
                            variant="determinate"
                            sx={{ borderRadius: 10 }}
                            value={100}
                          />
                        </ThemeProvider>
                      </Stack>
                    </Stack>
                  </Stack>
                  <Stack
                    flexDirection={"row"}
                    gap={1}
                    p={2}
                    justifyContent={"space-between"}
                    alignItems={"center"}
                  >
                    <Stack width={"200px"}>
                      <Typography fontWeight={600} className="subpara">
                        Appliance Install
                      </Typography>
                    </Stack>
                    <Stack
                      width={"100%"}
                      gap={2}
                      p={4}
                      direction={"row"}
                      alignItems={"center"}
                    >
                      <Typography>20%</Typography>
                      <Stack width={"100%"}>
                        <ThemeProvider theme={theme4}>
                          <LinearProgress
                            style={{ backgroundColor: "#ffff" }}
                            variant="determinate"
                            sx={{ borderRadius: 10 }}
                            value={100}
                          />
                        </ThemeProvider>
                      </Stack>
                    </Stack>
                  </Stack>
                  <Stack
                    flexDirection={"row"}
                    gap={1}
                    p={2}
                    justifyContent={"space-between"}
                    alignItems={"center"}
                  >
                    <Stack width={"200px"}>
                      <Typography fontWeight={600} className="subpara">
                        Appliance Install
                      </Typography>
                    </Stack>
                    <Stack
                      width={"100%"}
                      gap={2}
                      p={4}
                      direction={"row"}
                      alignItems={"center"}
                    >
                      <Typography>20%</Typography>
                      <Stack width={"100%"}>
                        <ThemeProvider theme={theme5}>
                          <LinearProgress
                            style={{ backgroundColor: "#ffff" }}
                            variant="determinate"
                            sx={{ borderRadius: 10 }}
                            value={100}
                          />
                        </ThemeProvider>
                      </Stack>
                    </Stack>
                  </Stack>
                </Stack>
              </Stack>
            </Stack> */}
              {/* <!--------- LAST USER ACTIVITY ---------!> */}
              <Stack>
                <Typography className="mainHeading" fontWeight={700}>
                  Services
                </Typography>
                <Stack
                  bgcolor={"white"}
                  mt={2}
                  p={2}
                  mb={5}
                  sx={{
                    boxShadow: "0px 4px 10px 0px #00000026",
                    overflow: "auto",
                    borderRadius: "4px",
                  }}
                >
                  <VendorServicesTable
                    data={get_user_by_id_data?.services || []}
                  />
                  {/* <Stack
                  gap={2}
                  direction={"row"}
                  alignItems={""}
                  justifyContent={"space-between"}
                  sx={{ minWidth: "440px", maxHeight: "270px" }}
                >
                  <Stack gap={2}>
                    <Typography
                      fontWeight={600}
                      color={themeOrange}
                      className="subpara"
                    >
                      User’s Name
                    </Typography>
                    {[
                      { name: "johnnc001", img: "" },
                      { name: "kristin.watson02", img: "" },
                      { name: "jones.jacob23", img: "" },
                      { name: "johnnc001", img: "" },
                    ].map(({ name, img }) => {
                      return (
                        <Stack direction={"row"} alignItems={"center"}>
                          <Stack>
                            <img width={"36px"} src={profile} />
                          </Stack>
                          <Stack px={2}>
                            <Typography color={"#5A5A5A"} className="subPara">
                              {name}
                            </Typography>
                          </Stack>
                        </Stack>
                      );
                    })}
                  </Stack>
                  <Stack gap={2}>
                    <Typography
                      fontWeight={600}
                      color={themeOrange}
                      className="subpara"
                    >
                      Service
                    </Typography>
                    <Stack my={0.7}>
                      <Typography color={"#5A5A5A"} className="subPara">
                        Appliance Install
                      </Typography>
                    </Stack>
                    <Stack my={0.7}>
                      <Typography color={"#5A5A5A"} className="subPara">
                        Appliance Install
                      </Typography>
                    </Stack>
                    <Stack my={0.7}>
                      <Typography color={"#5A5A5A"} className="subPara">
                        Appliance Install
                      </Typography>
                    </Stack>
                    <Stack my={0.7}>
                      <Typography color={"#5A5A5A"} className="subPara">
                        Appliance Install
                      </Typography>
                    </Stack>
                  </Stack>
                  <Stack gap={2}>
                    <Typography
                      fontWeight={600}
                      color={themeOrange}
                      className="subpara"
                    >
                      Date
                    </Typography>
                    <Stack my={0.7}>
                      <Typography color={"#5A5A5A"} className="subPara">
                        April 25, 2024
                      </Typography>
                    </Stack>
                    <Stack my={0.7}>
                      <Typography color={"#5A5A5A"} className="subPara">
                        April 25, 2024
                      </Typography>
                    </Stack>
                    <Stack my={0.7}>
                      <Typography color={"#5A5A5A"} className="subPara">
                        April 25, 2024
                      </Typography>
                    </Stack>
                    <Stack my={0.7}>
                      <Typography color={"#5A5A5A"} className="subPara">
                        April 25, 2024
                      </Typography>
                    </Stack>
                  </Stack>
                </Stack> */}
                </Stack>
              </Stack>
            </Grid>
            <Grid item xl={4} lg={4} md={4} sm={12} xs={12}>
              {/* <!--------- REPORTS ---------!>  */}
              <Stack>
                <Typography className="mainHeading" fontWeight={700}>
                  Reports
                </Typography>
                <Stack
                  sx={{
                    overflow: "auto",
                    boxShadow: "0px 4px 10px 0px #00000026",
                    boxSizing: "border-box",
                    backgroundColor: "white",
                    borderRadius: "4px",
                  }}
                  mt={2}
                  mb={5}
                >
                  <Stack
                    p={2}
                    sx={
                      {
                        // minWidth: "340px",
                      }
                    }
                    alignItems={"center"}
                  >
                    {/* <Stack
                    alignItems={"center"}
                    justifyContent={"center"}
                    position={"relative"}
                    sx={{
                      height: "200px",
                      width: "200px",
                      position: "relative",
                    }}
                  >
                    <Box
                      sx={{
                        width: "150px",
                        height: "150px",
                        position: "relative",
                      }}
                    >
                      <Stack
                        alignItems={"center"}
                        justifyContent={"center"}
                        sx={{
                          position: "absolute",
                          transform: "translate(208%, 150%)",
                          top: "-38%",
                          left: "-123%",
                        }}
                      >
                        <Typography
                          sx={{
                            color: "#333333",
                            fontWeight: "700",
                            fontSize: "20px",
                          }}
                        >
                          1784
                        </Typography>
                        <Typography
                          sx={{
                            color: "grey",
                            fontWeight: "700",
                            fontSize: "20px",
                          }}
                        >
                          From 1942
                        </Typography>
                      </Stack>
                      <CircularProgressbar
                        value={percentage}
                        styles={buildStyles({
                          rotation: 0.25,
                          strokeLinecap: "round",
                          textSize: "16px",
                          pathTransitionDuration: 0.5,
                          pathColor: `#031444`,
                          textColor: "#f88",
                          trailColor: "#d6d6d6",
                          backgroundColor: "#3e98c7",
                        })}
                      />
                    </Box>

                    <Box
                      sx={{
                        height: "200px",
                        width: "200px",
                        position: "absolute",
                        top: "0.5%",
                        left: "0.8%",
                      }}
                    >
                      <CircularProgressbar
                        value={percentage}
                        styles={buildStyles({
                          rotation: 0.25,
                          strokeLinecap: "round",
                          textSize: "16px",
                          pathTransitionDuration: 0.5,
                          pathColor: `#F15A24`,
                          textColor: "#f88",
                          trailColor: "#d6d6d6",
                          backgroundColor: "#3e98c7",
                        })}
                        strokeWidth={9}
                      />
                    </Box>
                  </Stack> */}

                    <Stack gap={1} sx={{ width: "100%" }}>
                      <Stack sx={{ width: "100%" }}>
                        <Typography
                          sx={{ fontSize: "17px", fontWeight: "600" }}
                        >
                          Status
                        </Typography>

                        <Stack sx={{ width: "100%" }}>
                          <CustomSelectBox
                            options={statusArr}
                            isMulti={false}
                            // value={statusArr.find(
                            //   (option) => option.value === selectedRole
                            // )}
                            value={status}
                            onChange={(e) => setStatus(e)}
                            placeholder="Filter by Role"
                            customStyles={{
                              control: {
                                borderRadius: "3px",
                                height: "43px",
                                width: "100%",
                              },
                            }}
                          />
                        </Stack>
                      </Stack>
                      <Stack
                        alignItems={"center"}
                        justifyContent={"space-between"}
                        sx={{ width: "100%" }}
                      >
                        <ButtonComp
                          onClick={_handleStatusUpdate}
                          label={
                            isLoading ? (
                              <CircularProgress
                                size={22}
                                sx={{ color: "white" }}
                              />
                            ) : (
                              "Submit"
                            )
                          }
                          style={{
                            width: "100%",
                            borderRadius: "3px",
                            background:
                              "var(--Orange, linear-gradient(180deg, #F15A24 0%, #C53F10 100%))",
                          }}
                        />
                      </Stack>
                    </Stack>

                    <Box
                      sx={{
                        height: "1px",
                        backgroundColor: "#dbd8d8",
                        width: "100%",
                        marginTop: "15px",
                      }}
                    ></Box>

                    <Stack
                      alignItems={"flex-start"}
                      justifyContent={"space-between"}
                      sx={{
                        px: "20px",
                        // marginTop: "20px",
                        width: "100%",
                      }}
                    >
                      {[
                        {
                          count: formatTwoDigits(
                            get_user_by_id_data?.completed_projects
                          ),
                          status: "Completed Projects",
                          bgColor: "#031444",
                        },
                        {
                          count: formatTwoDigits(
                            get_user_by_id_data?.accepted_projects
                          ),
                          status: "Accepted Projects",
                          bgColor: "#697493",
                        },
                        {
                          count: formatTwoDigits(
                            get_user_by_id_data?.declined_projects
                          ),
                          status: "Declined Projects",
                          bgColor: "#CDD1DB",
                        },
                      ].map(({ count, status, bgColor }) => {
                        return (
                          <Stack
                            direction={"row"}
                            alignItems={"center"}
                            justifyContent={"center"}
                            gap={5}
                            mt={"38px"}
                          >
                            <Box
                              sx={{
                                height: "70px",
                                backgroundColor: bgColor,
                                width: "12px",
                                borderRadius: "10px",
                              }}
                            ></Box>
                            <Stack gap={1}>
                              <Typography className="subHeading">
                                {count}
                              </Typography>
                              <Typography className="subHeading">
                                {status}
                              </Typography>
                            </Stack>
                          </Stack>
                        );
                      })}
                    </Stack>
                  </Stack>
                </Stack>
              </Stack>{" "}
            </Grid>

            {/* <Grid item xl={6} lg={6} md={6} sm={12} xs={12}>
            <Stack>
              <Typography sx={{ fontSize: "17px" }}>First Name</Typography>
              <Input
                disabled={true}
                style={{
                  borderRadius: "6px",
                  boxShadow:
                    "0px 10.534px 31.601px 0px rgba(178, 178, 178, 0.20)",
                }}
                value={get_user_by_id_data?.first_name || ""}
                defaultValue={get_user_by_id_data?.first_name || ""}
              />
            </Stack>
          </Grid> */}
            {/* <Grid item xl={6} lg={6} md={6} sm={12} xs={12}>
            <Stack>
              <Typography sx={{ fontSize: "17px" }}>Last Name</Typography>
              <Input
                disabled={true}
                style={{
                  borderRadius: "6px",
                  boxShadow:
                    "0px 10.534px 31.601px 0px rgba(178, 178, 178, 0.20)",
                }}
                value={get_user_by_id_data?.last_name || ""}
              />
            </Stack>
          </Grid> */}
            {/* <Grid item xl={6} lg={6} md={6} sm={12} xs={12}>
            <Stack>
              <Typography sx={{ fontSize: "17px" }}>Email</Typography>
              <Input
                disabled={true}
                style={{
                  borderRadius: "6px",
                  boxShadow:
                    "0px 10.534px 31.601px 0px rgba(178, 178, 178, 0.20)",
                }}
                value={get_user_by_id_data?.email || ""}
              />
            </Stack>
          </Grid> */}
            {/* <Grid item xl={6} lg={6} md={6} sm={12} xs={12}>
            <Stack>
              <Typography sx={{ fontSize: "17px" }}>Phone Number</Typography>
              <Input
                disabled={true}
                style={{
                  borderRadius: "6px",
                  boxShadow:
                    "0px 10.534px 31.601px 0px rgba(178, 178, 178, 0.20)",
                }}
                value={get_user_by_id_data?.phone || ""}
                defaultValue={get_user_by_id_data?.phone || ""}
              />
            </Stack>
          </Grid> */}
          </Grid>
        </Stack>
      </Container>
    </Stack>
  );
};

export default VendorProfileTab;
