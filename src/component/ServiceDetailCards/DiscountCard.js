import { Stack } from '@mui/material'
import React from 'react'
import './index.css'
import logo from '../../assets/Layer_1 (1).png'
import { FaCheck } from "react-icons/fa6";
import { themeOrange } from '../../utils/colorTheme';

const DiscountCard = () => {
    return (
        <Stack className='discount-main' >
            <Stack justifyContent={'center'} alignItems={'center'} mt={5}>
                <img style={{ height: "120px", objectFit: 'cover' }} src={logo} />
                <Stack className='discount-border' mt={5}>
                    <Stack flexDirection={'row'} alignItems={'center'} gap={15}>
                        <Stack flexDirection={'column'} gap={1}>
                            <Stack className='perc-off'>Save $25</Stack>
                            <Stack className='perc-off-inner'>on every Done job</Stack>
                        </Stack>
                        <Stack className='perc-off-inner'>
                            just for $10/month
                        </Stack>
                    </Stack>
                </Stack>
                <Stack justifyContent={'start'} gap={2} mt={1} alignItems={'flex-start'} style={{width:"45%"}}>
                    <Stack sx={{
                        flexDirection: 'row',
                        alignItems: 'center'
                    }}>
                        <Stack mr={1}>
                            <FaCheck color={themeOrange} size={24} />
                        </Stack>
                        <Stack color={'white'} className='category-text'>Extended warranty</Stack>
                    </Stack>
                    <Stack sx={{
                        flexDirection: 'row',
                        alignItems: 'center'
                    }}>
                        <Stack mr={1}>
                            <FaCheck color={themeOrange} size={24} />
                        </Stack>
                        <Stack color={'white'} className='category-text'>Cancel membership anytime</Stack>
                    </Stack>
                </Stack>
            </Stack>
        </Stack>
    )
}

export default DiscountCard