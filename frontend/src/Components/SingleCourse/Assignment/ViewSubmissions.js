import React, { useState, useEffect } from "react";
import { useParams,useLocation } from "react-router-dom";
import Axios from "axios";
import logo from "../../../assets/web-logo-light.jpg";

function ViewSubmissions() {
  const {courseId}=useParams();
  const location=useLocation();
  const {
    assignmentId,
    file,
    fileName,
    title,
    topic,
    deadline
  }=location.state;
  const time = deadline.slice(0, 10) + ", " + deadline.slice(-5) + " hr";
  const [studentList,setStudentList]=useState([]);
  useEffect(()=>{
    Axios.post("http://localhost:3002/viewStudentAssignmentSubmission", {
      assignmentId,
    }).then((res) => {
      if (res.data[0].length!==0) setStudentList(res.data[0]);
    });
  },[]);
  return (
    <div>
      <h3>Submissions Done So Far</h3>
      <div className="ques-container">
        <h3 style={{ fontWeight: "300" }}>{title}</h3>
        <h4 className="assign-heading">Topic: {topic}</h4>
        <h4 className="assign-heading"> Deadline : {time}</h4>
        <div className="up-file">
          <a href={file} target="_blank" title={fileName} rel="noreferrer">
            <i className="bi bi-file-text"></i>
            {fileName}
          </a>
        </div>
      </div>
      {studentList.map((submittedFile)=>{
        return (
          <SingleStudentFile key={submittedFile.assignment_submissionId}{...submittedFile}/>
        );
      })}
    </div>
  );
}
const SingleStudentFile=({file,fileName,comment,roll,late,name,photo})=>{
  if(!photo){
    photo=logo;
  }
  return (
    <div className="std-up-file">
      <div className="profPic">
        <img src={photo} alt="user" />
      </div>
      <br />
      <div className="submittedStdFile">
        <a href={file} target="_blank" title={fileName} rel="noreferrer">
          {roll} - {name}
        </a>
        <p>{late === 0 ? "Turned In Late" : "Turned In"}</p>
      </div>
    </div>
  );
}
export default ViewSubmissions;
