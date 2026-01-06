import * as React from 'react';
import Accordion from '@mui/material/Accordion';
import AccordionDetails from '@mui/material/AccordionDetails';
import AccordionSummary from '@mui/material/AccordionSummary';
import Typography from '@mui/material/Typography';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { IoSunny } from "react-icons/io5";
import { Stack } from '@mui/material';

export default function CustomAccordion(props) {
    const { title, content, marginLeft } = props
    const [expanded, setExpanded] = React.useState(false);

    const handleChange = (panel) => (event, isExpanded) => {
        setExpanded(isExpanded ? panel : false);
    };

    return (
        <div>
            <Accordion style={{ backgroundColor: 'rgb(254 238 233)', borderRadius: '10px' }} expanded={expanded === 'panel1'} onChange={handleChange('panel1')}>
                <AccordionSummary
                    expandIcon={<ExpandMoreIcon />}
                    aria-controls="panel1bh-content"
                    id="panel1bh-header"
                >
                    <Stack flexDirection={'row'} alignItems={"center"} gap={1}>
                        <Typography marginTop={1}>
                            <IoSunny size={25} color='black' />
                        </Typography>
                        <Typography sx={{ flexShrink: 0, fontSize: "16px" }}>
                            {title}
                        </Typography>
                    </Stack>
                </AccordionSummary>
                <AccordionDetails style={{ marginLeft: marginLeft, marginTop: "-20px" }}>
                    <Typography>
                        {content}
                    </Typography>
                </AccordionDetails>
            </Accordion>
        </div>
    );
}