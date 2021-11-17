import React, { useState, useEffect, useRef } from "react";
import { useLocation, useParams, Link } from "react-router-dom";
import Axios from "axios";

function ManageQuiz() {
  const { id, quizId } = useParams();
  // const location=useLocation();
  // console.log(location.state);
  // const {title,topic,instruction,duration}=location.state;
  const [title, setTitle] = useState("Exam");
  const [instruction, setInstruction] = useState("Instruction");
  const [duration, setDuration] = useState("00:00");
  const [topic, setTopic] = useState("All");
  const [isCreateQuesClicked, setIsCreateQuesClicked] = useState(false);
  const [totalQues, setTotalQues] = useState(0);
  const [totalMarks, setTotalMarks] = useState(0);
  const [quesList, setQuesList] = useState([]);
  const handleAddQues = () => {
    setIsCreateQuesClicked(true);
  };
  function getNewQues() {
    Axios.post("http://localhost:3002/getQues", { quizId }).then((res) => {
      setQuesList(res.data);
      console.log(res.data);
    });
  }
  useEffect(() => {
    getNewQues();
  }, []);
  function getNewQuizInfo() {
    Axios.post("http://localhost:3002/getQuizInfo", { quizId }).then((res) => {
      setTitle(res.data[0].title);
      setDuration(res.data[0].duration);
      setTitle(res.data[0].title);
      setInstruction(res.data[0].instruction);
      setTotalMarks(res.data[0].totalMarks);
      setTotalQues(res.data[0].totalQues);
    });
  }

  useEffect(() => {
    getNewQuizInfo();
  }, []);
  if (isCreateQuesClicked) {
    return (
      <CreateQuestion
        quizId={quizId}
        totalMarks={totalMarks}
        setTotalMarks={setTotalMarks}
        totalQues={totalQues}
        setTotalQues={setTotalQues}
        setIsCreateQuesClicked={setIsCreateQuesClicked}
        getNewQuizInfo={getNewQuizInfo}
        getNewQues={getNewQues}
      />
    );
  }
  return (
    <main>
      <div className="instruction">
        <div className="ques-container">
          <h3>
            {title}
            <i className="bi bi-pencil-fill instruction-pencil"></i>
          </h3>
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
          <hr style={{ borderColor: "rgba(102, 102, 102, 0.292)" }} />
          <div className="adjust-btn">
            <button className="btn-addques" onClick={handleAddQues}>
              <i className="bi bi-plus-lg"></i>Add new Question
            </button>
          </div>
        </div>
      </div>
      {quesList.map((ques) => {
        return (
          <SingleQuestion
            key={ques.questionId}
            {...ques}
            getNewQuizInfo={getNewQuizInfo}
            getNewQues={getNewQues}
            id={id}
          />
        );
      })}
      <button className="opt-val-btn">
        <Link to={
              {
                pathname:`/courses/${id}`,
                
              }}
              className="link-btn">
          Publish
        </Link>
      </button>
    </main>
  );
}

const SingleQuestion = ({
  id,
  quizId,
  questionId,
  questionName,
  maxScore,
  penaltyScore,
  getNewQues,
  getNewQuizInfo,
  opt1,
  opt2,
  opt3,
  opt4,
  answer,
}) => {
  const [score,setScore]=useState(maxScore);
  const [scoreHelper,setScoreHelper]=useState(maxScore);
  const [penalty,setPenalty]=useState(penaltyScore);
  const handleDelete = () => {
    // Axios.delete(`http://localhost:3002/deleteQues"/${questionId}`);
    // Axios.delete("http://localhost:3002/deleteQues",{data:{quizId:quizId,questionId:questionId}});
    Axios.post(`http://localhost:3002/deleteQues`, {
      questionId,
      quizId,
      maxScore,
    }).then((res) => {
      getNewQues();
      getNewQuizInfo();
    });
  };
 
  const handleMaxScore = (e) => {
    if (e.target.value !== "") {
      // console.log(e.target.value);
      const diff = e.target.value - scoreHelper;
      // console.log(`score:${score}`);
      // console.log(`diff : ${diff}`);
      setScore(e.target.value);
      setScoreHelper(e.target.value);
      console.log(score);
      Axios.post("http://localhost:3002/updateMaxScore", {
        questionId,
        score: e.target.value,
        quizId,
        diff,
      }).then((res) => {
        getNewQuizInfo();
      });
    }
    else{
      setScore(e.target.value);
    }
  };
  const handlePenaltyScore=(e)=>{
    setPenalty(e.target.value);
    if (e.target.value !== "") {
      Axios.post("http://localhost:3002/updatePenaltyScore", {
        questionId,
        penaltyScore: e.target.value,
      });
    }
  }
  return (
    <div className="ques-container">
      <div className="single-ques">
        <div className="question-content">
          <p>
            {questionName.length >= 70
              ? questionName.slice(0, 70) + "..."
              : questionName}
          </p>
        </div>
        <div className="ques-stats">
          <div className="stats-wrapper">
            <label htmlFor="maxScore">Max Marks</label>
            <input
              type="number"
              name="maxScore"
              id="maxScore"
              value={score}
              onChange={(e) => handleMaxScore(e)}
            />
          </div>
          <div className="stats-wrapper">
            <label htmlFor="penaltyScore">Penalty Marks</label>
            <input
              type="number"
              name="penaltyScore"
              id="penaltyScore"
              value={penalty}
              onChange={(e) => handlePenaltyScore(e)}
            />
          </div>
        </div>
        <div className="ques-edit">
          <Link
            to={{
              pathname: `/courses/${id}/quiz/${quizId}/${questionId}`,
              state: {
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
              },
            }}
            style={{ transform: "translateY(10px)" }}
          >
            <i className="bi bi-pencil-fill"></i>
          </Link>
          <i className="bi bi-trash" onClick={handleDelete}></i>
        </div>
      </div>
    </div>
  );
};

