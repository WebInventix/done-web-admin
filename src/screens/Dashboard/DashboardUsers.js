import { CircularProgress, Container, Stack, Typography } from "@mui/material";
import React, { useEffect } from "react";
import add from "../../assets/add.png";
import CustomButton from "../../component/common/Button/Button";
import { UserTable } from "../../component/common/customTable/UserTable";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  get_users_list,
  get_users_list_by_role,
} from "../../services/DashboardUsers";
import { themeOrange } from "../../utils/colorTheme";
import { asyncStatus } from "../../utils/asyncStatus";

const DashboardUsers = () => {
  const dispatch = useDispatch();
  const {
    get_users_list_status,
    get_users_list_data,
    get_users_list_error,
    get_users_list_by_role_status,
    get_users_list_by_role_data,
    get_users_list_by_role_error,
  } = useSelector((state) => state.dashboard_users);

  const navigate = useNavigate();

  useEffect(() => {
    // dispatch(get_users_list())
    dispatch(get_users_list_by_role(3));
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
        <Typography className="mainHeading" sx={{ cursor: "pointer" }}>
          Users
        </Typography>
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
            onClick={() => navigate("/users/add-users")}
          >
            <img
              src={add}
              style={{ height: "24px", width: "24px", color: "white" }}
            />
            <Typography className="subHeading" sx={{ color: "white" }}>
              {" "}
              Add Users
            </Typography>
          </CustomButton>
        </Stack>
      </Stack>
      <hr color={"#D1D1D1"} />
      <Container
        sx={{ maxWidth: { xl: "xl", lg: "lg", md: "md", sm: "sm", xs: "xs" } }}
      >
        <Stack my={2}>
          <UserTable />
        </Stack>
      </Container>
    </Stack>
  );
};

export default DashboardUsers;
