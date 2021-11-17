import React, { useState, useEffect } from "react";
import { useParams} from "react-router-dom";
import Loading from "../../../Loading";
import Axios from "axios";

function ViewScore() {
  const { id, quizId, studentId } = useParams();
  const [loading,setLoading]=useState(true);
  const [responseList,setResponseList]=useState([]);
  const [quizStat,setQuizStat]=useState({});
  useEffect(()=>{
    setLoading(true);
    Axios.post("http://localhost:3002/getScoreAndResponse", {
      studentId,
      quizId,
    })
      .then((res) => {
        console.log(res.data[0]);
        setResponseList(res.data[0]);
      })
      .catch((err) => {
        alert(err);;
      });
    Axios.post("http://localhost:3002/getGrade", { studentId, quizId }).then(
      (res) => {
        console.log(res.data[0][0]);
        setQuizStat(res.data[0][0]);
        setLoading(false);
      }
    ).catch((err)=>{
      alert(err);
      setLoading(false);
    });
  },[quizId, studentId]);

  if(loading){
    return <Loading/>
  }
  
  return (
    <div>
      <h3>{quizStat.title}</h3>
      <h4>Duration : {quizStat.duration}</h4>
      <h4>Topic: {quizStat.topic}</h4>
      <hr />
      <h3>
        Your score : {quizStat.score}/{quizStat.totalMarks}
      </h3>
      <br/>
      {
        responseList.map((responseVal,index)=>{
          return (<Answer key={responseVal.questionId}{...responseVal} num={index} />);
        })
      }
    </div>
  );
}

const Answer = ({
  num,
  answer,
  response,
  marks,
  questionId,
  questionName,
  maxScore,
  penaltyScore,
  opt1,
  opt2,
  opt3,
  opt4,
}) => {
  
  return (
    <main>
      <div className="ques-box">
        <div className="ques-header">
          <div className="ques-number">Question {num + 1}</div>
            <div className="kept-marks">
              {marks !== maxScore && (
                <i className="bi bi-x" style={{ color: "red" }}></i>
              )}
              {marks === maxScore && (
                <i className="bi bi-check2" style={{ color: "green" }}></i>
              )}
              <div>
                {marks}/{maxScore}
              </div>
          </div>
        </div>
        <div style={{ fontSize: "1.3rem" }}>{questionName}</div>
        <div className="ques-options">
          <div
            className={
              "radio-btn " +
              (Boolean(1 === response)
                ? response === answer
                  ? "right-answer"
                  : "wrong-answer"
                : "") +
              " " +
              (1 === answer ? "correct-answer" : " ")
            }
          >
            <input
              readOnly
              type="radio"
              value={1}
              checked={Boolean(1 === response)}
            />
            {opt1}
          </div>

          <div
            className={
              "radio-btn " +
              (Boolean(2 === response)
                ? response === answer
                  ? "right-answer"
                  : "wrong-answer"
                : "") +
              " " +
              (2 === answer ? "correct-answer" : " ")
            }
          >
            <input
              readOnly
              type="radio"
              value={2}
              checked={Boolean(2 === response)}
            />
            {opt2}
          </div>

          {opt3 && (
            <div
              className={
                "radio-btn " +
                (Boolean(3 === response)
                  ? response === answer
                    ? "right-answer"
                    : "wrong-answer"
                  : "") +
                " " +
                (3 === answer ? "correct-answer" : " ")
              }
            >
              <input readOnly type="radio" value={3} checked={3 === response} />
              {opt3}
            </div>
          )}

          {opt4 && (
            <div
              className={
                "radio-btn " +
                (4 === response
                  ? response === answer
                    ? "right-answer"
                    : "wrong-answer"
                  : "") +
                " " +
                (4 === answer ? "correct-answer" : " ")
              }
            >
              <input readOnly type="radio" value={4} checked={4 === response} />
              {opt4}
            </div>
          )}
        </div>
      </div>
    </main>
  );
};

export default ViewScore;
