import React, { useEffect, useState } from "react";
import Axios from "axios";
import { Link } from "react-router-dom";
import Loading from "../../../Loading";
import { useGlobalContext } from "../../../context";
import quizImg from "../../../assets/quiz.png";

function StudentQuiz({ id }) {
  const {info}=useGlobalContext();
  const [loading1, setLoading1] = useState(true);
  const [loading2, setLoading2] = useState(true);
  const [unattemptedQuizList, setUnattemptedQuizList] = useState([]);
  const [attemptedQuizList, setAttemptedQuizList] = useState([]);

  useEffect(() => {
    setLoading1(true);
    Axios.post("http://localhost:3002/getAttemptedQuizes", {
      id,
      studentId: info.id,
    }).then((res) => {
      console.log(res.data[0]);
      setAttemptedQuizList(res.data[0].reverse());
      setLoading1(false);
    });
    setLoading2(true);
    Axios.post("http://localhost:3002/getUnattemptedQuizes", {
      id,
      studentId: info.id,
    }).then((res) => {
      console.log(res.data[0]);
      setUnattemptedQuizList(res.data[0].reverse());
      setLoading2(false);
    });
  }, []);
  
  if(loading1 && loading2){
    return <Loading/>
  }
  return (
    <div className="quiz">
      {attemptedQuizList.length === 0 && unattemptedQuizList.length === 0 && (
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
      {attemptedQuizList.length !== 0 && (
        <div className="showQuiz">
          <div className="heading">Attempted Quizes</div>
          {attemptedQuizList.map((quiz) => {
            return <SingleQuiz key={quiz.quizId} {...quiz} flag={true} />;
          })}
        </div>
      )}
      {unattemptedQuizList.length !== 0 && (
        <div className="showQuiz">
          <div className="heading">Attempt a new Quizes</div>
          {unattemptedQuizList.map((quiz) => {
            return <SingleQuiz key={quiz.quizId} {...quiz} flag={false} />;
          })}
        </div>
      )}
    </div>
  );
};

const SingleQuiz = ({
  quizId,
  courseId,
  title,
  topic,
  instruction,
  duration,
  totalQues,
  totalMarks,
  flag,
  studentId,
  score
}) => {
  return (
    <div className="ques-container">
      <h3>{title}</h3>
      {/* <p>{instruction}</p> */}
      <h4>Duration : {duration}</h4>
      <h4>Topic: {topic}</h4>
      {flag && <h4>Your score : {score}/{totalMarks}</h4>}
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
        {!flag && (
          <Link
            className="link-btn"
            to={{
              pathname: `/courses/${courseId}/quizAttempt/${quizId}`,
              state: {
                title: title,
                topic: topic,
                instruction: instruction,
                duration: duration,
                totalMarks,
                totalQues,
              },
            }}
          >
            Attempt
          </Link>
        )}
        {flag && (
          <Link
            className="link-btn"
            to={{
              pathname: `/courses/${courseId}/quizAttempt/${quizId}/viewScore/${studentId}`,
            }}
          >
            Veiw Result
          </Link>
        )}
      </button>
    </div>
  );
};
export default StudentQuiz;
