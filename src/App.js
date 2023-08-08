/* eslint-disable react/jsx-no-undef */
import './App.css';
import React from 'react';
// import { BrowserRouter, Routes, Route } from 'react-router-dom';

import RegistrationForm from './views/RegistrationForm';
// import Form from './views/Form';
// import Login from './views/login';

function App() {
  return (
    // <BrowserRouter>
    //   <Routes>
    //     <Route path="/RegistrationForm" element={<RegistrationForm />} />
    //     {/* <Route path="/login" element={<Login />} /> */}
    //     {/* Define other routes as needed */}
    //   </Routes>
    // </BrowserRouter>
    <div className='App'>
      <RegistrationForm/>
    </div>
  );
}

export default App;
