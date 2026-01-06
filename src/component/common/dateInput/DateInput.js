import Input from '@mui/joy/Input';
import React from 'react'
import { themeGray } from '../../../utils/colorTheme'

const DateInput = () => {
    return (
        <Input
            type="date"
            // fullWidth={true}
            sx={{bgcolor:themeGray,padding:"14px"}}
            slotProps={{
                input: {
                    min: '2018-06-07T00:00',
                    max: '2018-06-14T00:00',
                },
            }}
        />
    )
}

export default DateInput