import { AppBar, Container, IconButton, Stack } from "@mui/material";
import React from "react";
import { Route, Routes } from "react-router-dom";
import { UserTopAppBar } from "./UserTopBar";
import { userDashboardRoutes } from "../../utils/sideRoute";

export const UserContentView = (props) => {
  const { active, onClickHanlde } = props;

  const userRole = 1;

  return (
    <Stack className="content-view" bgcolor={"#FAFAFA"} flex={1}>
      <Stack>
        <UserTopAppBar onClickHanlde={onClickHanlde} />
        <Container maxWidth={false}>
          <Stack sx={{ paddingTop: "30px" }}>
            <Routes>
              {React.Children.toArray(
                userDashboardRoutes.map((e) => {
                  return <Route path={e.linkTo} element={e.element} />;
                })
              )}
            </Routes>
          </Stack>
        </Container>
      </Stack>
    </Stack>
  );
};
