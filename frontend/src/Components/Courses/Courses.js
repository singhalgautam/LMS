import React from 'react'
import AddNewCourse from "./AddnewCourse";
import CourseList from "./CourseList";
import { useGlobalContext } from "../../context";

function Courses() {
  
  const {info} = useGlobalContext();
  let choice = <AddNewCourse />;
  if(info.role==='Student'){
    choice = <CourseList />;
  }

  return (
    <div className="dabba">
      <header>
        <h2>Courses</h2>
        <hr />
      </header>
      <main>{choice}</main>
    </div>
  );
}

export default Courses
