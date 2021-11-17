import React, { useState } from "react";
// import gmail from "../../assets/gmail.png";
import Axios from "axios";
// import {GoogleLogin} from "react-google-login";

const Login = ({ setLoginStatus }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [roleStudent, setRoleStudent] = useState(true);
  Axios.defaults.withCredentials = true;

  const handleLogin = (e) => {
    e.preventDefault();
    if (email && password) {
      let obj = { email, password };
      if (roleStudent) {
        obj = { ...obj, role: "Student" };
      } else {
        obj = { ...obj, role: "Teacher" };
      }
      Axios.post("http://localhost:3002/userVerification", obj)
        .then((response) => {
          console.log(response.data);
          if(response.data.auth){
            const infoObj = {
              token: response.data.token,
              id: response.data.id,
              name: response.data.name,
              email: response.data.email,
              role: response.data.role,
            };
            localStorage.setItem("info", JSON.stringify(infoObj));
            setLoginStatus(response.data.auth);
          }
          else{
            alert("Wrong email or password or check your role!!")
          }
        })
        .catch((err) => {
          console.log(err);
        });
    } else {
      alert("Enter both email and password!!");
    }
  };
  // const onLoginSuccess = (googleData) => {
  //   Axios.post("http://localhost:3002/api/v1/auth/google/verify", {
  //     token: googleData.tokenId,
  //     role: roleStudent === true ? "Student" : "Teacher",
  //   })
  //     .then((response) => {
  //       console.log("Login Success99:", response);
  //       const infoObj = {
  //         token: response.data.token,
  //         id:response.data.id,
  //         name: response.data.name,
  //         email: response.data.email,
  //         role:response.data.role,
  //       };
  //       localStorage.setItem("info", JSON.stringify(infoObj));
  //       setLoginStatus(true);
  //     })
  //     .catch((err) => {
  //       alert("user does'nt exist, Please register!");
  //       console.log(err);
  //     });
   
  //   // store returned user somehow
  // };

  // const onLoginSuccess = (res) => {
  //   console.log("Login Success:", res.profileObj);
  //   const infoObj = {
  //     token: res.profileObj.googleId,
  //     name: res.profileObj.name,
  //     email: res.profileObj.email,
  //   };
  //   localStorage.setItem("info", JSON.stringify(infoObj));
  //   setLoginStatus(true);
  // };
  const onLoginFailure = (res) => {
    console.log("Login Failed:", res);
  };
  return (
    <main className="form-box">
      <h2>Welcome Back !</h2>
      <p>Login your account</p>
      <div className="role">
        <div>I'm</div>
        <button
          className={`role-btn ${roleStudent && "active-btn"}`}
          onClick={() => setRoleStudent(!roleStudent)}
        >
          Student
        </button>
        <button
          className={`role-btn ${!roleStudent && "active-btn"}`}
          onClick={() => setRoleStudent(!roleStudent)}
        >
          Teacher
        </button>
      </div>
      <form className="form" onSubmit={handleLogin}>
        <label htmlFor="email">Email</label>
        <input
          type="email"
          id="email"
          name="email"
          placeholder="Your email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <label htmlFor="password">Password</label>
        <input
          type="password"
          id="password"
          name="password"
          autoComplete="on"
          placeholder="Your password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <a className="forgotPass" href="/">
          Forgot password?
        </a>
        <button className="opt-val-btn" type="submit">
          Login
        </button>
        <hr className="hr-login" />
        {/* <div className="gmail">
          <GoogleLogin
            clientId="552682266934-gqdhnqb14ksoib7tdl4c1716rs2ija5s.apps.googleusercontent.com"
            buttonText="Login"
            onSuccess={onLoginSuccess}
            onFailure={onLoginFailure}
            cookiePolicy={"single_host_origin"}
            // isSignedIn={true}
          />
        </div> */}
      </form>
    </main>
  );
};

export default Login;
