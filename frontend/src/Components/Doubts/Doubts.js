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
            <label/>
          </form>
        </div>
      </header>
    );
}

export default Doubts
