import React, { useState } from "react";
import front from "../../assets/frontPic.png";
import "./LoginPage.css";
import Login from "./Login";
import SignUp from "./SignUp";

export default function MainPage({setLoginStatus}) {
  const [login, setLogin] = useState(true);
  const [message, setMessage] = useState("Don't you have an account?");
  const [option, setOption] = useState("SIGN UP");
  const optionHandler = () => {
    if (!login) {
      setMessage("Don't you have an account?");
      setLogin(true);
      setOption("SIGN UP");
    } else {
      setMessage("Already have an account?");
      setLogin(false);
      setOption("LOGIN");
    }
  };
  let showOption = <SignUp />;
  if (login) {
    showOption = <Login setLoginStatus={setLoginStatus}/>;
  }
  return (
    <div className="main-box">
      <div>
        <img src={front} alt="LandingImage" className="landingImg" />
      </div>
      <div className="signLogin">
        <div className="ask">
          <p>{message}</p>
          <button className="opt-btn" onClick={optionHandler}>
            {option}
          </button>
        </div>
        {showOption}
      </div>
    </div>
  );
}
