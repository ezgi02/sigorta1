import React from "react" 
import Homepage from "./pages/HomePage";
import UserSignupPage from "./pages/UserSignUpPage";
import {Routes,Route,Redirect} from 'react-router-dom'
import TopBar from "./components/TopBar";
import KaskoHesaplama from "./pages/KaskoHesaplama";


function App() {
  return (
    <div>
      <TopBar/>
    <Routes>
    <Route exact path="/" element={<Homepage/>}/>
    <Route path="/signup" element={<UserSignupPage/>}/>
    <Route path="/kasko" element={<KaskoHesaplama/>}/>
  </Routes>
    </div>
    
  );
}

export default App;
