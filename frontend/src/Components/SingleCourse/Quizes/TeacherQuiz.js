import React, { useEffect, useState } from "react";
import Axios from "axios";
import { Link } from "react-router-dom";
import quizImg from "../../../assets/quiz.png";

function TeacherQuiz({id}) {
  const [quizList,setQuizList]=useState([]);

  useEffect(() => {
    Axios.post("http://localhost:3002/getAllQuizes", { id }).then((res) => {
      setQuizList(res.data.reverse());
    });
  }, [id, quizList]);

  
    return (
      <div className="quiz">
        <div className="enroll">
          <button className="btn btn-quiz">
            <Link to={`/courses/${id}/quiz`} className="link-btn">
              <i className="bi bi-plus-lg"></i>Add Quiz
            </Link>
          </button>
        </div>

        <div className="showQuiz">
          {quizList.length===0 &&(
        <div className="no-item">
          <h2>No quizes has been posted </h2>
          <div>
            <img
              style={{ height: "65vh", width: "40vw" }}
              src={quizImg}
              alt="quizphoto"
            />
          </div>
        </div>
      )}
          {quizList.length!==0 && <div className="heading">Previous Quizes</div>}
          {quizList.map((quiz)=>{
            return <SingleQuiz key={quiz.quizId} {...quiz}/>
          })}
        </div>
      </div>
    );
}
const SingleQuiz = ({ quizId,courseId, title, topic, instruction, duration, totalQues,totalMarks }) => {
  const handleDelete = () => {
    Axios.post("http://localhost:3002/deleteQuiz", { quizId }).then((res)=>{
      alert('deleted successfuly');
    });
  };
  return (
    <div className="ques-container">
      <h3>{title}</h3>
      <p>{instruction}</p>
      <h4>Duration : {duration}</h4>
      <h4>Topic: {topic}</h4>
      <div className="quiz-stats">
        <div>
          <h5>Total questions</h5>
          <h4>{totalQues}</h4>
        </div>
        <div>
          <h5>Total Marks</h5>
          <h4>{totalMarks}</h4>
        </div>
      </div>
      <button className="btn btn-edit" style={{ marginTop: "0.5em" }}>
        <Link to={`/courses/${courseId}/quiz/${quizId}`} className="link-btn">
          Edit
        </Link>
      </button>
      <i
        className="bi bi-trash del-quiz"
        onClick={handleDelete}
      ></i>
    </div>
  );
};
export default TeacherQuiz
