import * as React from "react";
import Box from "@mui/material/Box";
import { useSelector } from "react-redux";
import { RequestDetails } from "../../../pages/serviceRequest/RequestDetails";
import { Spefications } from "../../../pages/serviceRequest/Spefications";
import { Document } from "../../../pages/serviceRequest/Document";
import { Summary } from "../../../pages/serviceRequest/Summary";
import { themeOrange } from "../../../utils/colorTheme";
import Tab from "@mui/material/Tab";
import TabContext from "@mui/lab/TabContext";
import TabList from "@mui/lab/TabList";
import TabPanel from "@mui/lab/TabPanel";
import logo from '../../../assets/servicehub4_720.jpg'
import { Stack } from "@mui/material";



export default function CustomTabs(props) {

    const { value, handleChange } = props;
    // const [value, setValue] = React.useState("1");
    const { role } = useSelector((state) => state.userAuth);

    // const handleChange = (event, newValue) => {
    //     setValue(newValue);
    // };

    return (
        <Box
            sx={{
                width: "100%",
            }}
        >
            <TabContext value={value}>
                <Box
                    sx={{
                        borderBottom: 1,
                        borderColor: "divider",
                        color: "white",
                    }}
                >
                    <Stack m={4}>
                        <img style={{ objectFit: "cover", width: "18rem" }} src={logo} />
                    </Stack>
                    <TabList
                        onChange={(event, newValue) => handleChange(newValue)}
                        aria-label="lab API tabs example"
                        textColor="inherit"
                        sx={{
                            "& .MuiTabs-indicator": {
                                backgroundColor: themeOrange,
                            },
                            color: "black"
                        }}
                        variant="fullWidth"
                    >

                        <Tab label="Request Details" value="1" />
                        <Tab label={"Specification"} value="2" />
                        <Tab label={"Document"} value="3" />
                        <Tab label={"Summary"} value="4" />
                    </TabList>
                </Box>
                <TabPanel value="1">
                    <RequestDetails />
                </TabPanel>
                <TabPanel value="2">
                    <Spefications />
                </TabPanel>
                <TabPanel value="3">
                    <Document />
                </TabPanel>
                <TabPanel value="4">
                    <Summary />
                </TabPanel>
            </TabContext>
        </Box>
    );
}
