import * as React from 'react';
import Divider from '@mui/joy/Divider';
import Input from '@mui/joy/Input';
import Select from '@mui/joy/Select';
import Option from '@mui/joy/Option';
import { themeGray } from '../../../utils/colorTheme';

export default function CurrencyInput() {
  const [currency, setCurrency] = React.useState('lei');
  return (
    <Input
      placeholder="Amount"
      startDecorator={{ dollar: '$', lei: 'lei',}[currency]}
      endDecorator={
        <React.Fragment>
          <Divider orientation="vertical" />
          <Select
            variant="plain"
            value={currency}
            onChange={(_, value) => setCurrency(value)}
            slotProps={{
              listbox: {
                variant: 'outlined',
              },
            }}
            sx={{ mr: -1.5, '&:hover': { bgcolor: 'transparent' } ,bgcolor:themeGray}}
          >
            <Option value="dollar">US dollar</Option>
            <Option value="lei">lei</Option>
          </Select>
        </React.Fragment>
      }
      sx={{ width:"100%",bgcolor:themeGray ,padding:"10px"}}
    />
  );
}