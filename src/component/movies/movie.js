import { Button } from '@mui/material';
import TextField from '@mui/material/TextField';
import message from '../../utils/messages';
import React, { useEffect, useState } from 'react';
import api from '../../utils/api';
import axios from 'axios';
import "./index.css";
import SnackbarNotification from '../../utils/snackbar';
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
        "movieImageValidation": "",
        "submitDisable": false
    });
    const [notification, setnotification] = React.useState({
        open: false,
        notificationMessage: "",
        errorStatus: ""
    })
    const { open, notificationMessage, errorStatus } = notification;
    const config = {
        headers: { "x-access-token": localStorage.getItem("access_token") }
    };
    const onChange = (event) => {
        const { name, value } = event.target;
        setState({ ...state, [name]: value });
        if (name === "movieImage") {
            var res = value.match(/(http(s)?:\/\/.)?(www\.)?[-a-zA-Z0-9@:%._\+~#=]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_\+.~#?&//=]*)/g);
            if (res != null) {
                setValidationMsg({ ...validationMsg, movieImageValidation: "" })
            } else {
                setValidationMsg({ ...validationMsg, movieImageValidation: message.invalidUrl })
            }
        }
    }
    const onClear = (event) => {
        setState({
            "movieName": "",
            "ticketPrice": "",
            "gst": "",
            "movieImage": "",
            "serviceCharge": ""
        });
    }
    const hideSnackbar = (msg) => {
        setnotification({ ...notification, open: false })
    }
    const disableSnackbar = () => {
        setTimeout(() => {
            hideSnackbar();
        }, 5000)
    }

    const onSave = (e) => {
        debugger
        e.preventDefault();
        setValidationMsg({ ...validationMsg, submitDisable: true })
        axios.post(api.addMovie, state, config).then(response => {
            debugger
            setState({
                "movieName": "",
                "ticketPrice": "",
                "gst": "",
                "movieImage": "",
                "serviceCharge": ""
            })
            setValidationMsg({ ...validationMsg, submitDisable: false })
            setnotification({ ...notification, open: true, notificationMessage: response.data.message, errorStatus: "success" });
            disableSnackbar();
        }).catch(error => {
            setValidationMsg({ ...validationMsg, submitDisable: false });
            disableSnackbar();
            setnotification({ ...notification, open: true, notificationMessage: error.response.data.message, errorStatus: "error" })
        });
    }
    return (
        <div className="container border" style={{ height: "calc(100vh - 81px)" }} >
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
                        inputProps={{ maxLength: 5 }}
                        type="number" onKeyDown={(evt) => evt.key === 'e' && evt.preventDefault()}
                        fullWidth
                    /> </div>
                <div className="form-outline mb-4"  >

                    <TextField
                        id="outlined-gst-input"
                        label="GST (%)"
                        placeholder='Enter the GST (%)'
                        name="gst"
                        onChange={onChange}
                        inputProps={{ maxLength: 5 }}
                        value={state.gst}
                        type="number" onKeyDown={(evt) => evt.key === 'e' && evt.preventDefault()}
                        fullWidth
                    /> </div>
                <div className="form-outline mb-4"  >
                    <TextField
                        id="outlined-serviceCharge-input"
                        label="Service Charge (₹)"
                        placeholder='Enter the Service Charge'
                        name="serviceCharge"
                        onChange={onChange}
                        inputProps={{ inputmode: 'numeric', pattern: '[0-9]*',maxLength: 5 }}
                        value={state.serviceCharge}
                        type="number" onKeyDown={(evt) => evt.key === 'e'||evt.key === '-'||evt.key === '+' && evt.preventDefault()}
                        fullWidth
                    />
                </div>
                <div className="buttonSaveClear">
                    <Button
                        onClick={onSave}
                        className="button-movie-save" variant="contained"
                        disabled={
                            state.movieName.length === 0 ||
                            state.ticketPrice.length === 0 ||
                            state.gst.length === 0 ||
                            state.movieImage.length === 0 ||
                            state.serviceCharge.length === 0 ||
                            validationMsg.movieImageValidation !== "" ||
                            validationMsg.submitDisable

                        }>save</Button>

                    <Button onClick={onClear} color="error" className="button-movie-clear" variant="contained" >clear</Button>
                </div>
            </div>
            <SnackbarNotification open={open} notificationMessage={notificationMessage} errorStatus={errorStatus} hideSnackbar={hideSnackbar} />
        </div>);
}

export default MovieName;