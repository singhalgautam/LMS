import React, { useEffect, useState } from "react";
import Axios from "axios";
import { Link } from "react-router-dom";

function StudentQuiz({ id }) {
  const [quizList, setQuizList] = useState([]);

  useEffect(() => {
    
    Axios.post("http://localhost:3002/getAllQuizes", { id }).then((res) => {
      setQuizList(res.data.reverse());
    });
  }, [id, quizList]);

  return (
    <div className="quiz">
      <div className="showQuiz">
        <div className="heading">Attempt a new Quizes</div>
        {quizList.map((quiz) => {
          return <SingleQuiz key={quiz.quizId} {...quiz} />;
        })}
      </div>
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
}) => {
  return (
    <div className="ques-container">
      <h3>{title}</h3>
      {/* <p>{instruction}</p> */}
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
      </button>
    </div>
  );
};
export default StudentQuiz;
