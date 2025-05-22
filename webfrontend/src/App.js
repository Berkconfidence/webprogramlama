import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Login from './Components/Login/login';
import SignUp from './Components/Signup/signup';
import Home from './Components/Home/home';

function App() {
  return (
    <div className="App">
      <BrowserRouter>
            <Routes>
              <Route exact path='/login' Component={Login}></Route>
              <Route exact path='/signup' Component={SignUp}></Route>
              <Route exact path='/home' Component={Home}></Route>
            </Routes>
       </BrowserRouter>
    </div>
  );
}

export default App;
