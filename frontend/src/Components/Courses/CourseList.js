import React from "react";
import Loading from "../../Loading";
import user from "../../assets/user.png";
import { Link } from "react-router-dom";
import { useGlobalContext } from "../../context";
import Axios from "axios";
import { color } from "../Color";

function CourseList() {
  const { loading, courses, myCoursesId,setcflag,cflag} = useGlobalContext();
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
          return <Course key={course.courseId} {...course} cflag={cflag} setcflag={setcflag}/>;
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
  setcflag,
  cflag,
}) => {
  const mod = color.length;
  const { info } = useGlobalContext();
  let image = user;
  if (photo) image = photo;

  const enrollMeInCourse = () => {
    if (status === beforeEnrolment) {
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
        setcflag(!cflag);
      });
    }
  };
  const beforeEnrolment = "Enroll";
  const afterEnrollment = (
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
