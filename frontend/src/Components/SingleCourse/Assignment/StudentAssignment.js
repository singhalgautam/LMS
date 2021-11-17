import React, { useEffect, useState } from "react";
import Axios from "axios";
import { Link } from "react-router-dom";
import { useGlobalContext } from "../../../context";
import Loading from "../../../Loading";
import assignmentImg from "../../../assets/assignment.png"

function StudentAssignment({id}) {
  const { info } = useGlobalContext();
  const [loading1, setLoading1] = useState(true);
  const [loading2, setLoading2] = useState(true);
  const [assignmentList, setAssignmentList] = useState([]);
  const [unAttemptedAssignmentList, setUnAttemptedAssignmentList] = useState([]);
  const [attemptedAssignmentList, setAttemptedAssignmentList] = useState([]);
  useEffect(() => {
      setLoading1(true);
      Axios.post("http://localhost:3002/getAttemptedAssignments", {
        id,
        studentId: info.id,
      }).then((res) => {
        console.log(res.data[0]);
        setAttemptedAssignmentList(res.data[0].reverse());
        setLoading1(false);
      });
      setLoading2(true);
      Axios.post("http://localhost:3002/getUnAttemptedAssignments", {
        id,
        studentId: info.id,
      }).then((res) => {
        console.log(res.data[0]);
        setUnAttemptedAssignmentList(res.data[0].reverse());
        setLoading2(false);
      });
  }, []);

  if (loading1 && loading2) {
    return <Loading />;
  }

  return (
    <div>
      {attemptedAssignmentList.length === 0 &&
        unAttemptedAssignmentList.length === 0 && (
          <div className="no-item">
            <h2>No work has been Assigned! </h2>
            <div>
              <img
                style={{ height: "65vh", width: "40vw" }}
                src={assignmentImg}
                alt="gif"
              />
            </div>
          </div>
        )}
      {unAttemptedAssignmentList.length !== 0 && (
        <div>
          <div className="heading">Pending Assignments</div>
          {unAttemptedAssignmentList.map((assign) => {
            return (
              <SingleAssignment
                key={assign.assignmentId}
                {...assign}
                flag={false}
              />
            );
          })}
        </div>
      )}
      {attemptedAssignmentList.length !== 0 && (
        <div>
          <div className="heading">Completed Assignments</div>
          {attemptedAssignmentList.map((assign) => {
            return (
              <SingleAssignment
                key={assign.assignmentId}
                {...assign}
                flag={true}
              />
            );
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
  flag
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
          {flag?"View Your Work":"Attempt"}
        </Link>
      </button>
    </div>
  );
};
export default StudentAssignment;
