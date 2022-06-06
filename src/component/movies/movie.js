import TextField from '@mui/material/TextField';
import React, { useEffect, useState } from 'react';
import "./index.css";
function MovieName() {
    const [state, setState] = useState({

        "movieName": "",
        "ticketPrice": "",
        "gst": "",
        "movieImage": "",
        "serviceCharge": "",
        "createdBy": localStorage.getItem("user_id"),
        "updatedBy": localStorage.getItem("user_id")

    });
    const onChange = (event) => {

        const { name, value } = event.target;
        if (name === "movieName") {
            setState({ ...state, [name]: value, createdBy: value, updatedBy: value });
        }
    }
    return (<div className="container border" style={{ height: "calc(100vh - 81px)" }} >
  
        <div style={{ paddingTop: "5%"}}>
        <h1>Add a Movie</h1>
        <div className="form-outline mb-4"  >
            <TextField
                id="outlined-movie-name-input"
                label="Movie name"
                placeholder='Enter the Movie Name'
                inputProps={{ maxLength: 200 }}
                name="movieName"
                onChange={onChange}
                value={state.movieName}
                type="text"
                fullWidth
            />
        </div>
        <div className="form-outline mb-4"  >
            <TextField
                id="outlined-movie-url-input"
                label="Movie url"
                placeholder='Enter the Movie Name'
                inputProps={{ maxLength: 200 }}
                name="movieUrl"
                onChange={onChange}
                value={state.movieUrl}
                type="text"
                fullWidth
            /> </div>
        <div className="form-outline mb-4"  >

            <TextField
                id="outlined-ticket-price-input"
                label="TicketPrice"
                placeholder='Enter the Ticket Price'
                name="ticketPrice"
                onChange={onChange}
                value={state.ticketPrice}
                type="number"
                fullWidth
            /> </div>
        <div className="form-outline mb-4"  >
            <TextField
                id="outlined-gst-input"
                label="GST"
                placeholder='Enter the GST'
                name="gst"
                onChange={onChange}
                value={state.gst}
                type="text"
                fullWidth
            /> </div>
        <div className="form-outline mb-4"  >
            <TextField
                id="outlined-ServiceCharge-input"
                label="ServiceCharge"
                placeholder='Enter the GST'
                name="ServiceCharge"
                onChange={onChange}
                value={state.ServiceCharge}
                type="text"
                fullWidth
            />
        </div>
</div>
    </div>);
}

export default MovieName;