import React, { useState, useEffect } from "react";
import { useParams, useLocation, useHistory } from "react-router-dom";
import Loading from '../../../Loading';
import Axios from "axios";
import "./questionPaper.css";
import { useGlobalContext } from "../../../context";

function AttemptQuiz() {
  const { id, quizId } = useParams();
  const location = useLocation();
  const { title, topic, instruction, duration, totalQues, totalMarks } =
    location.state;
  const history = useHistory();
  const { info } = useGlobalContext();
  const [loading, setLoading] = useState(false);
  const [quesList, setQuesList] = useState([]);
  const [responseList, setResponseList] = useState(Array(totalQues));
  useEffect(() => {
    setLoading(true);
    async function getQuizQuestion(){
      Axios.post("http://localhost:3002/getQues", { quizId }).then((res) => {
        setQuesList(res.data);
        setLoading(false);
      }).catch((err)=>{
        alert(err);
        setLoading(false);
      });
    }
    getQuizQuestion();
  }, [quizId]);
 
  const handleSubmitAns = async(e) => {
    e.preventDefault();
    const arr=new Array(totalQues);
    var totalMarksScored=0;
    quesList.forEach((ques,i)=>{
       const obj = {};
       obj["quizId"] = quizId;
       obj["studentId"] = info.id;
       obj["questionId"] = ques.questionId;
       obj["response"] = responseList[i];
       let marks=0
       if(responseList[i]){
         if (ques.answer === responseList[i]) marks += ques.maxScore;
         else marks+=ques.penaltyScore;
       }
       obj["marks"]=marks;
       arr[i] = obj;
       totalMarksScored+=marks;
    });
    await Axios.post("http://localhost:3002/insertQuizResponse", {
      arr,
      quizId,
      studentId: info.id,
      score: totalMarksScored,
      courseId: id,
    });
    history.replace(
      `/courses/${id}/quizAttempt/${quizId}/viewScore/${info.id}`
    );
    // return new Promise((resolve,reject)=>{
    //   Axios.post("http://localhost:3002/insertQuizResponse", {
    //     arr,
    //     quizId,
    //     studentId: info.id,
    //     score: totalMarksScored,
    //     courseId: id,
    //   });
    //   history.replace(`/courses/${id}/quizAttempt/${quizId}/viewScore/${info.id}`);
    // })
  };



  if(loading){
    return <Loading/>
  }
  return (
    <div>
      <h3>{title}</h3>
      <h4>Duration : {duration}</h4>
      <h4>Topic: {topic}</h4>
      <hr />
      <h4>Instruction : </h4>
      <p>{instruction}</p>
      <form onSubmit={handleSubmitAns}>
        {quesList.length !== 0 &&
          quesList.map((ques, index) => {
            return (
              <Question
                key={ques.questionId}
                {...ques}
                num={index}
                responseList={responseList}
                setResponseList={setResponseList}
              />
            );
          })}
        <button className="btn">submit</button>
      </form>
    </div>
  );
}

const Question = ({
  num,
  questionId,
  questionName,
  maxScore,
  penaltyScore,
  opt1,
  opt2,
  opt3,
  opt4,
  responseList,
  setResponseList,
}) => {
  
  return (
    <main>
      <div className="ques-box">
        <div className="ques-header">
          <div className="ques-number">Question {num + 1}</div>
          <div className="score-stats">
            <div>
              MaxScore :<span style={{ color: "green" }}>{maxScore}</span>
            </div>
            <div>
              Penalty :<span style={{ color: "red" }}>{penaltyScore}</span>
            </div>
          </div>
        </div>
        <div style={{ fontSize: "1.3rem" }}>{questionName}</div>
        <div className="ques-options">
          <div
            className="radio-btn"
            onClick={() => {
              const newResponseList = [...responseList];
              newResponseList[num] = 1;
              setResponseList(newResponseList);
            }}
          >
            <input
              readOnly
              type="radio"
              value={1}
              checked={responseList[num] === 1}
            />
            {opt1}
          </div>

          <div
            className="radio-btn"
            onClick={() => {
              const newResponseList = [...responseList];
              newResponseList[num] = 2;
              setResponseList(newResponseList);
            }}
          >
            <input
              readOnly
              type="radio"
              value={2}
              checked={responseList[num] === 2}
            />
            {opt2}
          </div>

          {opt3 && (
            <div
              className="radio-btn"
              onClick={() => {
                const newResponseList = [...responseList];
                newResponseList[num] = 3;
                setResponseList(newResponseList);
              }}
            >
              <input
                readOnly
                type="radio"
                value={3}
                checked={responseList[num] === 3}
              />
              {opt3}
            </div>
          )}

          {opt4 && (
            <div
              className="radio-btn"
              onClick={() => {
                const newResponseList = [...responseList];
                newResponseList[num] = 4;
                setResponseList(newResponseList);
              }}
            >
              <input
                readOnly
                type="radio"
                value={4}
                checked={responseList[num] === 4}
              />
              {opt4}
            </div>
          )}
        </div>
      </div>
    </main>
  );
};
export default AttemptQuiz;
