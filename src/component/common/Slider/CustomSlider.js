import Slider from "react-slick";
import React from "react";
import "./index.css";
import { Stack } from "@mui/material";

const CustomSlider = ({ children, settings }) => {
  return (
    <Stack>
      <Slider {...settings}>{children}</Slider>
    </Stack>
  );
};

export default CustomSlider;
