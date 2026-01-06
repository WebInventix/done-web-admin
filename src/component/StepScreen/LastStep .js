import React from 'react'
import { themeOrange } from '../../utils/colorTheme'
import Stepper from 'react-stepper-js'
import 'react-stepper-js/dist/index.css'
import { Divider, Stack } from '@mui/material'
import './index.css'
import { useDispatch } from 'react-redux'
import serName from '../../assets/serviceName.png'
import check from '../../assets/check.png'
import { FaCalendarDays } from "react-icons/fa6";
import { FaLocationDot } from "react-icons/fa6";
import { IoDocumentTextSharp } from "react-icons/io5";
import { MdLock } from "react-icons/md";
import CreditCardForm from '../CreditCard/CardInput'
import { LuCreditCard } from "react-icons/lu";
import { useNavigate } from 'react-router-dom'

const LastStep = () => {
    const dispatch = useDispatch();
    const navigation = useNavigate();


    const submitHandle = () => {
        navigation("/")
        window.location.reload()

    }

    return (
        <div>
            <Stack style={{

            }}>
                <Stack className="service-name">BBQ Cleaning & Repair in Chicago</Stack>
                <Stack style={{
                    width: "134%",
                    marginLeft: "-144px",
                    marginTop: '50px'
                }} className='stepperClass'>
                    <Stepper
                        color={themeOrange}
                        fontSize="12px"
                        fontColor="black"
                        steps={[
                            { label: "SCHEDULE" },
                            { label: "JOB DETAILS" },
                            { label: "CONFIRM" },

                        ]}
                        currentStep={3}
                    />
                </Stack>
                <Divider style={{ borderColor: 'gray', marginTop: '50px' }} />
                <Stack flexDirection={'row'} alignItems={'center'} gap={2} mt={5}>
                    <Stack className='heading-name-text'>
                        Criss angel
                    </Stack>
                    <Stack flexDirection={'row'} alignItems={'center'} gap={1}>
                        <Stack className='heading-side-text'>Not you?</Stack>
                        <Stack style={{ textDecoration: 'underline', cursor: 'pointer' }} className='heading-side-text'>Logout</Stack>
                    </Stack>
                </Stack>

                <Stack mt={4}>
                    <Stack flexDirection={'row'} alignItems={'center'} gap={2}>
                        <Stack> <img width={"40px"} height={'40px'} src={serName} /> </Stack>
                        <Stack className='Service-Name-head'>BBQ Cleaning & Repair</Stack>
                    </Stack>
                    <Stack mt={2} ml={1} flexDirection={'row'} alignItems={'center'} gap={2}>
                        <Stack> <FaCalendarDays color={themeOrange} size={26} /> </Stack>
                        <Stack className='Service-Name-list'>Tue, Feb 27, 2024 (Mor)</Stack>
                    </Stack>
                    <Stack mt={2} ml={1} flexDirection={'row'} alignItems={'center'} gap={2}>
                        <Stack> <FaLocationDot color={themeOrange} size={26} /> </Stack>
                        <Stack className='Service-Name-list'>120 Bremner Boulevard, Toronto, ON</Stack>
                    </Stack>
                    <Stack mt={2} ml={1} flexDirection={'row'} alignItems={'center'} gap={2}>
                        <Stack> <IoDocumentTextSharp color={themeOrange} size={26} /> </Stack>
                        <Stack className='Service-Name-list'>Job Description</Stack>
                    </Stack>
                </Stack>
                <Stack className='need-to-cancel-caontainer'>
                    <Stack p={3}>
                        <Stack style={{ fontSize: '14px', fontWeight: "bold" }}>Need to cancel? No problem!</Stack>
                        <Stack style={{ fontSize: '14px', fontWeight: "lighter" }}>Cancel free of charge at anytime until your pro is on their way to the job Learn More</Stack>
                    </Stack>
                </Stack>
                {/*  ========================================================================= */}
                <Divider style={{ borderColor: 'gray', marginTop: '50px' }} />

                <Stack mt={5} className='heading-name-text'>
                    Service Rate
                </Stack>

                <Stack mt={3} flexDirection={'row'} alignItems={'center'}>
                    <Stack flex={1} className='service-list'> For the first 4 burners </Stack>
                    <Stack fontWeight={"bold"} className='service-list'>$230</Stack>
                </Stack>
                <Stack mt={2} flexDirection={'row'} alignItems={'center'}>
                    <Stack flex={1} className='service-list'> For each additional burner</Stack>
                    <Stack fontWeight={"bold"} className='service-list'>$30</Stack>
                </Stack>
                <Divider style={{ borderColor: 'gray', marginTop: '15px', opacity: '0.2px' }} />
                <Stack mt={2} flexDirection={'row'} alignItems={'center'}>
                    <Stack flex={1} className='service-list'>Parts / Additional</Stack>
                    <Stack fontWeight={"bold"} className='service-list'>TBD</Stack>
                </Stack>
                <Stack mt={2} flexDirection={'row'} alignItems={'center'}>
                    <Stack fontSize={16}>Based on a 4 burner BBQ. +$30/burner after the 4th.</Stack>
                </Stack>
                <Stack flexDirection={'row'} alignItems={'center'} gap={2} mt={2}>
                    <Stack> <img width={"20px"} height={'20px'} src={check} /> </Stack>
                    <Stack fontSize={16} fontWeight={'bold'}>A 2.9% fee will be added to support our Homeowner Protection Promise</Stack>
                </Stack>
                {/*  ========================================================================= */}
                <Divider style={{ borderColor: 'gray', marginTop: '50px' }} />

                <Stack mt={5} className='heading-name-text'>
                    Service Rate
                </Stack>
                <Stack flexDirection={'row'} alignItems={'center'} gap={1} mt={2}>
                    <Stack> <MdLock size={25} color={themeOrange} /></Stack>
                    <Stack fontSize={18} fontWeight={400}>Credit Card</Stack>
                </Stack>
                <Stack>
                    <CreditCardForm />
                </Stack>
                <Stack flexDirection={'row'} alignItems={'center'} gap={2} mt={2}>
                    <Stack> <img width={"20px"} height={'20px'} src={check} /> </Stack>
                    <Stack fontSize={16} >Secure Payment Processing</Stack>
                </Stack>
                <Stack style={{
                    height: '48px',
                    borderRadius: '10px',
                    backgroundColor: ' rgb(254 238 233)'
                }}
                    mt={2}>
                    <Stack flexDirection={'row'} alignItems={'center'} p={2} gap={2}>
                        <Stack>
                            <LuCreditCard size={24} color={themeOrange} />
                        </Stack>
                        <Stack fontSize={14} fontWeight={500}>You won't be charged until the job is complete</Stack>
                    </Stack>
                </Stack>
                <Stack onClick={submitHandle} style={{ backgroundColor: themeOrange, color: 'white', padding: "16px", borderRadius: '30px', textAlign: 'center', cursor: 'pointer' }} mt={3}>
                    Book Now
                </Stack>
                <Stack flexDirection={'row'} alignItems={'center'} mt={2} gap={2} mb={10}>

                    <Stack flex={1} style={{ border: `1px solid ${themeOrange}`, color: themeOrange, padding: "16px", borderRadius: '30px', textAlign: 'center', cursor: 'pointer' }}>
                        Edit Job
                    </Stack>
                    <Stack flex={1} style={{ border: `1px solid ${themeOrange}`, color: themeOrange, padding: "16px", borderRadius: '30px', textAlign: 'center', cursor: 'pointer' }}>
                        Cancel Job
                    </Stack>
                </Stack>

            </Stack>
        </div>
    )
}

export default LastStep 