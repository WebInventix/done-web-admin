import { Container, Grid, Stack, Typography } from '@mui/material'
import React from 'react'
import { themeText } from '../../../../utils/colorTheme';
import './index.css'


export const ServicesCard = (props) => {

    const { src, heading, onClick, sub_heading } = props

    return (
        <Stack
            onClick={onClick}
            mb={1} p={2} alignItems={"center"} justifyContent={"center"}
            className='card-container'>
            <Stack alignItems={"center"} justifyContent={"center"}>
                <img
                    className='img-size'
                    src={src} />
            </Stack>
            <Stack mt={1} gap={1} justifyContent={"center"} alignItems={"center"} color={themeText}>
                <p className='card-heading-service'>{heading}</p>
                <p className='service-sub-heading'>
                    {sub_heading}
                </p>
            </Stack>
        </Stack>
    )
}