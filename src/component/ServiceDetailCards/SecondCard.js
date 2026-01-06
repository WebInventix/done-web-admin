import { Divider, Stack } from '@mui/material'
import React, { useState } from 'react'
import './index.css'
import { IoIosCheckmarkCircle } from "react-icons/io";
import { themeOrange } from '../../utils/colorTheme';
import dotImage from '../../assets/dot.png'
import innerLogo from '../../assets/innerLogo.png'
import IconInput from '../IconInput/IconInput';
import { useDispatch, useSelector } from 'react-redux';
import { setStarted } from '../../store/slices/ui_control_slice';
import { FaLocationDot } from "react-icons/fa6";
import GooglePlacesAutocomplete from 'react-google-places-autocomplete';
import CustomLocationSearch from '../IconInput/customInput';


const SecondCard = () => {
    const dispatch = useDispatch();

    const { isStarted } = useSelector((state) => state.uiControle)
    // const [selectedLocation, setSelectedLocation] = useState(null);

    const handleStart = () => {
        dispatch(setStarted());
    };

    const SelectedLocationHanlde = (value) => {
        console.log("selectedLocation", value);

    }

    return (
        <div>
            <Stack className='top-border'></Stack>
            <Stack sx={{
                paddingX: 5,
                paddingTop: 3
            }}>

                <Stack flexDirection={'row'} alignItems={'center'} >
                    <Stack className='questions-about'>Questions about our rates?</Stack>
                    <Stack className='learn-more'>Learn more</Stack>
                </Stack>
                <Stack className='burners'>
                    <Stack flexDirection={'row'} gap={2} px={2} py={7} alignItems={"self-start"} >
                        <Stack >
                            <IoIosCheckmarkCircle color={themeOrange} size={20} />
                        </Stack>
                        <Stack flexDirection={'column'}>
                            <Stack flexDirection={'row'} alignItems={'center'} justifyContent={'space-between'}>
                                <Stack className='burners-text'>For the first 4 burners</Stack>
                                <Stack className='burners-price'>$230</Stack>
                            </Stack>
                            <Stack flexDirection={'row'} alignItems={'center'} justifyContent={'space-between'}>
                                <Stack className='burners-text'>For each additional burner</Stack>
                                <Stack ml={20} className='burners-price'>$30</Stack>
                            </Stack>
                        </Stack>
                    </Stack>
                </Stack>
                <Stack mb={!isStarted ? 0 : 3} className='discount-container'>
                    <Stack sx={{
                        paddingX: 2,
                        paddingTop: 5,

                    }} flexDirection={'row'} alignItems={'center'} gap={7} >
                        <Stack flexDirection={'row'} alignItems={'center'}>

                            {/* <Stack gap={5}> */}
                            <Stack style={{
                                flexDirection: 'row',
                                alignItems: 'center',
                                gap: 15
                            }}>
                                <Stack>
                                    <img style={{ width: "18px", height: "18px", objectFit: "cover" }} src={dotImage} />
                                </Stack>
                                <Stack>
                                    <img style={{ width: "85px", height: "40px", objectFit: "cover" }} src={innerLogo} />
                                </Stack>
                            </Stack>
                            {/* </Stack> */}
                            <Stack ml={4} className='additional-burner-one'>
                                For the first 4 burners
                            </Stack>
                        </Stack>
                        <Stack flexDirection={'row'} alignItems={'center'} gap={2} >
                            <Stack className='burner-discount'>$230</Stack>
                            <Stack className='burner-amount'>$205</Stack>
                        </Stack>
                    </Stack>
                    <Stack ml={6} mt={1} className='additional-burner'>
                        For each additional burner
                    </Stack>
                    <Divider style={{ borderColor: "white", marginTop: "20px" }} />
                    <Stack sx={{
                        paddingX: 2,
                        paddingTop: 5
                    }} flexDirection={'row'} alignItems={'center'} >
                        <Stack className='more-benefits'>
                            Only $10/month, members get $25 off every job, and more benefits!
                        </Stack>
                        <Stack className='Learn-More'>
                            Learn More
                        </Stack>
                    </Stack>


                </Stack>
                {!isStarted &&
                    <Stack
                        sx={{
                            paddingX: 2,
                            mt: 5
                        }}>
                        {/* AIzaSyAYtRCtsEfL1Qcc6BLmm3zu4zoj1RsNWXE */}
                        <Stack >
                            {/* <div>
                                <GooglePlacesAutocomplete
                                    apiKey="AIzaSyAYtRCtsEfL1Qcc6BLmm3zu4zoj1RsNWXE"
                                    selectProps={{
                                        selectedLocation,
                                        onChange: handleSelect,
                                    }}
                                />
                                {selectedLocation && (
                                    <div>
                                        <h2>Selected Location</h2>
                                        <p>{selectedLocation.label}</p>
                                    </div>
                                )}
                            </div> */}
                            <CustomLocationSearch setSelectedLocationProps={SelectedLocationHanlde} />
                            {/* <IconInput
                                label="Where do you need a Done?"
                                first_icon={<FaLocationDot size={32} color={themeOrange} />}
                                style={{ width: '100%', }} placeholder={'Enter Location'} />
                            <Stack className='different-address'>Enter a different address</Stack> */}
                        </Stack>
                        <Stack onClick={handleStart} mt={4} mb={10} className='get-start-btn'>
                            Get Started
                        </Stack>
                    </Stack>
                }
            </Stack>
            <Stack className='botto-border'>
                You won't be charged until the job is complete.
            </Stack>

        </div>
    )
}

export default SecondCard