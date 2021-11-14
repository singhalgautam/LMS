import React from 'react';
import { useGlobalContext } from "../../context";

function Doubts() {
  const { CourseList } = useGlobalContext();

    return (
      <header>
        <h2>Doubts</h2>
        <hr />
        <div className="ask-doubts">
          <h3>Ask A new Doubt</h3>
          <form className="form">
            <select id="subject">
              <option> ---Choose tutorial--- </option>
              {CourseList.map((course) => {
                return <option key={course.courseId}>course.courseName</option>;
              })}
              <option></option>
              <option> Javatpoint </option>
              <option> tutorialspoint </option>
              <option> geeksforgeeks </option>
            </select>
            <label htmlFor="subject">Subject</label>
          </form>
        </div>
      </header>
    );
}

export default Doubts
