import React from 'react';
import TextField from '@mui/material/TextField';
import { useEffect, useState } from 'react';
function Login() {
  const [state, setState] = useState({
    "email": "",
    "password": ""
  });
  const [validation, setValidation] = useState({

    "emailValidation": "",
    "passwordValidation": ""
  })

  const onChange = (e) => {debugger
    const { value, name } = e.target;
    if (name === "email") {
      if (/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(value)) {
        setValidation({ ...validation, emailValidation: "" })
      } else {
        setValidation({ ...validation, emailValidation: "Invalid E-mail" })
      }
      setState({ ...state, [name]: value })
    }
    if (name === "password") {
      setValidation({ ...validation, passwordValidation: "" })

    }
    setState({ ...state,[name]:value })
  }
  const onLogIn=(e)=>{
  alert(JSON.stringify(state))
  }

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
        error={validation.emailValidation != ""}
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
        error={validation.passwordValidation.length != 0}
        value={state.password}
        fullWidth
      />
    </div>
    <div className="text-center pt-1 pb-1">
      <button className="btn btn-primary btn-block fa-lg gradient-custom-2 mb-3" type="button"
        disabled={
          state.email.length ===0 ||
          state.password.length ===0 ||
          validation.emailValidation != "" ||
          validation.passwordValidation != ""
        }
        onClick={onLogIn}>Log in</button>
      <a className="" href="#!">Forgot password?</a>
    </div>
  </>);
}

export default Login;