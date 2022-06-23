import Box from '@mui/material/Box';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import React, { memo, useEffect, useState } from 'react';
import { DesktopDatePicker } from '@mui/x-date-pickers/DesktopDatePicker';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import Stack from '@mui/material/Stack';
import TextField from '@mui/material/TextField';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import seatings from '../../utils/seatings';
import Button from '@mui/material/Button';
import Ticketbooking from './ticketbooking';

function MovieSelection(props) {
    const [showTime, setshowTime] = React.useState('');

    const selectTime = (event) => {
        setshowTime(event.target.value);
        props.childState(event.target.value,'movieTiming')
    };

    const [showDate, setshowDate] = useState(new Date());

    const handleChange = (newValue) => {
        setshowDate(newValue);
        
        props.childState(newValue,'fromDate')
    };

    return ( <> <Box sx={{ minWidth: 320, maxWidth: 320 }}>
        
        <FormControl fullWidth>
            <InputLabel id="demo-simple-select-label">select Movie</InputLabel>
            <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                value={props.movieId}
                label="movie"
                disabled={
                    props.movieId!=""
                }
                // onChange={selectMovie}
            > 
                {props.movie.map((item) => {debugger
                  return  <MenuItem value={item._id}>{item.movieName}</MenuItem>
                })}
                
                {/* <MenuItem value={1}>don</MenuItem>
                <MenuItem value={2}>can</MenuItem>
                <MenuItem value={3}>pan</MenuItem> */}
            </Select>
        </FormControl>
       
    </Box>

    <LocalizationProvider dateAdapter={AdapterDateFns}>
        <Stack spacing={3}>
            <DesktopDatePicker
                label="Date"
                inputFormat="dd/MM/yyyy"
                value={showDate}
                minDate={new Date()}
                maxDate={new Date(new Date().getTime() + (seatings.futureTicketAvailableDates * 24 * 60 * 60 * 1000))}
                onChange={handleChange}
                renderInput={(params) => <TextField {...params} />}
            />
        </Stack>
    </LocalizationProvider>
    <div className="showtimeMargin">
        <Box sx={{ minWidth: 120 }}>
            <FormControl fullWidth>
                <InputLabel id="demo-simple-select-label">ShowTime</InputLabel>
                <Select
                    labelId="demo-simple-select-label"
                    id="demo-simple-select"
                    value={showTime}
                    label="Time"
                    onChange={selectTime}
                >
                    {seatings.showTiming.map((e, i, a) => { return <MenuItem value={e}>{e}</MenuItem> })}
                
                </Select>
            </FormControl>
        </Box>
    </div>
    <Button className="searchMargin" variant="contained" style={{}}  onClick={props.getBooking} disabled={showTime==""}>Search</Button></> );
}

export default memo(MovieSelection);