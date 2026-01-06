import React, { useState } from 'react';
import { Avatar, IconButton, Tooltip } from '@mui/material';
import './CustomMenu.css'; // Import your custom CSS for styling if needed
import { useNavigate } from 'react-router-dom';
import { success_toast_message } from '../../../utils/toast_message';

const ProfileMenu = () => {
    const navigate = useNavigate()
    const [open, setOpen] = useState(false);

    const handleToggle = () => {
        setOpen(!open);
    };

    const handleClose = () => {
        setOpen(false);
        navigate('/')
        success_toast_message("Logout Successfully")
        window.location.reload()
        localStorage.removeItem("auth");


    };

    return (
        <div className="custom-menu">
            <Tooltip title="Account settings">
                <IconButton onClick={handleToggle}>
                    <Avatar>M</Avatar>
                </IconButton>
            </Tooltip>

            {open && (
                <div className="menu-items">
                    <button className="menu-item" onClick={()=>navigate("/dashboard")}>
                        Dashboard
                    </button>
                    <button className="menu-item" onClick={handleClose}>
                        Logout
                    </button>
                </div>
            )}
        </div>
    );
};

export default ProfileMenu;
