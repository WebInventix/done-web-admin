import { Container, Grid, Stack } from '@mui/material'
import React from 'react'
import DashboardNavbar from '../../component/DashboardNavbar/DashboardNavbar'
import dashboardImage from '../../assets/dashboardImage.png'
import FirstCard from '../../component/ServiceDetailCards/FirstCard'
import SecondCard from '../../component/ServiceDetailCards/SecondCard'
import DiscountCard from '../../component/ServiceDetailCards/DiscountCard'
// import Footer from '../Footer/Footer'
import { useSelector } from 'react-redux'
import FirstStep from '../../component/StepScreen/FirstStep'
import { BsTools } from "react-icons/bs";
import SecondStep from '../../component/StepScreen/SecondStep'
import LastStep from '../../component/StepScreen/LastStep '

const SelectLocationScreen = () => {

    const { isStarted, isNextFirstStep, isNextSecondStep } = useSelector((state) => state.uiControle)

    return (
        <div>
            <Stack>
                <DashboardNavbar />
            </Stack>
            <Stack>
                {
                    !isStarted && <Stack>
                        <img src={dashboardImage} style={{ objectFit: 'cover', width: '100%' }} />
                    </Stack>
                }

                <Container Container maxWidth={'xl'} sx={{ mt: !isStarted ? -10 : 20 }} >

                    <Grid container spacing={3}   >
                        <Grid item xl={7} lg={7} md={7} sm={12} xs={12}>
                            {!isStarted ? <Stack style={{
                                padding: 10,
                                borderRadius: "30px",
                                backgroundColor: 'white',
                                boxShadow: "rgba(0, 0, 0, 0.1) 0px 4px 12px"

                            }}>
                                <FirstCard />

                            </Stack> : <Stack>
                                {
                                    isNextSecondStep ? <LastStep /> :
                                        <Stack>
                                            {!isNextFirstStep ? <FirstStep /> : <SecondStep />}
                                        </Stack>
                                }

                            </Stack>
                            }

                        </Grid>

                        {!isNextSecondStep && <Grid item xl={5} lg={5} md={5} sm={12} xs={12} mb={!isStarted ? 0 : 5}>
                            <Stack style={{
                                borderRadius: "30px",
                                backgroundColor: 'white',
                                boxShadow: "rgba(0, 0, 0, 0.1) 0px 4px 12px"
                            }}>
                                <SecondCard />


                            </Stack>
                            {
                                !isNextFirstStep ? <Stack>
                                    {isStarted && <Stack mt={2} className='bottom-content'>
                                        <Stack flexDirection={'row'} alignItems={'center'} gap={3} p={3}>

                                            <Stack>

                                                <BsTools size={32} color='black' />
                                            </Stack>
                                            <Stack className='bottom-content-text'>Based on a 4 burner BBQ. +$30/burner after the 4th.</Stack>
                                        </Stack>

                                    </Stack>}
                                </Stack> :
                                    <Stack>
                                        <Stack mt={2} className='bottom-content-two'>
                                            <Stack flexDirection={'row'} alignItems={'center'} gap={3} p={3}>

                                                <Stack>

                                                    <BsTools size={32} color='black' />
                                                </Stack>
                                                <Stack className='bottom-content-text'>color: #000;
                                                    Rate is 2X if 2 techs are needed for large appliances or stacked units. Add $50 for disposal of old appliance(s). Parts, along with any duct work, if required, are extra and will be quoted by your Pro. Miele, Wolf and Sub-Zero are 1.5X regular rates.</Stack>
                                            </Stack>

                                        </Stack>
                                        <Stack mt={2} className='bottom-content-two'>
                                            <Stack p={3}>

                                                <Stack fontWeight={'bold'} textAlign={'start'} alignItems={'flex-start'} className='bottom-content-text'>
                                                    Who is my pro?
                                                </Stack>
                                                <Stack className='bottom-content-text'>
                                                    Done will match you with a pro once you've created a job request. All Done Pros are insured and qualified, highly rated by our customers, and background-checked. Pros must maintain a minimum 90% approval rating from customers.</Stack>
                                            </Stack>

                                        </Stack>
                                    </Stack>

                            }
                        </Grid>}
                    </Grid>
                    {!isStarted && <Stack mt={4} mb={5}>
                        <DiscountCard />
                    </Stack>}
                </Container>
                {/* <Stack>
                    <Footer />
                </Stack> */}
            </Stack>
        </div >
    )
}

export default SelectLocationScreen