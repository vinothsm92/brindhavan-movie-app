import logo from './logo.svg';
import './App.css';
import { NavLink } from 'react-router-dom';
import LogIn from './component/login page';
import Header from './component/header/header';
import './component/header/header.css';
import { Routes, Route } from 'react-router-dom';
import Register from './component/login page/register';
function App() {
  return (
    <div>
      <Header></Header>
      <Routes>
        <Route exact path="/" element={<LogIn />} />
        <Route path="/News" element={<Register />} />
      </Routes>
    </div>
  );
}

export default App;
