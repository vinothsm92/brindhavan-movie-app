import logo from './logo.svg';
import './App.css';
import { NavLink } from 'react-router-dom';
import LogIn from './component/login page';
import Header from './component/header/header';
import './component/header/header.css';
import { Routes, Route } from 'react-router-dom';
import Register from './component/login page/register';
import HomePage from './component/home page/homePage';
import React, { useState } from 'react';
import MovieName from './component/movies/movie';
import TicketBooking from './component/ticketBooking/ticketbooking';
import BookingHistory from './component/bookingHistory';
function App() {
  const [userName,setuserName]=useState(localStorage.getItem("user_name")?localStorage.getItem("user_name"):"")
  const sendUserName = (childData) =>{
    setuserName(childData)
}
  return (
    <div>
      <Header userName={userName}></Header>
      <div className='bgcolor'>
      <Routes>
        <Route exact path="/" element={<LogIn sendUserName={sendUserName}/>} />
        <Route path="/home" element={localStorage.getItem("user_name")?<HomePage />:<LogIn sendUserName={sendUserName}/>} />
        <Route exact path="/movie" element={localStorage.getItem("user_name")?<MovieName/>:<LogIn sendUserName={sendUserName} />}/>
        <Route exact path="/ticketbooking" element={localStorage.getItem("user_name")?<TicketBooking/>:<LogIn sendUserName={sendUserName} />}/>
        <Route exact path="/bookingHistory" element={localStorage.getItem("user_name")?<BookingHistory/>:<LogIn sendUserName={sendUserName} />}/>
      </Routes>
      </div>
    </div>
  );
}

export default App;
