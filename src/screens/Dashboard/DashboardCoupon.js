import { CircularProgress, Container, Divider, Stack, Typography } from "@mui/material";
import React, { useEffect } from "react";
import CustomButton from "../../component/common/Button/Button";
import { themeOrange } from "../../utils/colorTheme";
import { useNavigate } from "react-router-dom";
import add from "../../assets/add.png";
import { CouponTable } from "../../component/common/customTable/CouponTable";
import { useDispatch, useSelector } from "react-redux";
import { getAllCouponsAsync } from "../../services/CouponService";
import { asyncStatus } from "../../utils/asyncStatus";

const DashboardCoupons = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  
  // Updated selectors to match the new slice structure
  const {
    get_all_coupons_status,
    get_all_coupons_data,
    get_all_coupons_error,
  } = useSelector((state) => state.coupons);

  console.log("coupons data", get_all_coupons_data ?? "");

  useEffect(() => {
    // Dispatch action to fetch coupons list
    dispatch(getAllCouponsAsync());
  }, [dispatch]);

  // Show loading spinner while data is being fetched
  if (get_all_coupons_status === asyncStatus.LOADING) {
    return (
      <Stack alignItems={"center"} justifyContent={"center"} height={"60vh"}>
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
        <Typography className="mainHeading">Coupons</Typography>
        <Stack
          className="globleGradientBlue"
          sx={{ borderRadius: "10px", overflow: "hidden", boxShadow: "none" }}
        >
          <CustomButton
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
            onClick={() => navigate("/coupons/add-coupon")}
          >
            <img
              src={add}
              style={{ height: "24px", width: "24px", color: "white" }}
              alt="Add"
            />
            <Typography className="subHeading" sx={{ color: "white" }}>
              Add Coupon
            </Typography>
          </CustomButton>
        </Stack>
      </Stack>
      <Divider />
      <Container
        sx={{ maxWidth: { xl: "xl", lg: "lg", md: "md", sm: "sm", xs: "xs" } }}
      >
        <Stack my={2}>
          <CouponTable />
        </Stack>
      </Container>
    </Stack>
  );
};

export default DashboardCoupons;