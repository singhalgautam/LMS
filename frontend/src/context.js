import React, { useState, useContext, useEffect } from "react";
import Axios from "axios";
import user from "./assets/user.png";
const AppContext = React.createContext();

const AppProvider = ({ children }) => {
  const info = JSON.parse(localStorage.getItem("info"));

  //profile
  const [name, setName] = useState("");
  const [contact, setContact] = useState("");
  const [image, setImage] = useState(null);
  const [cflag, setcflag] = useState(false);
  useEffect(() => {
    Axios.post("http://localhost:3002/getProfile", { id: info.id }).then(
      (res) => {
        setName(res.data[0].name);
        if (res.data[0].photo) setImage(res.data[0].photo);
        else setImage(user);
        setContact(res.data[0].contact);
      }
    );
  }, [info.id]);

  //courses
  const [loading, setLoading] = useState(false);
  const [courses, setCourses] = useState([]);

  useEffect(() => {
    setLoading(true);
    Axios.get("http://localhost:3002/getCourseList")
      .then((res) => {
        // console.log(res.data);
        setCourses(res.data);
        setLoading(false);
      })
      .catch((err) => {
        console.log(err);
        setLoading(false);
      });
  }, []);

  //studentEnrolledCourses
  const [myCoursesId, setmyCoursesId] = useState([]);
  const [myCourseList, setMyCourseList] = useState([]);
  useEffect(() => {
    setLoading(true);
    Axios.post("http://localhost:3002/getMyCourses", { id: info.id })
      .then((res) => {
        // console.log(res.data);
        const myNewCourses = [];
        res.data.forEach((course) => {
          myNewCourses.push(course.courseId);
        });
        // console.log(myNewCourses);
        setmyCoursesId(myNewCourses);
        setMyCourseList(res.data);
        setLoading(false);
      })
      .catch((err) => {
        console.log(err);
        setLoading(false);
      });
  }, [info.id,cflag]);

  //teacherCourses
  const [teacherCourseList,setTeacherCourseList]=useState([]);
  useEffect(() => {
    setLoading(true);
     Axios.post("http://localhost:3002/getTeacherCourse", { id: info.id })
       .then((res) => {
         setTeacherCourseList(res.data);
         setLoading(false);
       })
       .catch((err) => {
         console.log(err);
         setLoading(false);
       });
  }, [info.id]);






  return (
    <AppContext.Provider
      value={{
        info,
        loading,
        courses,
        name,
        setName,
        contact,
        setContact,
        image,
        setImage,
        myCoursesId,
        setmyCoursesId,
        myCourseList,
        teacherCourseList,
        setcflag,
        cflag,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useGlobalContext = () => {
  return useContext(AppContext);
};

export { AppContext, AppProvider };
