import * as React from 'react';
import OutlinedInput from '@mui/material/OutlinedInput';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import ListItemText from '@mui/material/ListItemText';
import Select from '@mui/material/Select';
import Checkbox from '@mui/material/Checkbox';

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
    PaperProps: {
        style: {
            maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
            width: 250,
        },
    },
};

const names = [
    'Oliver Hansen',
    'Van Henry',
    'April Tucker',
    'Ralph Hubbard',
    'Omar Alexander',
    'Carlos Abbott',
    'Miriam Wagner',
    'Bradley Wilkerson',
    'Virginia Andrews',
    'Kelly Snyder',
];

export default function MultiSelectComp(props) {

    const { placeholder, optionArray, onChange, propValue } = props
    // const [personName, setPersonName] = React.useState([]);

    // const handleChange = (event) => {
    //     const {
    //         target: { value },
    //     } = event;
    //     setPersonName(
    //         // On autofill we get a stringified value.
    //         typeof value === 'string' ? value.split(',') : value,
    //     );
    // };
    // console.log("propValue",propValue)

    return (
        <div>
            <FormControl sx={{ width: 1 }}>
                <InputLabel id="demo-multiple-checkbox-label">{placeholder}</InputLabel>
                <Select
                    labelId="demo-multiple-checkbox-label"
                    id="demo-multiple-checkbox"
                    multiple
                    value={propValue ? propValue : []}
                    onChange={onChange}
                    input={<OutlinedInput label={placeholder} />}
                    renderValue={(selected) => selected.join(', ')}
                    MenuProps={MenuProps}
                >
                    {/* {names.map((name) => (
                        <MenuItem key={name} value={name}>
                            <Checkbox checked={personName.indexOf(name) > -1} />
                            <ListItemText primary={name} />
                        </MenuItem>
                    ))} */}
                    {optionArray?.map((e, i) => {
                        
                        return <MenuItem key={i} value={e?.name}>
                            <Checkbox checked={propValue?.indexOf(i) > -1} />
                            <ListItemText primary={e?.name} />
                        </MenuItem>
                    })}
                </Select>
            </FormControl>
        </div>
    );
}