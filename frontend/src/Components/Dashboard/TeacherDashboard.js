import React from 'react'
import Loading from "../../Loading";
import {color} from "../Color";
import { Link } from "react-router-dom";
import { useGlobalContext } from "../../context";

function TeacherDashboard() {
  const { loading, teacherCourseList } = useGlobalContext();

  if (loading) {
    return <Loading />;
  }
  return (
    <section className="section">
      <div className="card-center">
        {teacherCourseList.map((course) => {
          return <MyCourse key={course.courseId} {...course} />;
        })}
      </div>
    </section>
  );
}

const MyCourse = ({
  courseId,
  courseName,
  credits,
  bio,
  prerequisite,
}) => {

  const mod = color.length;

  const {name, image } = useGlobalContext();
  

  return (
    <article className="card">
      <div
        className="img-container"
        style={{ backgroundColor: color[courseId % mod][0] }}
      >
        <div className="teacher">
          <div className="profilePic">
            <img src={image} alt="user" />
          </div>
          <h4>{name}</h4>
        </div>
      </div>
      <div className="card-footer">
        <h4 style={{ color: color[courseId % mod][1] }}>{courseName}</h4>
        <h5>{bio}</h5>
        <p>Prerequisite: {prerequisite}</p>
      </div>
      <div className="enroll">
        <button className="btn btn-enroll">
          <Link
            to={{
              pathname: `/courses/${courseId}`,
              state: {
                name: name,
                courseName: courseName,
              },
            }}
            className="link-btn"
          >
            Go to course
          </Link>
        </button>
      </div>
    </article>
  );
};

export default TeacherDashboard
