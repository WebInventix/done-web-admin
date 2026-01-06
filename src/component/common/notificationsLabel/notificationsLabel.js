// import * as React from 'react';
// import Badge from '@mui/material/Badge';


// export default function MailBadge() {
//     return (
//         <Badge
//             badgeContent={4}
//             color="warning"
//             invisible={false}
//             size="large"
//         />
//     );
// }
import * as React from 'react';
import Box from '@mui/material/Box';
import Badge from '@mui/material/Badge';
import MailIcon from '@mui/icons-material/Mail';

export default function MailBadge() {
    return (
        <Box sx={{ color: 'action.active' }}>
            <Badge badgeContent={4}
                color="warning"
                invisible={false}
                size="large">
                <MailIcon sx={{
                    fontSize:20
                }} />
            </Badge>
        </Box>
    );
}