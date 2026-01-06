import React, { useState } from "react";
import "./style.css";
import { Route, Routes } from "react-router-dom";
import { Stack } from "@mui/material";
import { RequestDetails } from "../../../pages/serviceRequest/RequestDetails";
import { sideBar } from "../../../utils/sideBar";
import DashboardHome from "../../../pages/providerDashboard/DashboardHome";

const Template_Side_Drawer = () => {
  // console.log(sideBar);
  return (
    <>
      <div
        style={{ backgroundColor: "white", color: "black" }}
        className="body"
      >
        <div
          style={{
            backgroundColor: "white",
            color: "black",
            marginTop: "50px",
          }}
        >
          <div
            style={{ backgroundColor: "white", color: "black" }}
            className="contrastbg"
          >
            <Routes>
              {React.Children.toArray(
                sideBar.map((e) => {
                  <Route path={"/"} element={<DashboardHome />} />;
                })
              )}
            </Routes>
            <Stack sx={{}}>
              <Routes>
                {React.Children.toArray(
                  sideBar.map((e) => {
                    return <Route path={e.linkTo} element={e.element} />;
                  })
                )}
              </Routes>
            </Stack>
          </div>
        </div>
      </div>
    </>
  );
};

export default Template_Side_Drawer;
