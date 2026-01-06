import { Stack } from '@mui/material'
import React, { useEffect, useState } from 'react'
import { mdDownLayout } from '../../utils/helper/mdDownLayoutListener.js';
import './style.css';
import useWindowDimensions from '../../utils/hooks/windowDimensions.js';
import { useNavigate, useNavigation } from 'react-router-dom';
import { UserContentView } from './UserContentView.js';
import { UserSideBar } from './UserSideBar.js';



export const UserDashboard = () => {
    const navigate =  useNavigate()

    const { height, width } = useWindowDimensions()
    const [active, setactive] = useState(true)
    const [sidebarHide, setSidebarHide] = useState(false)

   
    const activeChangeHandle = () => {
        if (sidebarHide) {
            setactive(true)
            setSidebarHide(false)
        }
        else {
            setactive(!active)
        }

    }


    useEffect(() => {
        if (!mdDownLayout(width)) {
            setactive(false)
        }
    }, [width])





    const sideBarHideUnhideToggle = (e) => {

        setSidebarHide(!sidebarHide)
    }



    return (
        <Stack sx={{ width: '100%', height: '100vh' }}>
            <UserSideBar active={active} onClickHanlde={sideBarHideUnhideToggle} activeChangeHandle={activeChangeHandle} hidden={sidebarHide} />
            <UserContentView onClickHanlde={activeChangeHandle} />
        </Stack>
    )
}
