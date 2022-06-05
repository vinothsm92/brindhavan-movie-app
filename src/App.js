import logo from './logo.svg';
import './App.css';
import { NavLink } from 'react-router-dom';
import LogIn from './component/login page';
import Header from './component/header/header';
import './component/header/header.css';
import { Routes, Route } from 'react-router-dom';
import Register from './component/login page/register';
import HomePage from './component/home page/homePage';
import { useState } from 'react';
function App() {
  const [userName,setuserName]=useState(localStorage.getItem("user_name")?localStorage.getItem("user_name"):"")
  const sendUserName = (childData) =>{
    setuserName(childData)
}
  return (
    <div>
      <Header userName={userName}></Header>
      <Routes>
        <Route exact path="/" element={<LogIn sendUserName={sendUserName}/>} />
        <Route path="/home" element={localStorage.getItem("user_name")?<HomePage />:<LogIn sendUserName={sendUserName}/>} />
      </Routes>
    </div>
  );
}

export default App;
