import React from 'react'
import { useParams } from "react-router-dom";

function AttemptQuiz() {
    const {id,quizId}=useParams();
    return (
        <div>
            <h3>Fetching Questions....</h3>
        </div>
    )
}

export default AttemptQuiz
