import React from 'react'
import { useGlobalContext } from "../../../context";
import TeacherAssignment from "./TeacherAssignment";
import StudentAssignment from "./StudentAssignment";
import './assignment.css';
function Assignment() {
    const { info } = useGlobalContext();
    let choice = <TeacherAssignment />;
    if (info.role === "Student") {
      choice = <StudentAssignment />;
    }
    return (
        <div>
           <h3>assignment</h3> 
           {choice}
        </div>
    )
}

export default Assignment
