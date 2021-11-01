import React from 'react'
import { useGlobalContext } from "../../../context";
import TeacherFile from "./TeacherFile";
import StudentFile from "./StudentFile";
import "./file.css";
function File({id}) {
  const { info } = useGlobalContext();
  let choice = <TeacherFile id={id}/>;
  if (info.role === "Student") {
    choice = <StudentFile id={id} />;
  }
    return (
      <div>
        {choice}
      </div>
    );
}

export default File
