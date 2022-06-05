import React from 'react';
import TextField from '@mui/material/TextField';
import { useEffect, useState } from 'react';
import message from '../../utils/messages';
import api from '../../utils/api.js';
import axios from 'axios';
import Snackbar from '@mui/material/Snackbar';
import MuiAlert from '@mui/material/Alert';
import Stack from '@mui/material/Stack';
import { useNavigate } from 'react-router-dom';
function Login(props) {
  const navigate = useNavigate();

  const [state, setState] = useState({
    "email": "",
    "password": ""
  });
  const [validation, setValidation] = useState({

    "emailValidation": "",
    "passwordValidation": ""
  })
  const [notification, setnotification] = React.useState({
    open: false,
    vertical: 'bottom',
    horizontal: 'center',
    notificationMessage: "",
    errorStatus: ""
  });
  const { vertical, horizontal, open, notificationMessage, errorStatus } = notification;
  useEffect(()=>{
    localStorage.removeItem("access_token");
    localStorage.removeItem("user_name");
  },[]) 


  const onChange = (e) => {
    debugger
    const { value, name } = e.target;
    if (name === "email") {
      if (/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(value)) {
        setValidation({ ...validation, emailValidation: "" })
      } else {
        setValidation({ ...validation, emailValidation: message.invalidEmail })
      }
      setState({ ...state, [name]: value })
    }
    if (name === "password") {
      setValidation({ ...validation, passwordValidation: "" })

    }
    setState({ ...state, [name]: value })
  }
  const onLogIn = (e) => {debugger
    e.preventDefault();
    axios.post(api.logIn, state)
      .then(response => {
        setState({

          "email": "",
          "password": ""
        })

        setValidation({ ...validation, submitDisable: false })
        setnotification({ ...notification, open: true, notificationMessage: response.data.message, errorStatus: "success" })
        localStorage.setItem("access_token", response.data.user.token);
      
        localStorage.setItem("user_name",response.data.user.firstName);
        props.sendUserName(response.data.user.firstName)

        navigate("/home");
        // <NavLink className="NavLink" to="/home"></NavLink>
      })
      .catch(error => {
        debugger
        setValidation({ ...validation, submitDisable: false })
        setnotification({ ...notification, open: true, notificationMessage: error.response.data.message, errorStatus: "error" })
      });
  }
  const Alert = React.forwardRef(function Alert(props, ref) {
    return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
  });
  const handleClose = () => {
    setnotification({ ...notification, open: false });
  };

  return (<>

    <p className="centerAlign">Please login to your account</p>

    <div className="form-outline mb-4">

      <TextField
        id="outlined-userName-input"
        label="Email-Id"
        placeholder='Enter the Email-Id'
        onChange={onChange}
        name="email"
        value={state.email}
        helperText={validation.emailValidation}
        error={validation.emailValidation !== ""}
        type="text"
        fullWidth
      />
    </div>
    <div className="form-outline mb-4">
      <TextField
        id="outlined-password-input"
        label="Password"
        placeholder='Enter the Password'
        type="password"
        onChange={onChange}
        name="password"
        helperText={validation.passwordValidation}
        error={validation.passwordValidation.length !== 0}
        value={state.password}
        fullWidth
      />
    </div>
    <div className="text-center pt-1 pb-1">
      <button className="btn btn-primary btn-block fa-lg gradient-custom-2 mb-3" type="button"
        disabled={
          state.email.length === 0 ||
          state.password.length === 0 ||
          validation.emailValidation !== "" ||
          validation.passwordValidation !== ""
        }
        onClick={onLogIn}
      >log in
        {/* <NavLink className="NavLink" to="/home">Log in</NavLink> */}
      </button>
      <a className="" href="#!">Forgot password?</a>
    </div>
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
  </>);
}

export default Login;