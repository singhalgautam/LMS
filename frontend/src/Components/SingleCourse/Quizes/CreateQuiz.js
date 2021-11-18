import React, { useState } from "react";
import { useParams,useHistory,Link } from "react-router-dom";
import Axios from "axios";
function CreateQuiz() {
  const { id } = useParams();
  const history=useHistory();

  const [title, setTitle] = useState("");
  const [instruction, setInstruction] = useState("");
  const [topic, setTopic] = useState("");
  const [duration, setDuration] = useState(Date.now().timestamp);
  const [quizId,setQuizId]=useState(0);
  const handleCreateQuiz = async(e) => {
    e.preventDefault();
    var quiz=quizId;
    await Axios.post("http://localhost:3002/createQuizInfo", {
      id,
      title,
      instruction,
      topic,
      duration,
    }).then(async (res) => {
      quiz=res.data[0].id;
      setQuizId(res.data[0].id);
      console.log(quizId);
    });
    // console.log(title);
    // console.log(instruction);
    // console.log(topic);
    // console.log(duration);
    history.push(`/courses/${id}/quiz/${quiz}`);
    alert("succesfully created");
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
              <button className="btn btn-quiz" onClick={handleCreateQuiz}>
                Save & Continue
              </button>
            </div>
          </div>
        </form>
      </section>
    );
}

export default CreateQuiz;
