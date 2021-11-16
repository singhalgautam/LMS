import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import Axios from "axios";
import logo from "../../assets/web-logo-light.jpg";
import { useGlobalContext } from "../../context";

function AnswerDoubt() {
  const { info } = useGlobalContext();
  const location=useLocation();
  const {doubtId,question,title,topic,status,askerId,photo,name}=location.state;
  if (!photo) {
    photo = logo;
  }
  const [answer,setAnswer]=useState('');
  const [answerList,setAnswerList]=useState([]);
  const getAllAnswer=()=>{
    Axios.post("http://localhost:3002/getDoubtAnswers", { doubtId }).then(
      (res) => {
        console.log(res.data[0]);
        setAnswerList(res.data[0]);
      }
    );
  }
  useEffect(()=>{
    getAllAnswer();
  },[]);
    
  const addAnswer=async(e)=>{
    e.preventDefault();
    await Axios.post("http://localhost:3002/addDoubtAnswer",{doubt_ans:answer,doubtId,replierId:info.id}).then(()=>{
      setAnswer('');
      alert('successfully answered');
    });
    await getAllAnswer();
  }
  return (
    <div>
      <header>
        <h3>Doubt </h3>
      </header>
      <div
        className="std-up-file"
        style={{
          padding: "1.7em",
          backgroundColor: "hsl(210, 36%, 96%)",
          border: "none",
        }}
      >
        <div className="profilePic">
          <img src={photo} alt="user" />
        </div>
        <br />
        <div>
          <h4 className="doubtTitle">{title}</h4>
          <div className="doubtTopic">{topic}</div>
          <div>{question}</div>
          <div className="doubtAskerName">{name}</div>
        </div>
      </div>
      <hr />
      <form onSubmit={addAnswer}>
        <textarea
          className="doubt-answer"
          type="text"
          name="topic"
          id="topic"
          value={answer}
          onChange={(e) => setAnswer(e.target.value)}
        />
        <button className="btn btn-doubt">Add Answer</button>
      </form>
      <h3>Some Answers : </h3>
      <div style={{ marginTop: "1.5em" }}>
        {answerList.map((ans) => {
          return <SingleAnswer key={ans.doubt_ansId} {...ans} />;
        })}
      </div>
    </div>
  );
}
const SingleAnswer = ({ name, photo, doubt_ans, doubt_ansId }) => {
  if (!photo) {
    photo = logo;
  }
  return (
    <div>
      <div className="std-up-file" style={{ padding: "1.7em",margin:'auto',marginTop:'3em' }}>
        <div className="profilePic">
          <img src={photo} alt="user" />
        </div>
        <br />
        <div>
          <div>
            {doubt_ans}
          </div>
          <div className="doubtAskerName">{name}</div>
        </div>
      </div>
    </div>
  );
};
export default AnswerDoubt;
