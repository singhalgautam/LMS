import React,{useState,useEffect} from 'react';
import { useParams, useLocation, useHistory } from "react-router-dom";
import Axios from "axios";


function EditQuestion(){
  const history=useHistory();
  const location=useLocation();
  const {
    id,
    quizId,
    questionId,
    questionName,
    maxScore,
    penaltyScore,
    opt1,
    opt2,
    opt3,
    opt4,
    answer,
  } = location.state;
  const [question, setQuestion] = useState(questionName);
  const [option1, setOpt1] = useState(opt1);
  const [option2, setOpt2] = useState(opt2);
  const [option3, setOpt3] = useState(opt3);
  const [option4, setOpt4] = useState(opt4);
  const [ans, setAns] = useState(answer);
  const [score, setMaxScore] = useState(maxScore);
  const [penalty, setPenaltyScore] = useState(penaltyScore);
  const [extraOpt, setExtraOpt] = useState([(opt3 !== null), (opt4 !== null)]);
  var [i, setI] = useState(0);
  const handleAddQues = (e) => {
    e.preventDefault();
    const newOpt = extraOpt;
    newOpt[i] = true;
    setI(i + 1);
    setExtraOpt(newOpt);
  };
  useEffect(() => {
    if(opt3!==null){
        setI(1);
    }
  },[opt3]);
  const handleUpdateQues = (e) => {
    e.preventDefault();
    const obj = { questionId };
    if (question !== questionName) {
      obj.questionName = question;
    }
    if (ans !== answer) {
      obj.answer = ans;
    }
    if (penalty !== penaltyScore) {
      obj.penaltyScore = penalty;
    }
    if (score !== maxScore) {
    //   obj.diff=score-maxScore;
      obj.maxScore = score;
    }
    if (option1 !== opt1) {
      obj.opt1 = opt1;
    }
    if (option2 !== opt2) {
      obj.opt2 = opt2;
    }
    if (extraOpt[0] === true && option3 !== opt3) {
      obj.opt3 = option3;
    }
    if (extraOpt[1] === true && option4 !== opt4) {
      obj.opt4 = option4;
    }
    Axios.post("http://localhost:3002/editQuestion", obj);
    const diff=score-maxScore;
    Axios.post("http://localhost:3002/updateTotalMarks",{quizId,diff}).then((res)=>{
        alert("updated succesfully");
    });
  };
  
  return (
    <div className="create-container">
      <form className="quizForm">
        <h3 style={{ marginLeft: "6.5em", marginBottom: "2em" }}>
          Edit Question
        </h3>
        <div className="input-wrapper">
          <textarea
            type="text"
            id="quesName"
            value={question}
            required
            onChange={(e) => setQuestion(e.target.value)}
          />
          <label htmlFor="quesName">Question</label>
        </div>
        <div className="input-wrapper">
          <textarea
            type="text"
            id="option1"
            value={option1}
            required
            onChange={(e) => setOpt1(e.target.value)}
          />
          <label htmlFor="option1">option1</label>
        </div>
        <div className="input-wrapper">
          <textarea
            type="text"
            id="option2"
            value={option2}
            required
            onChange={(e) => setOpt2(e.target.value)}
          />
          <label htmlFor="option2">option2</label>
        </div>
        <div className="adjust-btn">
          {!extraOpt[0] && (
            <button
              className="btn-addques btn-add-option"
              style={{ marginBottom: "2em" }}
              onClick={handleAddQues}
            >
              <i className="bi bi-plus-lg"></i>Add Options
            </button>
          )}
        </div>

        {extraOpt[0] === true && (
          <div className="input-wrapper">
            <textarea
              type="text"
              id="option3"
              value={option3}
              required
              onChange={(e) => setOpt3(e.target.value)}
            />
            <label htmlFor="option3">option3</label>
          </div>
        )}
        <div className="adjust-btn">
          {!extraOpt[1] && extraOpt[0] === true && (
            <button
              className="btn-addques btn-add-option"
              style={{ marginBottom: "2em" }}
              onClick={handleAddQues}
            >
              <i className="bi bi-plus-lg"></i>Add Option
            </button>
          )}
        </div>

        {extraOpt[1] === true && (
          <div className="input-wrapper">
            <textarea
              type="text"
              id="option4"
              value={option4}
              required
              onChange={(e) => setOpt4(e.target.value)}
            />
            <label htmlFor="option4">option4</label>
          </div>
        )}
        <div className="input-wrapper">
          <input
            type="number"
            id="ans"
            value={ans}
            required
            onChange={(e) => setAns(e.target.value)}
          />
          <label htmlFor="ans">Correct Opt</label>
        </div>
        <div className="input-wrapper">
          <input
            type="number"
            id="score"
            value={score}
            required
            onChange={(e) => setMaxScore(e.target.value)}
          />
          <label htmlFor="score">Max Score</label>
        </div>
        <div className="input-wrapper">
          <input
            type="number"
            id="penalty"
            value={penalty}
            required
            onChange={(e) => setPenaltyScore(e.target.value)}
          />
          <label htmlFor="penalty">Penalty Score</label>
        </div>
        <div className="adjust-btn">
          <button
            className="btn btn-quiz"
            onClick={() => history.push(`/courses/${id}/quiz/${quizId}`)}
          >
            Back
          </button>
          <button className="btn btn-quiz" onClick={handleUpdateQues}>
            Save
          </button>
        </div>
      </form>
    </div>
  );
};


export default EditQuestion
