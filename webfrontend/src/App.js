import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Login from './Components/Login/login';
import SignUp from './Components/Signup/signup';

function App() {
  return (
    <div className="App">
      <BrowserRouter>
            <Routes>
              <Route exact path='/login' Component={Login}></Route>
              <Route exact path='/signup' Component={SignUp}></Route>
              <Route exact path='/admin/makaleler/:articleTrackingNumber'></Route>
            </Routes>
       </BrowserRouter>
    </div>
  );
}

export default App;
