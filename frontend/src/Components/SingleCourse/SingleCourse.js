import React from 'react'
import { useParams, Link } from "react-router-dom";

function SingleCourse() {
    const {id}=useParams();
    console.log(id);
    return (
      <div>
        <h1>{id}</h1>
        <Link to="/" className="btn">
          back to dashboard
        </Link>
        
      </div>
    );
}

export default SingleCourse
