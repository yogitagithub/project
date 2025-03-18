import React from 'react';
import {Routes, Route, Navigate} from 'react-router-dom';
import Register from "./pages/Register";
import Login from "./pages/Login";
import Home from "./pages/Home";

function App() {
 
  return (
    <div>

<Routes>
<Route path="/" element={<Navigate to="/register" />} />
              <Route path="/home" element={<Home />} />
      
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} /> 
    
     
      </Routes> 
    </div>
  )
}

export default App;




