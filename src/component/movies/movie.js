import { Button } from '@mui/material';
import TextField from '@mui/material/TextField';
import message from '../../utils/messages';

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
    const [validationMsg, setValidationMsg] = useState({
        "movieImageValidation": ""
    });
    
    const onChange = (event) => {
        const { name, value } = event.target;
        setState({ ...state, [name]: value });
        if(name==="movieImage"){
            var res = value.match(/(http(s)?:\/\/.)?(www\.)?[-a-zA-Z0-9@:%._\+~#=]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_\+.~#?&//=]*)/g);
            if(res != null){
                setValidationMsg({ ...validationMsg, movieImageValidation: "" })
            } else {
                setValidationMsg({ ...validationMsg, movieImageValidation: message.invalidUrl })
        }
    }

    }
    const onClear=(event)=>{debugger
      
        setState({
            "movieName": "",
            "ticketPrice": "",
            "gst": "",
            "movieImage": "",
            "serviceCharge": "" });
    }

    return (<div className="container border" style={{ height: "calc(100vh - 81px)" }} >

        <div style={{ paddingTop: "5%" }}>
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
                    name="movieImage"
                    helperText={validationMsg.movieImageValidation}
                    error={validationMsg.movieImageValidation}
                    onChange={onChange}
                    value={state.movieImage}
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
                    type="number" onKeyDown={ (evt) => evt.key === 'e' && evt.preventDefault() } 
                    fullWidth
                /> </div>
            <div className="form-outline mb-4"  >

                <TextField
                    id="outlined-gst-input"
                    label="GST (%)"
                    placeholder='Enter the GST (%)'
                    name="gst"
                    onChange={onChange}
                    value={state.gst}
                    type="number" onKeyDown={ (evt) => evt.key === 'e' && evt.preventDefault() } 
                    fullWidth
                /> </div>
            <div className="form-outline mb-4"  >
                <TextField
                    id="outlined-serviceCharge-input"
                    label="Service Charge (₹)"
                    placeholder='Enter the Service Charge'
                    name="serviceCharge"
                    onChange={onChange}
                    inputProps={{ inputmode: 'numeric', pattern: '[0-9]*' }}
                    value={state.serviceCharge}
                    type="number" onKeyDown={ (evt) => evt.key === 'e' && evt.preventDefault() } 
                    fullWidth
                />
            </div>
            <div className="buttonSaveClear">
                <Button className="button-movie-save" variant="contained" disabled={
          state.movieName.length === 0 ||
          state.ticketPrice.length === 0 ||
          state.gst.length===0||
          state.movieImage.length===0||
          state.serviceCharge.length===0||
          validationMsg.movieImageValidation !== "" 
         
        }>save</Button> 

                <Button  onClick={onClear}  color="error" className="button-movie-clear" variant="contained" >clear</Button>
            </div>
        </div>
    </div>);
}

export default MovieName;