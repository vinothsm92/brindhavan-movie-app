import React, { memo } from 'react';
import TextField from '@mui/material/TextField';
import { useEffect, useState } from 'react';
import "./login.css";
import message from '../../utils/messages.js';
import api from '../../utils/api.js';
import axios from "../../utils/axiosInterceptor";
import Snackbar from '@mui/material/Snackbar';
import MuiAlert from '@mui/material/Alert';
import Stack from '@mui/material/Stack';
function Register() {
    const [state, setState] = useState({
        "email": "",
        "firstName": "",
        "lastName": " ",
        "password": "",
        "cPassword": "",
        "role": "User",
        "createdBy": "",
        "updatedBy": "",
        "termsCondition": false
    });
    const [validationMsg, setValidationMsg] = useState({
        "cpasswordValidation": "",
        "emailValidation": "",
        "passwordValidation": "",
        "submitDisable": false
    });
    const [notification, setnotification] = React.useState({
        open: false,
        vertical: 'bottom',
        horizontal: 'center',
        notificationMessage: "",
        errorStatus:""
    });
    const { vertical, horizontal, open, notificationMessage,errorStatus } = notification;
    useEffect(() => {
    }, [state.password])
    const onChange = (event) => {
        const { name, value } = event.target;
        if (name === "firstName") {
            var fName = value.replace(/[^\w\s]/gi, "")
            setState({ ...state, [name]: fName, createdBy: fName, updatedBy: fName });
        }
        if (name === "email") {
            if (/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(value)) {
                setValidationMsg({ ...validationMsg, emailValidation: "" })
            } else {
                setValidationMsg({ ...validationMsg, emailValidation: message.invalidEmail })

            }
            setState({ ...state, [name]: value })
        }
        if (name === "password") {

            var pword = value;
            var errmsg = "";
            if (pword.length < 5) {
                errmsg = message.passwordMinLength;
                setValidationMsg({ ...validationMsg, passwordValidation: message.passwordMinLength })
            }
            else {
                errmsg = ""
                setValidationMsg({ ...validationMsg, passwordValidation: "" })
            }

            setState({ ...state, [name]: pword })

            if (state.cPassword.length > 1) {
                if (pword != state.cPassword) {
                    setValidationMsg({ ...validationMsg, cpasswordValidation: message.invalidCpassword, passwordValidation: errmsg });

                } else {
                    setValidationMsg({ ...validationMsg, cpasswordValidation: "", passwordValidation: errmsg });
                }
            }

        }
        if (name === "cPassword") {
            if (value !== state.password) {
                setValidationMsg({ ...validationMsg, cpasswordValidation: message.invalidCpassword })
            } else {
                setValidationMsg({ ...validationMsg, cpasswordValidation: "" })
            }
            setState({ ...state, [name]: value })
        }
        if (name === "termsCondition") {
            setState({ ...state, [name]: !state.termsCondition })
        }
    }
    const signUp = (e) => {
        
        e.preventDefault();
        setValidationMsg({ ...validationMsg, submitDisable: true })
        axios.post(api.register, state)
            .then(response => {
                ;
                setState({
                    "email": "",
                    "firstName": "",
                    "lastName": " ",
                    "password": "",
                    "cPassword": "",
                    "role": "User",
                    "createdBy": "",
                    "updatedBy": "",
                    "termsCondition": false
                })
                setValidationMsg({ ...validationMsg, submitDisable: false })
                setnotification({ ...notification, open: true, notificationMessage: response.data.message,errorStatus:"success" });
                
            })
            .catch(error => {
                
                setValidationMsg({ ...validationMsg, submitDisable: false })
                setnotification({ ...notification, open: true, notificationMessage: error.response.data.message,errorStatus:"error" })
            });
    }
    const Alert = React.forwardRef(function Alert(props, ref) {
        return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
    });
    const handleClose = () => {
        setnotification({ ...notification, open: false });
    };

    return (<>
        <div className="form-outline mb-4" >
            <TextField
                id="outlined-user-name-input"
                label="User Name"
                placeholder='Enter the User Name'
                inputProps={{ maxLength: 20 }}
                name="firstName"
                onChange={onChange}
                value={state.firstName}
                type="text"
                fullWidth
            />
        </div>
        {/* Email input  */}
        <div className="form-outline mb-4 ">
            <TextField
                id="outlined-mailid-input"
                label="Mail Id"
                type="text"
                name="email"
                onChange={onChange}
                placeholder='Enter the Mail Id'
                helperText={validationMsg.emailValidation}
                error={validationMsg.emailValidation != ""}
                value={state.email}
                fullWidth
            />
        </div>
        {/* <!-- Password input --> */}
        <div className="form-outline mb-4">
            <TextField
                id="outlined-password-input"
                label="Password "
                inputProps={{ maxLength: 50 }}
                placeholder='Enter the Password'
                onChange={onChange}
                type="password"
                name="password"
                helperText={validationMsg.passwordValidation}
                error={validationMsg.passwordValidation !== ""}
                value={state.password}
                fullWidth
            />
            {validationMsg.passwordValidation}
        </div>
        {/* <!-- Repeat Password input --> */}
        <div className="form-outline mb-4">
            <TextField
                id="outlined-confirm-password-input"
                label="Confirm Password "
                placeholder='Enter the Confirm Password'
                type="password"
                onChange={onChange}
                helperText={validationMsg.cpasswordValidation}
                error={validationMsg.cpasswordValidation != ""}
                value={state.cPassword}
                name="cPassword"
                fullWidth
            />
        </div>
        {/* <!-- Checkbox --> */}
        <div className="check " style={{ textAlign: "center" }} >
            <input className="check" type="checkbox"
                checked={state.termsCondition}
                onChange={onChange}
                name="termsCondition"
                disabled={
                    state.password !== state.cPassword ||
                    state.email.length === 0 ||
                    state.firstName.length === 0 ||
                    state.password.length === 0 ||
                    state.cPassword.length === 0 ||
                    validationMsg.emailValidation != "" ||
                    validationMsg.passwordValidation.length != 0 ||
                    validationMsg.cpasswordValidation != ""}
                id="registerCheck"
                aria-describedby="registerCheckHelpText" />
            <label className="form-check-label" for="registerCheck">
                I have read and agree to the terms
            </label>
        </div>

        {/* <!-- Submit button --> */}
        <div className="text-center pt-1 pb-1">
            <button disabled={
                state.email.length === 0 ||
                state.firstName.length === 0 ||
                state.password.length === 0 ||
                state.cPassword.length === 0 ||
                state.termsCondition === false ||
                state.password !== state.cPassword ||
                validationMsg.submitDisable
            } className="btn btn-primary btn-block mb-3" onClick={signUp}>create account</button>
        </div>
        <div>

            <Stack spacing={2} sx={{ width: '100%' }}>
                <Snackbar
                    anchorOrigin={{ vertical, horizontal }}
                    open={open}
                    autoHideDuration={6000}
                    onClose={handleClose}
                    key={vertical + horizontal}>
                    <Alert onClose={handleClose} severity={errorStatus} sx={{ width: '100%' }}>
                        {notificationMessage}
                    </Alert>
                </Snackbar>


            </Stack>
        </div>

    </>);
}

export default memo(Register);