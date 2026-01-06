import React from 'react'
import { Container, Divider, Grid, Stack } from '@mui/material'
import './index.css'
import { AiFillLike } from "react-icons/ai";
import { FaCheck } from "react-icons/fa6";


const Category = [
    "Broil King Cleaning",
    "Weber Cleaning",
    "Napolean Cleaning",
    "Lynx Cleaning",
    "Sedona Cleaning",
    "eNatural Gas BBQs",
    "Propane BBQs",
    "And much more!",
    "Big Green Egg Cleaning"

]

const FirstCard = () => {

    return (
        <div>
            <Stack sx={{
                paddingX: 3,
                paddingTop: 10
            }} >
                <Stack className="service-name">BBQ Cleaning & Repair in Chicago</Stack>
                <Stack sx={{
                    paddingTop: 5,
                    flexDirection: 'row',
                    alignItems: 'center'

                }}>
                    <Stack flex={1} className='job-review'>of 3846 job reviews</Stack>
                    <div className='review-btn-container'>
                        <div style={{ marginTop: '5px' }}><AiFillLike size={22} color='white' /></div>
                        <div className='review-percent-text'>96%</div>
                    </div>
                </Stack>
                <Stack mt={5} className="service-sub-name">Get a confirmed job in minutes</Stack>
                <Stack className='job-details'>
                    A deep clean brings your entire BBQ back to look almost new by taking it completely apart, using power tools to thoroughly clean each component. The pros can also repair almost anything not working properly with the unit.
                </Stack>
                <Divider style={{ border: "0.4px solid lightgray", marginTop: "20px" }} />
                <Stack mt={5} className="service-sub-name">Get a confirmed job in minutes</Stack>
                <Stack flexDirection={'row'} flexWrap={'wrap'} gap={3} mt={5}>
                    {Category.map((e, i) => {
                        return <Stack sx={{
                            flexDirection: 'row',
                            alignItems: 'center',
                            // marginTop: 2

                        }}>
                            <Stack mr={1}>
                                <FaCheck color='black' size={24} />
                            </Stack>
                            <Stack className='category-text'>{e}</Stack>
                        </Stack>
                    })}
                </Stack>
                <Stack mt={5} className='category-text'>Not sure if this is the right service for you? Chat with us</Stack>
                <Divider style={{ border: "0.4px solid lightgray", marginTop: "10px" }} />
                <Stack sx={{
                    backgroundColor: 'lightgray',
                    padding: 5,
                    borderRadius: "30px",
                    mt: 4
                }}>
                    <Stack className='how-its-works'>How it works</Stack>
                    <Stack className='how-its-works-discription'>Done matches you with a pro once you've sent a job request, a.k.a. 'booking a job'. Your job request is sent to our Done Certified Pros who will review and accept it in minutes. Once you've been matched, you can communicate with your pro through the Done app to discuss any further details. Remember, you can always cancel the job if you do not wish to move forward.</Stack>
                </Stack>
                <Divider style={{ border: "0.4px solid lightgray", marginTop: "40px" }} />
                <Stack mt={5} className="service-sub-name">Certified Done Pros</Stack>
                <Stack mb={7.5} className='certified-details'>
                All Done Pros are insured and qualified, highly rated by our customers, and background-checked. Pros must maintain a minimum 90% approval rating from customers.
                </Stack>
            </Stack>
        </div>
    )
}

export default FirstCard