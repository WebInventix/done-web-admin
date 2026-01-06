import React, { useRef, useState } from "react";
import {
  Container,
  Grid,
  LinearProgress,
  Stack,
  Typography,
  createTheme,
  Box,
  ThemeProvider,
  Divider,
  Button,
} from "@mui/material";
// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react";

// Import Swiper styles
import "swiper/css";
import "swiper/css/pagination";

import "./Slider.css";

// import required modules
import { Pagination, Autoplay } from "swiper/modules";

const CustomSlider = () => {
  return (
    <Swiper
      autoplay={{
        delay: 2500,
        disableOnInteraction: false,
      }}
      speed={600}
      pagination={{
        clickable: true,
      }}
    //   navigation={true}
      modules={[Autoplay, Pagination]}
      className="mySwiper"
    >
      <SwiperSlide>
        <Stack
          justifyContent={"center"}
          alignItems={"flex-start"}
          className="slider_img_wrapper"
        >
          <Box className="slider_img_box"></Box>
          <Box className="slider_content_box">
            <Typography
              sx={{ fontSize: "25px", fontWeight: "200", color: "white" }}
            >
              Ready to Book Your
            </Typography>
            <Typography
              sx={{ fontSize: "25px", fontWeight: "700", color: "#F15A24" }}
            >
              Home Inspection
            </Typography>
            <Button
              variant="contained"
              sx={{
                backgroundColor: "#F15A24",
                ":hover": {
                  backgroundColor: "#F15A24",
                },
                px: 7,
                py: 1.5,
              }}
            >
              BOOK NOW
            </Button>
          </Box>
        </Stack>
      </SwiperSlide>
      <SwiperSlide>
        <Stack
          justifyContent={"center"}
          alignItems={"flex-start"}
          className="slider_img_wrapper"
        >
          <Box className="slider_img_box"></Box>
          <Box className="slider_content_box">
            <Typography
              sx={{ fontSize: "25px", fontWeight: "200", color: "white" }}
            >
              Ready to Book Your
            </Typography>
            <Typography
              sx={{ fontSize: "25px", fontWeight: "700", color: "#F15A24" }}
            >
              Home Inspection
            </Typography>
            <Button
              variant="contained"
              sx={{
                backgroundColor: "#F15A24",
                ":hover": {
                  backgroundColor: "#F15A24",
                },
                px: 7,
                py: 1.5,
              }}
            >
              BOOK NOW
            </Button>
          </Box>
        </Stack>
      </SwiperSlide>
      <SwiperSlide>
        <Stack
          justifyContent={"center"}
          alignItems={"flex-start"}
          className="slider_img_wrapper"
        >
          <Box className="slider_img_box"></Box>
          <Box className="slider_content_box">
            <Typography
              sx={{ fontSize: "25px", fontWeight: "200", color: "white" }}
            >
              Ready to Book Your
            </Typography>
            <Typography
              sx={{ fontSize: "25px", fontWeight: "700", color: "#F15A24" }}
            >
              Home Inspection
            </Typography>
            <Button
              variant="contained"
              sx={{
                backgroundColor: "#F15A24",
                ":hover": {
                  backgroundColor: "#F15A24",
                },
                px: 7,
                py: 1.5,
              }}
            >
              BOOK NOW
            </Button>
          </Box>
        </Stack>
      </SwiperSlide>
    </Swiper>
  );
};

export default CustomSlider;
