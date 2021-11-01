import React from 'react'
import { useGlobalContext } from "../../../context";
import TeacherQuiz from "./TeacherQuiz";
import StudentQuiz from "./StudentQuiz";
import './quiz.css';

function Quizes({id}) {
    const { info } = useGlobalContext();
    let choice = <TeacherQuiz id={id} />;
    if (info.role === "Student") {
      choice = <StudentQuiz id={id}/>;
    }
    return (
      <div>
        {choice}
      </div>
    );
}

export default Quizes
