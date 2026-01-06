import Slider from "react-slick";
import React from 'react'
import SliderCard from "../Card/SecondCard/SliderCard";
import './index.css'
import { FaChevronLeft } from "react-icons/fa";
import { FaChevronRight } from "react-icons/fa";
import { Stack } from "@mui/material";

const CustomNextArrow = (props) => (
    <FaChevronLeft className="handleBtn" onClick={props.onClick} size={25} />
);

const CustomPrevArrow = (props) => (
    <FaChevronRight className="handleBtn" onClick={props.onClick} size={25} />
);

const SliderData = () => {
    var settings = {
        dots: false,
        infinite: false,
        speed: 500,
        slidesToShow: 3,
        slidesToScroll: 4,
        initialSlide: 0,
        // nextArrow: <CustomNextArrow />,
        // prevArrow: <CustomPrevArrow />,
        responsive: [
            {
                breakpoint: 1024,
                settings: {
                    slidesToShow: 3,
                    slidesToScroll: 3,
                    infinite: true,
                    dots: true,

                }
            },
            {
                breakpoint: 600,
                settings: {
                    slidesToShow: 2,
                    slidesToScroll: 2,
                    initialSlide: 2
                }
            },
            {
                breakpoint: 480,
                settings: {
                    slidesToShow: 1,
                    slidesToScroll: 1
                }
            }
        ]
    };
    return (
        <Stack mb={20}>


            <Slider {...settings}>
                <div>
                    <SliderCard />
                </div>
                <div>
                    <SliderCard />
                </div>
                <div>
                    <SliderCard />
                </div>
                <div>
                    <SliderCard />
                </div>
                <div>
                    <SliderCard />
                </div>
                <div>
                    <SliderCard />
                </div>
            </Slider>
            <Stack flexDirection={"row"} px={15} mt={2} justifyContent={"flex-end"} gap={2}>
                <CustomNextArrow />
                <CustomPrevArrow />
            </Stack>
        </Stack>
    )
}

export default SliderData