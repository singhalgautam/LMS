import React from 'react'
import { useGlobalContext } from "../../../context";
import TeacherAssignment from "./TeacherAssignment";
import StudentAssignment from "./StudentAssignment";
import './assignment.css';
function Assignment({id}) {
    const { info } = useGlobalContext();
    let choice = <TeacherAssignment id={id} />;
    if (info.role === "Student") {
      choice = <StudentAssignment id={id} />;
    }
    return (
        <div>
           {choice}
        </div>
    )
}

export default Assignment
