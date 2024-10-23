import { useState, useCallback, useRef } from "react";
import quizCompleteImg from "../assets/quiz-complete.png";
import questions from "../questions.js";
import Timer from "./Timer.jsx";
import Answers from "./Answers.jsx";
import Question from "./Question.jsx";

export default function Quiz() {
  const [userAnswers, setUserAnswers] = useState([]);
  const currentQuestionIndex = userAnswers.length;

  const quizIsDone = currentQuestionIndex === questions.length;

  const handleSelectChoice = useCallback(function handleSelectChoice(
    selectedChoice
  ) {
    setUserAnswers((prevUserAnswers) => {
      return [...prevUserAnswers, selectedChoice];
    });
  },
  []);

  const handleSkipAnswer = useCallback(
    () => handleSelectChoice(null),
    [handleSelectChoice]
  );

  if (quizIsDone) {
    return (
      <div id="summary">
        <img src={quizCompleteImg} />
        <h2>Quiz Complete</h2>
      </div>
    );
  }

  return (
    <div id="quiz">
      <Question
        key={currentQuestionIndex}
        index={currentQuestionIndex}
        onSelectAnswer={handleSelectChoice}
        onSkipAnswer={handleSkipAnswer}
      />
    </div>
  );
}
