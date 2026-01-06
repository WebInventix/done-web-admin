import React from 'react'
import { themeOrange } from '../../utils/colorTheme'
import Stepper from 'react-stepper-js'
import 'react-stepper-js/dist/index.css'
import { Divider, Stack } from '@mui/material'
import './index.css'
import { FaCalendarDays } from "react-icons/fa6";
import { FiPlus } from "react-icons/fi";
import IconInput from '../IconInput/IconInput'
import { useDispatch, useSelector } from 'react-redux'
import { setNextStepFirst } from '../../store/slices/ui_control_slice'
import MultiDatePicker from '../datePicker/MultiDatePicker'

const FirstStep = () => {
    const dispatch = useDispatch();


    const NextHandle = () => {
        dispatch(setNextStepFirst());
    };

    // console.log("isNextFirstStep", isNextFirstStep);
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
                        currentStep={1}
                    />
                </Stack>
                <Divider style={{ borderColor: 'gray', marginTop: '50px' }} />
                <Stack className='When-should'>
                    When should we send someone?
                </Stack>
                <Stack className='availible-date '>Select available date and times</Stack>
                <Stack style={{ width: "60%", marginTop: '2x0px' }}>
                    <IconInput
                        disabled={true}
                        placeholder="Add Date"
                        first_icon={<FaCalendarDays size={32} color={themeOrange} />}
                        second_icon={<FiPlus size={32} color={themeOrange} />}
                        style={{ width: '100%', paddingLeft: "60px" }} />
                </Stack>
                {/* <MultiDatePicker/> */}
                <Stack className='Timing-constraints'>
                    Timing constraints
                </Stack>
                <Stack className='Timing-constraints-container'>
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vivamus vel dolor felis. In ligula purus, imperdiet ac est nec, tempus varius nisl. Integer et venenatis odio. Fusce enim lectus, gravida ut justo sed.
                </Stack>
                <Divider style={{ borderColor: 'gray', marginTop: '50px' }} />

                <Stack className='next-btn' onClick={NextHandle}>Next</Stack>
            </Stack>
        </div>
    )
}

export default FirstStep