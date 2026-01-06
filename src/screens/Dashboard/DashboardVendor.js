import { CircularProgress, Container, Divider, Stack, Typography } from "@mui/material";
import React, { useEffect } from "react";
import CustomButton from "../../component/common/Button/Button";
import { TbSquareRoundedPlus } from "react-icons/tb";
import { themeOrange } from "../../utils/colorTheme";
import { useNavigate } from "react-router-dom";
import add from "../../assets/add.png";
import { VendorTable } from "../../component/common/customTable/VendorTable";
import { useDispatch, useSelector } from "react-redux";
import { get_users_list_by_role } from "../../services/DashboardUsers";
import { asyncStatus } from "../../utils/asyncStatus";

const DashboardVendor = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const {
    get_users_list_by_role_status,
    get_users_list_by_role_data,
    get_users_list_by_role_error,
  } = useSelector((state) => state.dashboard_users);

  // console.log("dataaa", get_users_list_data ?? "");
  console.log("dataaa", get_users_list_by_role_data ?? "");

  useEffect(() => {
    // dispatch(get_users_list())
    dispatch(get_users_list_by_role(2));
  }, []);

  if (get_users_list_by_role_status === asyncStatus.LOADING) {
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
        <Typography className="mainHeading">Vendors</Typography>
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
          </CustomButton>
        </Stack>
      </Stack>
      <Divider />
      <Container
        sx={{ maxWidth: { xl: "xl", lg: "lg", md: "md", sm: "sm", xs: "xs" } }}
      >
        <Stack my={2}>
          <VendorTable />
        </Stack>
      </Container>
    </Stack>
  );
};

export default DashboardVendor;
