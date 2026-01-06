import React from 'react'
import { themeOrange } from '../../utils/colorTheme'
import Stepper from 'react-stepper-js'
import 'react-stepper-js/dist/index.css'
import { Divider, Stack } from '@mui/material'
import './index.css'
import CustomAccordion from '../common/customAccordion/CustomAccordion'
import { MdLibraryAdd } from "react-icons/md";
import { useDispatch } from 'react-redux'
import { setBackStepFirst, setNextStepSecond } from '../../store/slices/ui_control_slice'

const SecondStep = () => {
    const dispatch = useDispatch();


    const BackHanlde = () => {
        dispatch(setBackStepFirst());
    };
    const NextHanlde = () => {
        dispatch(setNextStepSecond());
    };
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
                        currentStep={2}
                    />
                </Stack>
                <Divider style={{ borderColor: 'gray', marginTop: '50px' }} />
                <Stack className='When-should'>
                    What do you need done?
                </Stack>
                <Stack style={{ marginTop: "32px" }}>
                    <CustomAccordion
                        title='Pros recommend including these details:'
                        content='Brand and model number(s)'
                        marginLeft="30px"
                    />
                </Stack>
                <Stack className='Timing-constraints-container'>
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vivamus vel dolor felis. In ligula purus, imperdiet ac est nec, tempus varius nisl. Integer et venenatis odio. Fusce enim lectus, gravida ut justo sed.
                </Stack>
                <Divider style={{ borderColor: 'gray', marginTop: '50px' }} />
                <Stack className='When-should'>
                    Upload Photos
                </Stack>
                <Stack style={{ marginTop: "32px" }}>
                    <CustomAccordion
                        title='Pros recommend including these details:'
                        content={
                            <div>

                                <ul style={{ listStyleType: 'none' }}>
                                    <li>Pic of the appliance(s)</li>
                                    <li>Pics of where the appliance(s) will be installed</li>
                                    <li>Pics of the label showing model name and number</li>
                                    <li>Pics of any parts or materials you are providing</li>
                                </ul>
                                <div style={{ marginLeft: "-30px", marginTop: "10px" }}>
                                    These details are not needed if you are removing old appliances.
                                </div>
                            </div>
                        }
                        marginLeft="30px"
                    />
                </Stack>
                <Stack style={{ marginTop: "32px" }} className='upload-image-container'>
                    <Stack flexDirection={'column'} alignItems={'center'} gap={2}>
                        <Stack >
                            <MdLibraryAdd size={48} color={themeOrange} />
                        </Stack>
                        <Stack className='add-photo-title'>Add Photos</Stack>
                    </Stack>
                </Stack>

                <Divider style={{ borderColor: 'gray', marginTop: '50px' }} />
                <Stack flexDirection={'row'} alignItems={'center'} gap={2}>

                    <Stack onClick={BackHanlde} className='next-btn-outline'>Back</Stack>
                    <Stack onClick={NextHanlde} className='next-btn'>Next</Stack>

                </Stack>
            </Stack>
        </div>
    )
}

export default SecondStep