import React, { useEffect, useState } from "react";
import { useGlobalContext } from "../../context";
import "./Doubts.css";
import Axios from 'axios';
import logo from "../../assets/web-logo-light.jpg";
import { Link } from "react-router-dom";

function Doubts() {
  const {info}=useGlobalContext();
  const [flag,setFlag]=useState(false);
  const [title,setTitle]=useState('');  
  const [doubt,setDoubt]=useState('');  
  const [topic,setTopic]=useState(''); 

  const [doubtList,setDoubtList]=useState([]);

  useEffect(()=>{
    Axios.get("http://localhost:3002/getDoubtList").then((res)=>{
      console.log(res.data);
      setDoubtList(res.data);
    });
  },[]);

  const askDoubtHandler=()=>{
    Axios.post("http://localhost:3002/askDoubt",{
      askerId:info.id,
      title,
      topic,
      question:doubt,
  }).then((res)=>{
      alert('succesfully uploaded your doubt')
    });
  } 
  return (
    <main>
      <header>
        <h2>Doubts</h2>
        <hr />
      </header>
      {!flag && (
        <button className="btn btn-quiz" onClick={() => setFlag(true)}>
          <i className="bi bi-plus-lg" />
          Ask a doubt
        </button>
      )}
      {flag && (
        <div className="doubt-container">
          <h3>Ask A new Doubt</h3>
          <br />
          <form className="form" onSubmit={askDoubtHandler}>
            <div className="doubt-header">
              <div>
                <label htmlFor="title">Title : </label>
                <input
                  style={{ width: "33em" }}
                  type="text"
                  name="topic"
                  id="topic"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                />
              </div>
              <div>
                <label htmlFor="topic">Topic : </label>
                <input
                  type="text"
                  name="topic"
                  id="topic"
                  value={topic}
                  onChange={(e) => setTopic(e.target.value)}
                />
              </div>
            </div>

            <label htmlFor="doubt">Doubts : </label>
            <textarea
              type="text"
              name="doubt"
              id="doubt"
              value={doubt}
              onChange={(e) => setDoubt(e.target.value)}
            />

            <br />
            <button className="btn btn-doubt">Ask Doubt</button>
          </form>
        </div>
      )}
      <div style={{marginTop:'1.5em'}}>
        {doubtList.map((doubt) => {
          return <SingleDoubt key={doubt.doubtId} {...doubt} />;
        })}
      </div>
    </main>
  );
}
const SingleDoubt=({doubtId,question,title,topic,status,askerId,photo,name})=>{
  if (!photo) {
    photo = logo;
  }
  return (
    <div>
      <div className="std-up-file" style={{ padding: "1.7em" }}>
        <div className="profilePic">
          <img src={photo} alt="user" />
        </div>
        <br />
        <div>
          <h4 className='doubtTitle'>
            <Link
              to={{
                pathname: `/answerDoubt/`,
                state: {
                  doubtId,
                  question,
                  title,
                  topic,
                  status,
                  askerId,
                  photo,
                  name,
                },
              }}
            >
              {title.length >= 75 ? title.slice(0, 75) + "..." : title}
            </Link>
          </h4>
          <div className="doubtTopic">{topic}</div>
          <div>
            {question.length >= 200 ? question.slice(0, 190) + "..." : question}
          </div>
          <div className="doubtAskerName">{name}</div>
        </div>
      </div>
    </div>
  );
}
export default Doubts
