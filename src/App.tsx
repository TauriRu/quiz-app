import React, { useState } from 'react';
import { fetchQuizQuestions } from './API';
/// Compnents
import QuestionCard from './components/QuestionCard';
/// Types
import { QuestionState, Difficulty } from './API';
/// Styles
import { GlobalStyle, Wrapper } from './App.styles';

type AnswerObject = {
  question: string;
  answer: string;
  correct: boolean;
  correctAnswer: string;
}


const TOTAL_QUESTIONS = 10;

const App = () => {
  const [loading, setLoading] = useState(false);
  const [questions, setQuestions] = useState<QuestionState[]>([]);
  const [number, setNumber] = useState(0);
  const [userAnswers, setUserAnswer] = useState<AnswerObject[]>([]);
  const [score, setScore] = useState(0);
  const [gameOver, setGameOver] = useState(true);

  const startTrivia = async () => {
    setLoading(true);
    setGameOver(false);

    const newQuestions = await fetchQuizQuestions(TOTAL_QUESTIONS, Difficulty.MEDIUM);

    setQuestions(newQuestions);
    setScore(0);
    setUserAnswer([]);
    setNumber(0)
    setLoading(false);
  }

  const checkAnswer = (e: React.MouseEvent<HTMLButtonElement>) => {
    if (!gameOver) {
      /// user answer
      const answer = e.currentTarget.value;

      /// Check answer against correct answer
      const correct = questions[number].correct_answer === answer;

      /// Add score if answer is correct
      if (correct) setScore(prev => prev + 1);

      /// Save answer in the array for user answers
      const answerObject = {
        question: questions[number].question,
        answer,
        correct,
        correctAnswer: questions[number].correct_answer,
      };
      setUserAnswer((prev) => [...prev, answerObject]);

    }
  };

  const nextQuestion = () => {
    /// move to next question if its not the last question
    const nextQuestion = number + 1;

    if (nextQuestion === TOTAL_QUESTIONS) {
      setGameOver(true);
    } else {
      setNumber(nextQuestion);
    }
  }

  return (
    <>
      <GlobalStyle />
      <Wrapper className="App">
        <h1>React Quiz</h1>
        {gameOver || userAnswers.length === TOTAL_QUESTIONS ? (
          <button className='start' onClick={startTrivia}>
            Start
          </button>) : null}
        {!gameOver ?
          <p className='score'>Score:{score}</p> : null}
        {loading ?
          <p className=''> <svg xmlns="http://www.w3.org/2000/svg" className='loading' width="200px" height="200px" viewBox="0 0 100 100" preserveAspectRatio="xMidYMid">
            <g>
              <circle cx="60" cy="50" r="4" fill="#689cc5">
                <animate attributeName="cx" repeatCount="indefinite" dur="1s" values="95;35" keyTimes="0;1" begin="-0.67s" />
                <animate attributeName="fill-opacity" repeatCount="indefinite" dur="1s" values="0;1;1" keyTimes="0;0.2;1" begin="-0.67s" />
              </circle>
              <circle cx="60" cy="50" r="4" fill="#689cc5">
                <animate attributeName="cx" repeatCount="indefinite" dur="1s" values="95;35" keyTimes="0;1" begin="-0.33s" />
                <animate attributeName="fill-opacity" repeatCount="indefinite" dur="1s" values="0;1;1" keyTimes="0;0.2;1" begin="-0.33s" />
              </circle>
              <circle cx="60" cy="50" r="4" fill="#689cc5">
                <animate attributeName="cx" repeatCount="indefinite" dur="1s" values="95;35" keyTimes="0;1" begin="0s" />
                <animate attributeName="fill-opacity" repeatCount="indefinite" dur="1s" values="0;1;1" keyTimes="0;0.2;1" begin="0s" />
              </circle>
            </g><g transform="translate(-15 0)">
              <path d="M50 50L20 50A30 30 0 0 0 80 50Z" fill="#93dbe9" transform="rotate(90 50 50)" />
              <path d="M50 50L20 50A30 30 0 0 0 80 50Z" fill="#93dbe9">
                <animateTransform attributeName="transform" type="rotate" repeatCount="indefinite" dur="1s" values="0 50 50;45 50 50;0 50 50" keyTimes="0;0.5;1" />
              </path>
              <path d="M50 50L20 50A30 30 0 0 1 80 50Z" fill="#93dbe9">
                <animateTransform attributeName="transform" type="rotate" repeatCount="indefinite" dur="1s" values="0 50 50;-45 50 50;0 50 50" keyTimes="0;0.5;1" />
              </path>
            </g>
          </svg></p> : null}

        {!loading && !gameOver && (
          <QuestionCard
            questionNumber={number + 1}
            totalQuestions={TOTAL_QUESTIONS}
            question={questions[number].question}
            answers={questions[number].answers}
            userAnswer={userAnswers ? userAnswers[number] : undefined}
            callback={checkAnswer}
          />)}
        {!gameOver && !loading && userAnswers.length === number + 1 && number !== TOTAL_QUESTIONS - 1 ? (
          <button className='next' onClick={nextQuestion}>Next Question</button>) : null}
      </Wrapper>
    </>
  );
}

export default App;
