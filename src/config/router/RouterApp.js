import React, { useEffect } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
  Outlet,
} from "react-router-dom";
import { mainRoutes } from "../../utils/routeList";
import { PublicRoutes } from "./PublicRoutes/PublicRoutes";
import { PrivateRoutes } from "./PrivateRoutes/PrivateRoutes";
import { LinearProgress, Stack, Typography } from "@mui/material";
import { check_auth } from "../../services/authentication";
import { useDispatch, useSelector } from "react-redux";
import { asyncStatus, save_tokens_constant } from "../../utils/asyncStatus";
import { setAuthState } from "../../store/slices/user_auth_slice";

export const RouterApp = () => {
  const {
    login_status,
    login_error,
    userAuth,
    userData,
    check_auth_status,
    userRole,
  } = useSelector((state) => state.userAuth);

  const dispatch = useDispatch();

  useEffect(() => {
    if (check_auth_status === asyncStatus.IDLE) {
      const authTokens =
        localStorage.getItem(save_tokens_constant.AUTH) || null;
      if (!authTokens) {
        dispatch(setAuthState(false));
      } else {
        // const User_data = localStorage.getItem(save_id)
        // const abc = JSON.parse(authTokens)
        dispatch(check_auth({ token: authTokens }));
      }
    }
  }, []);

  if (
    check_auth_status === asyncStatus.IDLE ||
    check_auth_status === asyncStatus.LOADING
  ) {
    return (
      <Stack>
        <LinearProgress />
      </Stack>
    );
  }

  if (check_auth_status === asyncStatus.ERROR) {
    return (
      <Stack py={2}>
        <Typography align="center" color="red">
          Something went wrong!
        </Typography>
      </Stack>
    );
  }

  return (
    <Router>
      <Routes>
        <Route element={<PublicRoutes />}>
          {React.Children.toArray(
            mainRoutes.map((route, i) => {
              const { linkTo, element, authRequired, both } = route;
              return (
                !authRequired && (
                  <Route key={i} element={element} path={linkTo} />
                )
              );
            })
          )}
        </Route>
        <Route element={<PrivateRoutes />}>
          {React.Children.toArray(
            mainRoutes.map((route, i) => {
              const { linkTo, element, authRequired, both } = route;
              return (
                authRequired && (
                  <Route key={i} element={element} path={linkTo} />
                )
              );
            })
          )}
        </Route>
      </Routes>
    </Router>
  );
};
