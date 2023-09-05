import React, { useState } from "react" 

import UserSignupPage from "./pages/UserSignUpPage";
import {Routes,Route,Redirect} from 'react-router-dom'
import TopBar from "./components/TopBar";
import KaskoHesaplama from "./pages/KaskoHesaplama";
import TrafficInsurance from "./pages/TrafficInsurance";
import Sigorta from "./pages/Sigorta";
import Anasayfa from "./pages/Anasayfa";
import UserListPage from "./pages/UserListPage";
import EditUserPage from "./pages/EditUserPage";
import TrafficInsuranceTable from "./list/TrafficInsuranceTable";
import Dask from "./pages/Dask";
import DaskList from "./list/DaskList";
import InsuranceList from "./list/InsuranceList";
import { ToastContainer } from 'react-toastify';

 /* <Route path={`/users/${userId}/trafik`} element={<TrafficInsurance userId={userId} />} /> */
function App() {
  const [userId, setUserId] = useState(null)
  return (
    <div>
      <TopBar/>
    <Routes>
    <Route path="/trafficList" element={<TrafficInsuranceTable/>}/>
    <Route path="/insuranceList" element={<InsuranceList/>}/>
    <Route path="/daskList" element={<DaskList/>}></Route>
    <Route path="/signup" element={<UserSignupPage  />}/>
    <Route path="/users/:userId/sigorta/kasko" element={<KaskoHesaplama userId={userId}/>}/>
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
    <Route path="/users/:userId/edit" element={<EditUserPage userId={userId}/>}/>
    <Route path="/users/:userId/sigorta/dask" element={<Dask userId={userId}/>} />
  </Routes>
  <ToastContainer position="top-right" autoClose={3000} />
    </div>
    
  );
}

export default App;
