import React, { useState, useEffect } from "react";
import Axios from "axios";
import "./App.css";
import LandingPage from "./Components/Login/MainPage";
import SideMenu from "./Components/Sidebar/SideMenu";
import { MenuData } from "./Components/Sidebar/MenuData";
import { BrowserRouter as Router, Route } from "react-router-dom";
import SingleCourse from "./Components/SingleCourse/SingleCourse";
import CreateQuiz from "./Components/SingleCourse/Quizes/CreateQuiz";
import ManageQuiz from "./Components/SingleCourse/Quizes/ManageQuiz";
import EditQuestion from "./Components/SingleCourse/Quizes/EditQuestion";
import AttemptQuiz from "./Components/SingleCourse/Quizes/AttemptQuiz";
import ViewScore from "./Components/SingleCourse/Quizes/ViewScore";
function App() {
  const [loginStatus, setLoginStatus] = useState(true);
  // useEffect(() => {
  //   Axios.get("http://localhost:3002/userVerification").then((response) => {
  //     console.log(response);
  //     setLoginStatus(response.data.loggedIn);
  //   });
  // }, []);

  const InsideLogin = () => {
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
          <Route exact path="/courses/:id">
            <SingleCourse />
          </Route>
          <Route exact path="/courses/:id/quiz">
            <CreateQuiz />
          </Route>
          <Route exact path="/courses/:id/quiz/:quizId/">
            <ManageQuiz />
          </Route>
          <Route exact path="/courses/:id/quiz/:quizId/:questionId">
            <EditQuestion />
          </Route>
          <Route exact path="/courses/:id/quizAttempt/:quizId">
            <AttemptQuiz />
          </Route>
          <Route exact path="/courses/:id/quizAttempt/:quizId/viewScore/:studentId">
            <ViewScore />
          </Route>
        </div>
      </Router>
    );
  };
  let showView = <LandingPage setLoginStatus={setLoginStatus} />;
  if (loginStatus) showView = <InsideLogin />;
  return <div>{showView}</div>;
}

export default App;
