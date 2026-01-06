import {
  Avatar,
  Box,
  CircularProgress,
  Container,
  Divider,
  Grid,
  LinearProgress,
  Stack,
  ThemeProvider,
  Typography,
  createTheme,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import { themeGray, themeOrange } from "../../../utils/colorTheme";
import CustomTabs from "../../../component/CustomTabs/CustomTabs";
import VendorProfileTab from "../VendorProfileNestedPage/VendorProfileTab";
import VendorAccountTab from "../VendorProfileNestedPage/VendorAccountTab";

const VendorProfile = () => {
  const tabs = [
    { label: "Profile", content: <VendorProfileTab /> },
    { label: "Account", content: <VendorAccountTab /> },
    // { label: "Payments", content: <VendorPaymentsTab /> },
  ];

  return (
    <Stack bgcolor={themeGray}>
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
      <Container
        sx={{ maxWidth: { xl: "xl", lg: "lg", md: "md", sm: "sm", xs: "xs" } }}
      >
        <CustomTabs tabs={tabs} />
      </Container>
    </Stack>
  );
};

export default VendorProfile;
