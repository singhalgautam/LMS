import React, { useState } from "react";
import gmail from "../../assets/gmail.png";
import Axios from "axios";

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
          const infoObj = {
            token: response.data.token,
            name: response.data.name,
            email: response.data.email,
          };
          localStorage.setItem('info',JSON.stringify(infoObj));
          setLoginStatus(response.data.auth);
        })
        .catch((err) => {
          console.log(err);
        });
    } else {
      alert("Enter both username and password!!");
    }
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
        <hr />
        <div className="gmail">
          <p>Login with </p>
          <img className="gmail-logo" src={gmail} alt="gmail-logo" />
        </div>
      </form>
    </main>
  );
};

export default Login;