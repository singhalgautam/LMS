import React, { useState, useEffect} from "react";
import Axios from "axios";
import "./App.css";
import LandingPage from "./Components/Login/MainPage";
import SideMenu from "./Components/Sidebar/SideMenu";
import { MenuData } from "./Components/Sidebar/MenuData";
import { BrowserRouter as Router, Route } from "react-router-dom";

function App() {
  const [loginStatus, setLoginStatus] = useState(false);
  useEffect(() => {
    Axios.get("http://localhost:3002/userVerification").then((response) => {
      console.log(response);
      setLoginStatus(response.data.loggedIn);
      const info = {
        name: response.data.loggedIn
      };
    });
  }, []);

  const InsideLogin=()=>{
    const [inactive, setInactive] = useState(false);
    return (
        <Router>
          <SideMenu
            setLoginStatus={setLoginStatus}
            onCollapse={(inactive) => {
              setInactive(inactive);
            }}
          />

          <div className={`contain ${inactive ? "inactive" : ""}`}>
            {MenuData.map((menu) => (
                <Route key={menu.name} exact={menu.exact} path={menu.to}>
                  {menu.link}
                </Route>
            ))}
          </div>
        </Router>
      )
  }
  let showView = <LandingPage setLoginStatus={setLoginStatus} />;
  if(loginStatus) showView=<InsideLogin/>;
  return (
    <div>
      {showView}
    </div>
  );
}

export default App;
