import React, { useState } from "react";
import { useParams,Link } from "react-router-dom";
import Axios from "axios";
function CreateQuiz() {
  const { id } = useParams();
  const [title, setTitle] = useState("");
  const [instruction, setInstruction] = useState("");
  const [topic, setTopic] = useState("");
  const [duration, setDuration] = useState(Date.now().timestamp);
  const [quizId,setQuizId]=useState(0);
  const [saved, setSaved] = useState(false);
  const handleCreateQuiz = (e) => {
    e.preventDefault();
    Axios.post("http://localhost:3002/createQuizInfo", {
      id,
      title,
      instruction,
      topic,
      duration,
    }).then((res) => {
      setQuizId(res.data[0].id);
      console.log(quizId);
      setSaved(true);
      alert("succesfully saved");
    });
    // console.log(title);
    // console.log(instruction);
    // console.log(topic);
    // console.log(duration);
  };    
    return (
      <section className="create-container">
        <form className="quizForm">
          <h3 style={{ marginLeft: "7.5em", marginBottom: "2em" }}>
            Create Quiz
          </h3>
          <div className="input-wrapper">
            <input
              type="text"
              id="title"
              value={title}
              required
              onChange={(e) => setTitle(e.target.value)}
            />
            <label htmlFor="title">Title</label>
          </div>

          <div className="input-wrapper">
            <textarea
              type="text"
              id="instruction"
              value={instruction}
              required
              onChange={(e) => setInstruction(e.target.value)}
            />
            <label htmlFor="instruction">instructions</label>
          </div>

          <div className="input-wrapper">
            <input
              type="text"
              id="topic"
              value={topic}
              required
              onChange={(e) => setTopic(e.target.value)}
            />
            <label htmlFor="topic">Topic</label>
          </div>

          <div className="input-wrapper">
            <input
              type="time"
              id="appt"
              name="appt"
              min="00:00"
              max="23:59"
              value={duration}
              required
              onChange={(e) => setDuration(e.target.value)}
            />
            <label htmlFor="appt">Quiz Duration</label>
            <div className="adjust-btn">
              {!saved && (
                <button className="btn btn-quiz" onClick={handleCreateQuiz}>
                  Save
                </button>
              )}
            </div>
          </div>
        </form>
        {saved && (
          <div className="btn-continue">
            <button className="btn btn-quiz btn-continue">
              <Link
                to={{
                  pathname: `/courses/${id}/quiz/${quizId}`,
                  // state: {
                  //   title: title,
                  //   topic: topic,
                  //   instruction: instruction,
                  //   duration: duration,
                  // },
                }}
                className="link-btn"
              >
                Continue {">>"}
              </Link>
            </button>
          </div>
        )}
      </section>
    );
}

export default CreateQuiz;
