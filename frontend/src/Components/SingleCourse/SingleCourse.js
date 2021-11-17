import React, { useState} from "react";
import { Link,useParams, useLocation } from "react-router-dom";
import Announcement from './Announcement/Announcement';
import Assignment from './Assignment/Assignment';
import File from './File/File';
import Quizes from './Quizes/Quizes';

function SingleCourse() {
    const {id}=useParams();
    // const location=useLocation();
    // const {name,courseName}=location.state;
    // console.log(location.state);
    const choice = [
      <Announcement id={id} />,
      <Assignment id={id} />,
      <Quizes id={id} />,
      <File id={id} />,
    ];
    const [opt, setOpt] = useState(0);
    return (
      <main>
        {/* <div className="currentCourseAllInfo">
          <Link to="/">
            <div className="heading">
              {name.length >= 20
                ? name.slice(0, 20) + "..."
                : name}
            </div>
            <h4>
              {courseName.length >= 20
                ? courseName.slice(0, 20) + "..."
                : courseName}
            </h4>
          </Link>
        </div> */}
        <header className="nav-selection">
          <button
            className={`role-btn ${opt === 0 && "active-btn"}`}
            onClick={() => setOpt(0)}
          >
            Announcement
          </button>
          <button
            className={`role-btn ${opt === 1 && "active-btn"}`}
            onClick={() => setOpt(1)}
          >
            Assignment
          </button>
          <button
            className={`role-btn ${opt === 2 && "active-btn"}`}
            onClick={() => setOpt(2)}
          >
            Quizes
          </button>
          <button
            className={`role-btn ${opt === 3 && "active-btn"}`}
            onClick={() => setOpt(3)}
          >
            File
          </button>
          <hr />
        </header>
        <div className="choice">{choice[opt]}</div>
        {/* <div className="courseName">
          {name}
          <h1>dfhgfds</h1>
        </div> */}
      </main>
    );
}

export default SingleCourse
