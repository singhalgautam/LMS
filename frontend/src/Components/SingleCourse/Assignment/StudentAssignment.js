import React, { useEffect, useState } from "react";
import Axios from "axios";
import { Link } from "react-router-dom";

function StudentAssignment({id}) {
  const [assignmentList, setAssignmentList] = useState([]);
  useEffect(() => {
      Axios.post("http://localhost:3002/getAssignments", { id }).then((res) => {
      setAssignmentList(res.data);
      });
  }, []);
  return (
    <div>
      {assignmentList.length !== 0 && (
        <div>
          <div className="heading">Uploaded Assignment</div>
          {assignmentList.map((assign) => {
            return <SingleAssignment key={assign.assignmentId} {...assign} />;
          })}
        </div>
      )}
    </div>
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
  const time = deadline.slice(0, 10) + ", " + deadline.slice(-5) + " hr";
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
            pathname: `/courses/${courseId}/mySubmission/`,
            state: {
              title: title,
              topic: topic,
              assignFile: file,
              assignFileName: fileName,
              deadline: deadline,
              assignmentId,
            },
          }}
        >
          Attempt
        </Link>
      </button>
    </div>
  );
};
export default StudentAssignment;
