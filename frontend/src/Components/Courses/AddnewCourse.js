import React,{useState} from 'react'
import Axios from 'axios';
function AddnewCourse() {
    const [courseName,setCourseName]=useState("");
    const [credit,setCredit]=useState('');
    const [desc,setDesc]=useState("");
    const [prereq,setPrereq]=useState("");
    const info = JSON.parse(localStorage.getItem("info"));
    const handleSubmit=async (e)=>{
      await Axios.post("http://localhost:3002/publishCourse",{
        courseName,credit,desc,prereq,id:info.id
      }).then((res)=>{
        alert('course is succesfully published');
      });
    }

    return (
      <div className="flex-container">
        <form className="form" onSubmit={handleSubmit}>
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
            type="number"
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
