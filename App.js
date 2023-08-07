import React, { useState } from "react" 

import UserSignupPage from "./pages/UserSignUpPage";
import {Routes,Route,Redirect} from 'react-router-dom'
import TopBar from "./components/TopBar";
import KaskoHesaplama from "./pages/KaskoHesaplama";
import TrafficInsurance from "./pages/TrafficInsurance";
import Sigorta from "./pages/Sigorta";
import Anasayfa from "./pages/Anasayfa";
import UserListPage from "./pages/UserListPage";
 /* <Route path={`/users/${userId}/trafik`} element={<TrafficInsurance userId={userId} />} /> */
function App() {
  const [userId, setUserId] = useState(null)
  return (
    <div>
      <TopBar/>
    <Routes>
    
    <Route path="/signup" element={<UserSignupPage/>}/>
    <Route path="/kasko" element={<KaskoHesaplama/>}/>
    <Route path="/anasayfa" element={<Anasayfa/>} />
    <Route
          path={`/users/:userId/sigorta/trafik`}
          element={<TrafficInsurance userId={userId} />}
        />
       
    <Route path="/users/:userId/sigorta" element={<Sigorta userId={userId}/>}/>
    <Route
          path="/userList"
          element={<UserListPage setUserId={setUserId} />}
        />
    
  </Routes>
    </div>
    
  );
}

export default App;
