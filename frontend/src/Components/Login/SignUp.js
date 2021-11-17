import React, { useState } from "react";
// import gmail from "../../assets/gmail.png";
import Axios from "axios";
// import { GoogleLogin } from "react-google-login";
const SignUp = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [roleStudent, setRoleStudent] = useState(true);

  Axios.defaults.withCredentials = true;

  const handleReg = (e) => {
    e.preventDefault();
    if (email && password && name) {
      let obj = { name: name, email: email, password: password };
      if (roleStudent) {
        obj = { ...obj, role: "Student" };
      } else {
        obj = { ...obj, role: "Teacher" };
      }
      Axios.post("http://localhost:3002/userReg", obj)
        .then((res) => {
          console.log(res);
          alert(
            `You are succesfuly registered as ${
              roleStudent === true ? "student" : "teacher"
            }`
          );
        })
        .catch((err) => {
          alert('email is already registered');
          console.log(err);
        });
    } else {
      alert("All feilds are mandatory!!");
    }
  };
  // const onSignupSuccess = (googleData) => {
  //   Axios.post("http://localhost:3002/api/v1/auth/google", {
  //     token: googleData.tokenId,
  //     role: roleStudent === true ? "Student" : "Teacher",
  //   }).then((response) => {
  //     console.log(response);
  //     alert(
  //       `You are succesfuly registered as ${
  //         roleStudent === true ? "student" : "teacher"
  //       }`
  //     );
  //   });
  // };
  // const onSignupFailure=(res)=>{
  //   console.log("Oops! Regestration Failed:", res);
  // }
  return (
    <main className="form-box">
      <h2>Join Now !</h2>
      <p>Create a new account</p>
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
      <form className="form" onSubmit={handleReg}>
        <label htmlFor="name">Name</label>
        <input
          type="text"
          id="name"
          name="name"
          placeholder="Your name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
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
          autoComplete="off"
          placeholder="Your password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <a className="forgotPass" href="/">
          Forgot password?
        </a>
        <button className="opt-val-btn" type="submit">
          Sign Up
        </button>

        <hr />
        {/* <div className="gmail">
          <GoogleLogin
            clientId="552682266934-gqdhnqb14ksoib7tdl4c1716rs2ija5s.apps.googleusercontent.com"
            buttonText="Sign up"
            onSuccess={onSignupSuccess}
            onFailure={onSignupFailure}
            cookiePolicy={"single_host_origin"}
          />
        </div> */}
      </form>
    </main>
  );
};
export default SignUp;
