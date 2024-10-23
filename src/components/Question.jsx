import Timer from "./Timer.jsx";
import Answers from "./Answers.jsx";
import { useState } from "react";
import questions from "../questions.js";

export default function Question({ index, onSelectAnswer, onSkipAnswer }) {
  const [answer, setAnswer] = useState({
    selectedAnswer: "",
    isCorrect: null,
  });

  function handleSelectAnswer(answer) {
    setAnswer({
      selectedAnswer: answer,
      isCorrect: null,
    });

    setTimeout(() => {
      setAnswer({
        selectedAnswer: answer,
        isCorrect: questions[index].answers[0] === answer,
      });

      setTimeout(() => {
        onSelectAnswer(answer);
      }, 2000);
    }, 1000);
  }

  let answerState = "";

  if (answer.selectedAnswer && answer.isCorrect !== null) {
    answerState = answer.isCorrect ? "correct" : "wrong";
  } else if (answer.selectedAnswer) {
    answerState = "answered";
  }

  return (
    <div id="question">
      <Timer timeout={10000} onTimeout={onSkipAnswer} />
      <h2>{questions[index].text}</h2>
      <Answers
        answers={questions[index].answers}
        selectedAnswer={answer.selectedAnswer}
        answerState={answerState}
        onSelect={handleSelectAnswer}
      />
    </div>
  );
}
