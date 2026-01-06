import React, { useEffect } from "react";
import { UserJobsTable } from "../../component/common/customTable/UserJobsTable";
import {
  CircularProgress,
  Container,
  Divider,
  Stack,
  Typography,
} from "@mui/material";
import CustomButton from "../../component/common/Button/Button";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getAllUsersJobsAsync } from "../../services/UserJobsServices";
import { asyncStatus } from "../../utils/asyncStatus";
import { themeOrange } from "../../utils/colorTheme";

const DashboardUserJobs = () => {
  const { get_all_user_jobs_status, get_all_user_jobs_data } = useSelector(
    (state) => state.userJobsSlice
  );
  const navigate = useNavigate();
  const dispatch = useDispatch();

  console.log("get_all_user_jobs_status", get_all_user_jobs_data);

  useEffect(() => {
    dispatch(getAllUsersJobsAsync());
  }, []);

  if (get_all_user_jobs_status === asyncStatus.LOADING) {
    return (
      <Stack
        alignItems={"center"}
        justifyContent={"center"}
        sx={{ height: "50vh" }}
      >
        <CircularProgress size={30} sx={{ color: themeOrange }} />
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
        <Typography className="mainHeading">Orders</Typography>
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
            onClick={() => navigate("/vendor/add-vendor")}
          >
            <img
              src={add}
              style={{ height: "24px", width: "24px", color: "white" }}
            />
            <Typography className="subHeading" sx={{ color: "white" }}>
              {" "}
              Add Vendors
            </Typography>
          </CustomButton> */}
        </Stack>
      </Stack>
      <Divider />
      <Container
        sx={{ maxWidth: { xl: "xl", lg: "lg", md: "md", sm: "sm", xs: "xs" } }}
      >
        {get_all_user_jobs_data?.length > 0 ? (
          <Stack my={2}>
            <UserJobsTable />
          </Stack>
        ) : (
          <Stack
            alignItems={"center"}
            justifyContent={"center"}
            sx={{ height: "50vh" }}
          >
            <Typography>No orders found</Typography>
          </Stack>
        )}
      </Container>
    </Stack>
  );
};

export default DashboardUserJobs;
