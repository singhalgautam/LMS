import React from "react";
import Loading from "../../Loading";
import user from "../../assets/user.png";
import { Link } from "react-router-dom";
import { useGlobalContext } from "../../context";
import { color } from "../Color";
import emptyImg from "../../assets/emptydashboard.jpg";
function StudentDashboard() {
  const { loading, myCourseList } = useGlobalContext();

  if (loading) {
    return <Loading />;
  }
  return (
    <section className="section">
      {myCourseList.length === 0 && (
        <div className="no-item" style={{marginTop:"1.5em"}} >
          <h2>Enroll in a course from course-section </h2>
          <div>
            <img
              style={{ height: "50vh", width: "40vw",marginTop:"1.5em" }}
              src={emptyImg}
              alt="file"
            />
          </div>
        </div>
      )}
      <div className="card-center">
        {myCourseList.map((course) => {
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
  name,
  photo,
}) => {
  const mod = color.length;
  //   const { info } = useGlobalContext();
  // let history = useHistory();
  // function handleLink() {
  //   history.push(`/courses/${courseId}`,{name:name,courseId:courseId});
  //   console.log(history);
  // }
  let image = user;
  if (photo) image = photo;

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
            // onClick={handleLink}
            to={{
              pathname: `/courses/${courseId}`,
              state: {
                name: name,
                courseName: courseName,
              },
            }}
            className="link-btn"
            // state={{name: courseName }}
          >
            Go to course
          </Link>
        </button>
      </div>
    </article>
  );
};
export default StudentDashboard;
