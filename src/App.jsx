import React from 'react';
import { Routes, Route } from "react-router-dom"
import HomePage from "./page/HomePage"
import LogInPage from './page/LogInPage';
import RegisterPage from "./page/RegisterPage"
import Aboutus from './components/DashBord/AboutUs/Aboutus';
import WithDrawPage from './page/WithDrawPage';
import DepositPage from './page/DepositPage';
import ContactUpPage from './page/ContactUpPage';
import DashBordPage from './page/DashBordPage';
import "./App.css"

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={ <HomePage /> } />
        <Route path="/contactus" element={ <ContactUpPage /> } />
        <Route path="/profile" element={ <Aboutus /> } />
        <Route path="/deposit" element={ <DepositPage /> } />
        <Route path="/withdraw" element={ <WithDrawPage /> } />
        <Route path="/login" element={ <LogInPage /> } />
        <Route path="/register" element={ <RegisterPage /> } />
        <Route path="/D/u" element={ <DashBordPage /> } />
      </Routes>
    </>
  )
}

export default App