import React, { useState, useEffect } from "react";
import { useParams, useLocation } from "react-router-dom";
import Loading from "../../../Loading";
import Axios from "axios";
import { useGlobalContext } from "../../../context";

function MySubmission() {
  const { courseId } = useParams();
  const location = useLocation();
  const { info } = useGlobalContext();
  const { assignmentId, assignFile, assignFileName, title, topic, deadline } =
    location.state;
  const time = deadline.slice(0, 10) + ", " + deadline.slice(-5) + " hr";
  const [myAssign,setMyAssign]=useState({});
  async function getMyfile() {
    await Axios.post("http://localhost:3002/getMyAssignments", {
      assignmentId,
      studentId: info.id,
    }).then((res) => {
      setMyAssign(res.data[0]);
      if(res.data.length!==0){
        setMessage(`Turned In ${res.data[0].late===0 ? 'late':''} `);
        setOpt(unsubmit);
      }
    });
  }
  useEffect(()=>{
    getMyfile();
  },[])
/************************************* */
  const [file, setFile] = useState();
  const [fileName, setFileName] = useState("");
  const saveFile = (e) => {
    setFile(e.target.files[0]);
    setFileName(e.target.files[0].name);
  };
  const uploadFile = async (e) => {
    e.preventDefault();
    const currTime = new Date().toLocaleString();
    let late=1;
    if (currTime < time){
      late=0;
    }
    const formData = new FormData();
    formData.append("file", file);
    formData.append("fileName", fileName);
    formData.append("comment", comment);
    formData.append("roll", roll);
    formData.append("courseId", courseId);
    formData.append("assignmentId", assignmentId);
    formData.append("studentId", info.id);
    formData.append("late", late);
    console.log(formData);
    try {
      await Axios.post(
        "http://localhost:3002/uploadMyAssignment",
        formData
        ).then(async(res)=>{
        await getMyfile();
        setMessage(`Turned In ${late === 0 ? "late" : ""} `);
        setOpt(unsubmit);
        setRoll("");
        setComment('');
        setFile();
        setFileName('');
        alert("Uploaded Successfully");

      });
    } catch (ex) {
      console.log(ex);
    }
  };
  /**************************************/
  const deleteFile = async (e) => {
    e.preventDefault();
    await Axios.post("http://localhost:3002/deleteMyAssignment", {
      assignmentId,
    }).then((res) => {
      setMessage("Turn In");
      setOpt(submit);
      setRoll("");
      setComment("");
      setFile();
      setFileName("");
    });
  };
  const submit = (
    <button className="btn btn-quiz" >
      Submit
    </button>
  ); 
  const unsubmit = (
    <button className="btn btn-quiz">
      UnSubmit
    </button>
  );
  const [comment,setComment]=useState('');
  const [roll,setRoll]=useState('');
  const [message,setMessage]=useState('Turn In');
  const [opt,setOpt]=useState(submit);

  return (
    <div>
      <div className="mySubmissionHeader">
        <h3>Your Work </h3>
        <p>{message}</p>
      </div>

      <div className="ques-container">
        <h3 style={{ fontWeight: "300" }}>{title}</h3>
        <h4 className="assign-heading">Topic: {topic}</h4>
        <h4 className="assign-heading"> Deadline : {time}</h4>
        <div className="up-file">
          <a
            href={assignFile}
            target="_blank"
            title={assignFileName}
            rel="noreferrer"
          >
            <i className="bi bi-file-text"></i>
            {assignFileName}
          </a>
        </div>
      </div>
      <form
        className="form"
        onSubmit={message === "Turn In" ? uploadFile : deleteFile}
        style={{ textAlign: "center" }}
      >
        <div className="ques-container">
          {message === "Turn In" && (
            <>
              <label htmlFor="roll">Roll No. : </label>
              <input
                type="text"
                name="roll"
                id="roll"
                value={roll}
                onChange={(e) => setRoll(e.target.value)}
              />
              <br />
              <div className="fileUpload" style={{ marginTop: "3em" }}>
                <label
                  htmlFor="file-upload"
                  className="custom-assign-upload"
                  style={{ width: "18em", border: "2px solid #9658fe" }}
                >
                  <i
                    className="bi bi-plus-lg"
                    style={{ marginRight: "0.5em" }}
                  ></i>
                  <p style={{ display: "inline-block" }}>
                    Choose Assignment File
                  </p>
                </label>
                <input
                  type="file"
                  name="file-upload"
                  id="file-upload"
                  onChange={saveFile}
                />
                <h4 style={{ marginTop: "2em" }}>{fileName}</h4>
                <label
                  htmlFor="comment"
                  style={{ width: "10em", marginLeft: "-2.5em" }}
                >
                  Add a Comment:{" "}
                </label>
                <textarea
                  style={{ height: "5em", width: "90%" }}
                  type="text"
                  name="comment"
                  id="comment"
                  value={comment}
                  onChange={(e) => setComment(e.target.value)}
                />
              </div>
              <br />
            </>
          )}
          {message !== "Turn In" && (
            <div style={{ textAlign: "left" }}>
              <h3 className="heading" >
                View your Submitted File
              </h3>
              <p>Roll No : {myAssign.roll}</p>
              <div className="up-file">
                <a
                  href={myAssign.file}
                  target="_blank"
                  title={myAssign.fileName}
                  rel="noreferrer"
                >
                  <i className="bi bi-file-text"></i>
                  {myAssign.fileName}
                </a>
              </div>
              {myAssign.comment!=='' && <div className="assign-commnent">You Commented : {myAssign.comment}</div>}
            </div>
          )}
          {opt}
        </div>
      </form>
    </div>
  );
}
export default MySubmission;
