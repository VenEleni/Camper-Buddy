import React from 'react';
import './App.css';
import Home from './pages/Homepage'
import 'beercss/dist/cdn/beer.min.css';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
// import Navbar from './components/NavBar';
import LoginForm from './pages/Login'


function App() {
  return (
    <Router>
      <Routes>
        <Route path='/' element={<Home />}/>
        <Route path='/login' element={<LoginForm />}/>
      </Routes>
    </Router>
  );
}

export default App;
