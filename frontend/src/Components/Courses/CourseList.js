import React from "react";
import Loading from "../../Loading";
import user from "../../assets/user.png";
import { Link } from "react-router-dom";
import { useGlobalContext } from "../../context";
import Axios from "axios";

function CourseList() {
  const { loading, courses, myCoursesId } = useGlobalContext();
  const [load, setLoad] = React.useState(true);
  React.useEffect(() => {
    setLoad(true);
    var i = 0;
    courses.forEach((course) => {
      if (course.courseId === myCoursesId[i]) {
        i++;
        course.enrollmentFlag = true;
      } else {
        course.enrollmentFlag = false;
      }
    });
    setLoad(false);
  }, [courses, myCoursesId]);
  if (loading || load) {
    return <Loading />;
  }
  return (
    <section className="section">
      <div className="card-center">
        {courses.map((course) => {
          return <Course key={course.courseId} {...course} />;
        })}
      </div>
    </section>
  );
}

const Course = ({
  courseId,
  courseName,
  credits,
  bio,
  prerequisite,
  name,
  photo,
  enrollmentFlag,
}) => {
  const color = [
    ["#FFF5FD", "#FF80E5"],
    ["#d4e6a5", "#4F641B"],
    ["#EAE3E3", "#C8B6B6"],
    ["#EDF6E5", "#3E5E21"],
    ["#DAD0C2", "#4F4230"],
    ["#E8E8E8", "#404040"],
    ["#E4F2F0", "#29564F"],
    ["#FFF1C2", "#7F8000"],
    ["#CCCCFF", "#8080FF"],
    ["#CFE3FF", "#003580"],
    ["#C9FDD7", "#047C24"],
    ["#FDD2BF", "#B51212"],
    ["#C2FFFF", "#007F80"],
    ["#F5E1DA", "#642F1B"],
  ];
  const mod = color.length;

  const { info } = useGlobalContext();
  let image = user;
  if (photo) image = photo;

  const enrollMeInCourse = () => {
    Axios.post("http://localhost:3002/enrollMe", {
      studentId: info.id,
      courseId: courseId,
      status: "Enrolled",
    }).then((res) => {
      alert(res.data);
      // const myNewCourses = myCoursesId;
      // var low=0,high=myNewCourses.length;
      // while (low < high) {
      //   let mid = (low + high) >>> 1;
      //   if (myNewCourses[mid] < courseId) low = mid + 1;
      //   else high = mid;
      // }
      // myNewCourses.splice(low, 0, courseId);
      // setmyCoursesId(myNewCourses);
      setStatus(afterEnrollment);
    });
  };
  const beforeEnrolment = 'Enroll';
  const afterEnrollment = (
    <Link to={`/courses/${courseId}`} className="link-btn">
      Go to course
    </Link>
  );
  const [status, setStatus] = React.useState(
    enrollmentFlag ? afterEnrollment : beforeEnrolment
  );

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
        <button className="btn btn-enroll" onClick={enrollMeInCourse}>
          {status}
        </button>
      </div>
    </article>
  );
};
export default CourseList;