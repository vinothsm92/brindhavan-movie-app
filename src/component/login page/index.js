import React, { useState } from "react";
import "./login.css";
import logo from '../../assets/images/lotus.webp';
import Login from "./login";
import Register from "./register";
function LogIn(props) {
  const [isLogin, setisLogin] = useState(true);
  const RegisterPage = () => {
    setisLogin(!isLogin)
  }

  return (<div>
    <section className={isLogin ? "content-min-height  gradient-form" :"content-height gradient-form" }style={{ backgroundColor: '#eee' }}>
      <div className="container py-5 h-100">
        <div className="row d-flex justify-content-center align-items-center h-100">
          <div className="col-xl-10">
            <div className="card rounded-3 text-black">
              <div className="row g-0">
                <div className="col-lg-6">
                  <div className="card-body p-md-5 mx-md-4">

                    <div className="text-center">
                      <img src={logo}
                        style={{ width: '185px' }} alt="logo"></img>
                      <h4 className="mt-1 mb-5 pb-1">BRINDHAVAN THEATRE</h4>
                    </div>

                    <form>
                      {isLogin ? <Login sendUserName={props.sendUserName}></Login> : <Register></Register>}

                      <div className="d-flex align-items-center justify-content-center pb-4">
                        <p className="mb-0 me-2">{isLogin ? "Don't have an account?" : "Back to"}</p>
                        <button type="button" className="btn btn-outline-danger" onClick={RegisterPage} >{isLogin ? "Sign up" : "login"}</button>
                      </div>

                    </form>

                  </div>
                </div>
                <div className="col-lg-6 d-flex align-items-center gradient-custom-2">
                  <div className="text-white px-3 py-4 p-md-5 mx-md-4">
                    <h4 className="mb-4">We are more than just a company</h4>
                    <p className="small mb-0">Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod
                      tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud
                      exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
                      
                      </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

  </div>);
}

export default LogIn;