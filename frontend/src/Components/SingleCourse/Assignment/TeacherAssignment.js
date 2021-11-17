import React, { useEffect, useState } from "react";
import Axios from "axios";
import { Link } from "react-router-dom";

function TeacherAssignment({ id }) {
  function getAssignments() {
    setDeadline("");
    setTopic("");
    setTitle("");
    setFile("");
    setFileName("");
    Axios.post("http://localhost:3002/getAssignments", { id }).then((res) => {
      setAssignmentList(res.data.reverse());
    });
  }
  const [file, setFile] = useState();
  const [fileName, setFileName] = useState("");
  const saveFile = (e) => {
    setFile(e.target.files[0]);
    setFileName(e.target.files[0].name);
  };
  const uploadFile = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("file", file);
    formData.append("fileName", fileName);
    formData.append("courseId", id);
    formData.append("title", title);
    formData.append("topic", topic);
    formData.append("deadline", deadline);
    alert(fileName)
    console.log(formData);
    try {
      await Axios.post(
        "http://localhost:3002/uploadAssignment",
        formData
      ).then(async(res)=>{
        await getAssignments();
      });
    } catch (ex) {
      console.log(ex);
    }
  };
  const [assignmentList, setAssignmentList] = useState([]);
  const [title, setTitle] = useState("");
  const [topic, setTopic] = useState("");
  const [deadline, setDeadline] = useState();
  
  useEffect(() => {
    getAssignments();
  }, []);
  return (
    <main>
      <div className="heading">Upload new assignment</div>
      <form className="form" style={{ textAlign: "center" }}>
        <div className="ques-container">
          <label htmlFor="title">Title : </label>
          <input
            type="text"
            name="title"
            id="title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
          <br />
          <label htmlFor="topic">Topic : </label>
          <input
            type="text"
            name="topic"
            id="topic"
            value={topic}
            onChange={(e) => setTopic(e.target.value)}
          />
          <br />
          <label htmlFor="appt">Deadline : </label>
          <input
            type="datetime-local"
            id="appt"
            name="appt"
            value={deadline}
            required
            onChange={(e) => setDeadline(e.target.value)}
          />
          <div className="fileUpload" style={{ marginTop: "3em" }}>
            <label
              htmlFor="file-upload"
              className="custom-assign-upload"
              style={{ width: "18em", border: "2px solid #9658fe" }}
            >
              <i className="bi bi-plus-lg" style={{ marginRight: "0.5em" }}></i>
              <p style={{ display: "inline-block" }}>Choose Assignment File</p>
            </label>
            <input
              type="file"
              name="file-upload"
              id="file-upload"
              onChange={saveFile}
            />
            <h4 style={{ marginTop: "2em" }}>{fileName}</h4>
            <button className="btn btn-quiz" onClick={uploadFile}>
              Upload
            </button>
          </div>
        </div>
      </form>
      {assignmentList.length !== 0 && (
        <div>
          <div className="heading">Uploaded Assignment</div>
          {assignmentList.map((assign) => {
            return <SingleAssignment key={assign.assignmentId} {...assign} />;
          })}
        </div>
      )}
    </main>
  );
}
const SingleAssignment = ({
  assignmentId,
  courseId,
  file,
  fileName,
  title,
  topic,
  deadline,
}) => {
    const time = deadline.slice(0, 10) + ", " + deadline.slice(-5)+" hr";
  return (
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
      <button className="btn btn-edit" style={{ marginTop: "0.5em" }}>
        <Link
          className="link-btn"
          to={{
            pathname: `/courses/${courseId}/assignmentSubmission/`,
            state: {
              title: title,
              topic: topic,
              file:file,
              fileName:fileName,
              deadline:deadline,
              assignmentId
            },
          }}
        >
          View Submisions
        </Link>
      </button>
    </div>
  );
};
export default TeacherAssignment;
