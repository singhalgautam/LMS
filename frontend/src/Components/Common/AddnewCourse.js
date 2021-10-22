import React,{useState} from 'react'
// import Axios from 'axios';
function AddnewCourse() {
    const [courseName,setCourseName]=useState("");
    const [credit,setCredit]=useState('');
    const [desc,setDesc]=useState("");
    const [prereq,setPrereq]=useState("");
    
    return (
      <div className="flex-container">
        <form className="form">
          <br />
          <h3>Start a new Course</h3>
          <br />
          <label>Course Name : </label>
          <input
            type="text"
            name="courseName"
            id="courseName"
            placeholder="Name of your course"
            value={courseName}
            onChange={(e) => setCourseName(e.target.value)}
          />
          <label>Description : </label>
          <textarea
            type="text"
            name="desc"
            id="desc"
            placeholder="Descriptiom of this course"
            value={desc}
            onChange={(e) => setDesc(e.target.value)}
          />
          <label>Credit : </label>
          <input
            type="text"
            name="credit"
            id="credit"
            placeholder="Credit of this course"
            value={credit}
            onChange={(e) => setCredit(e.target.value)}
          />
          <label>Prerequisite : </label>
          <input
            type="text"
            name="prereq"
            id="prereq"
            placeholder="Prerequisite of this course"
            value={prereq}
            onChange={(e) => setPrereq(e.target.value)}
          />
          <br />
          <button className="opt-val-btn">Publish</button>
        </form>
      </div>
    );
}

export default AddnewCourse
