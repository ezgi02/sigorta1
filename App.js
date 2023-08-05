import React from "react" 

import UserSignupPage from "./pages/UserSignUpPage";
import {Routes,Route,Redirect} from 'react-router-dom'
import TopBar from "./components/TopBar";
import KaskoHesaplama from "./pages/KaskoHesaplama";
import TrafficInsurance from "./pages/TrafficInsurance";

import Anasayfa from "./pages/Anasayfa";

function App() {
  return (
    <div>
      <TopBar/>
    <Routes>
    
    <Route path="/signup" element={<UserSignupPage/>}/>
    <Route path="/kasko" element={<KaskoHesaplama/>}/>
    <Route path="/trafik"  element={<TrafficInsurance/>}/> 
    <Route path="/anasayfa" element={<Anasayfa/>} />
  </Routes>
    </div>
    
  );
}

export default App;
