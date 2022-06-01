import React from 'react';
import TextField from '@mui/material/TextField';
import { useEffect, useState } from 'react';
import "./login.css";
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
         "termsCondition": true
    });
    const [validationMsg,setValidationMsg] = useState({
        "cpasswordValidation":"",
        "emailValidation":"",
        "passwordValidation":""
    });

    // const [checked,setChecked] =useState(true);
    // const handleChange = (e) => {
    //     setChecked(!checked);
    //   };
    const onChange = (event) => {debugger
        const { name, value} = event.target;
        // const isEnabled = name.length > 0 && value.length > 0;
        if (name === "firstName") {
            var fName = value.replace(/[^\w\s]/gi, "")
            setState({ ...state, [name]: fName, createdBy: fName, updatedBy: fName });
        }
        if (name === "email") {
            if (/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(value)) {
                setValidationMsg({...validationMsg,emailValidation:""})
            } else { 
                setValidationMsg({...validationMsg,emailValidation:"Invalid E-mail"})

            }
            setState({ ...state, [name]: value })
        }
        if (name === "password") {debugger
            var pword=value
            if(pword.length<5){
                setValidationMsg({...validationMsg,passwordValidation:"Password should be Minimum 5 character"})
            } 
            else{
                setValidationMsg({...validationMsg,passwordValidation:""})
            }

            setState({ ...state, [name]: pword }) 
            if(state.cPassword.length>1){
                if (pword!=state.cpassword){
                    setValidationMsg({...validationMsg,cpasswordValidation:"password do not match"})
                }
            }
        
        }
        if (name === "cPassword") {debugger

            if (value !== state.password) {
                setValidationMsg({...validationMsg,cpasswordValidation:"password does not Match"})
            } else {
                setValidationMsg({...validationMsg,cpasswordValidation:""})
            }
            setState({ ...state, [name]: value })
        }
        if(name==="termsCondition"){debugger
            setState({...state,[name]:!state.termsCondition})
            
        }
        // if(state.password!=state.cpassword){
        //     alert("invalid passwrod")
        // }
        // setState({ ...state, [name]: value });
       

    }
    //    const onChangeUserName=(e)=>{
    //     setuserNameValue(e.target.value);
    //    }
    //    const mailidValue=(m)=>{
    //     setmailid(m.target.value)
    //    }
    //    const passValue=(p)=>{
    //     setpass(p.target.value)
    //    }
    //    const cpassValue=(cp)=>{
    //     setcpass(cp.target.value)
    //    }
    const signUp = (e) => {
        e.preventDefault();
        //    var op = {
        //        "firstName": userNameValue,
        //        "lastName": " ",
        //        "password": pass,
        //        "role": "User",
        //        "createdBy": userNameValue,
        //        "updatedBy": userNameValue
        //    }
        alert(JSON.stringify(state))
    }
    return (<>
        {/* <Child onChangeUserName={userNameValue}></Child> */}
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
                error={validationMsg.emailValidation!=""}
                value={state.email}
                fullWidth
            />
        </div>
        {/* <!-- Password input --> */}
        <div className="form-outline mb-4">
            <TextField
                id="outlined-password-input"
                label="Password "
                inputProps={{ maxLength: 50}}
                placeholder='Enter the Password'
                onChange={onChange}
                type="password"
                name="password"
                helperText={validationMsg.passwordValidation}
                error={validationMsg.passwordValidation.length !=0}
                value={state.password}
                fullWidth
            />
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
                error={validationMsg.cpasswordValidation !=""}
                value={state.cPassword}
                name="cPassword"
                fullWidth
            />
        </div>
        {/* <!-- Checkbox --> */}
        <div className="check " style={{ textAlign: "center" }} >
            <input className="check" type="checkbox"
             value={state.termsCondition}
             onChange={onChange}
             name="termsCondition"
             disabled={
                state.password !== state.cPassword||
                state.email.length ===0 ||
                state.firstName.length===0 ||
                state.password.length ===0 ||
                state.cPassword.length ===0||
                validationMsg.emailValidation!=""  ||
                validationMsg.passwordValidation.length !=0||
                validationMsg.cpasswordValidation !="" }  
                id="registerCheck"
                aria-describedby="registerCheckHelpText" />
            <label className="form-check-label" for="registerCheck">
                I have read and agree to the terms
            </label>
        </div>
        {/* <!-- Submit button --> */}
        <div className="text-center pt-1 pb-1">
            <button disabled={
                state.email.length ===0 ||
                state.firstName.length===0 ||
                state.password.length ===0 ||
                state.cPassword.length ===0 ||
                state.termsCondition===true||
                state.password !== state.cPassword
               } className="btn btn-primary btn-block mb-3" onClick={signUp}>create account</button>
        </div>
    </>);
}

export default Register;