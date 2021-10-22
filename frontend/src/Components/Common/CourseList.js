import React from 'react'
import Axios from 'axios';
function CourseList() {
    Axios.get("http://localhost:3000/dashboard/getCourseList").then((res)=>{

    })
    return (
      <section className="section">
        {/* <h2 className="section-title"></h2> */}
        <div className="cocktails-center">
          <h3>courseList</h3>
          {/* {courses.map((course) => {
            return <Course key={item.id} {...item} />;
          })} */}
        </div>
      </section>
    );
}

export default CourseList