const CreateQuestion = ({
  quizId,
  totalMarks,
  setTotalMarks,
  totalQues,
  setTotalQues,
  setIsCreateQuesClicked,
  getNewQuizInfo,
  getNewQues,
}) => {
  const [question, setQuestion] = useState("");
  const [opt1, setOpt1] = useState("");
  const [opt2, setOpt2] = useState("");
  const [opt3, setOpt3] = useState("");
  const [opt4, setOpt4] = useState("");
  const [answer, setAnswer] = useState("");
  const [maxScore, setMaxScore] = useState(4);
  const [penaltyScore, setPenaltyScore] = useState(0);
  const [extraOpt, setExtraOpt] = useState([0, 0]);
  var [i, setI] = useState(0);
  const handleAddQues = (e) => {
    e.preventDefault();
    const newOpt = extraOpt;
    newOpt[i] = 1;
    setI(i + 1);
    setExtraOpt(newOpt);
  };
  const handleCreateQues = (e) => {
    e.preventDefault();
    console.log(quizId);
    const obj = {
      quizId: quizId,
      questionName: question,
      answer: answer,
      maxScore: maxScore,
      penaltyScore: penaltyScore,
      opt1: opt1,
      opt2: opt2,
    };
    if (extraOpt[0] === 1) {
      obj.opt3 = opt3;
    }
    if (extraOpt[1] === 1) {
      obj.opt4 = opt4;
    }
    // setTotalQues(totalQues + 1);
    // setTotalMarks(totalMarks + maxScore);
    Axios.post("http://localhost:3002/addQues", obj).then((res) => {
      setIsCreateQuesClicked(false);
      getNewQues();
      getNewQuizInfo();
    });
  };
  
  return (
    <div className="create-container">
      <form className="quizForm">
        <h3 style={{ marginLeft: "6.5em", marginBottom: "2em" }}>
          Create Question
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
            id="opt1"
            value={opt1}
            required
            onChange={(e) => setOpt1(e.target.value)}
          />
          <label htmlFor="opt1">opt1</label>
        </div>
        <div className="input-wrapper">
          <textarea
            type="text"
            id="opt2"
            value={opt2}
            required
            onChange={(e) => setOpt2(e.target.value)}
          />
          <label htmlFor="opt2">opt2</label>
        </div>
        <div className="adjust-btn">
          {!extraOpt[0] && (
            <button className="btn-addques btn-add-opt" onClick={handleAddQues}>
              <i className="bi bi-plus-lg"></i>Add Options
            </button>
          )}
        </div>

        {extraOpt[0] === 1 && (
          <div className="input-wrapper">
            <textarea
              type="text"
              id="opt3"
              value={opt3}
              required
              onChange={(e) => setOpt3(e.target.value)}
            />
            <label htmlFor="opt3">opt3</label>
          </div>
        )}
        <div className="adjust-btn">
          {!extraOpt[1] && extraOpt[0] === 1 && (
            <button className="btn-addques btn-add-opt" onClick={handleAddQues}>
              <i className="bi bi-plus-lg"></i>Add Option
            </button>
          )}
        </div>

        {extraOpt[1] === 1 && (
          <div className="input-wrapper">
            <textarea
              type="text"
              id="opt4"
              value={opt4}
              required
              onChange={(e) => setOpt4(e.target.value)}
            />
            <label htmlFor="opt4">opt4</label>
          </div>
        )}
        <div className="input-wrapper">
          <input
            type="number"
            id="answer"
            value={answer}
            required
            onChange={(e) => setAnswer(e.target.value)}
          />
          <label htmlFor="answer">Correct Opt</label>
        </div>
        <div className="input-wrapper">
          <input
            type="number"
            id="maxScore"
            value={maxScore}
            required
            onChange={(e) => setMaxScore(e.target.value)}
          />
          <label htmlFor="maxScore">Max Score</label>
        </div>
        <div className="input-wrapper">
          <input
            type="number"
            id="penaltyScore"
            value={penaltyScore}
            required
            onChange={(e) => setPenaltyScore(e.target.value)}
          />
          <label htmlFor="penaltyScore">Penalty Score</label>
        </div>
        <div className="adjust-btn">
          <button className="btn btn-quiz" onClick={handleCreateQues}>
            Save
          </button>
        </div>
      </form>
    </div>
  );
};

export default ManageQuiz;
