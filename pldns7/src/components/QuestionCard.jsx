import { useState } from "react";

const QuestionCard = (props) => {
  const [questionIndex, setQuestionIndex] = useState(0);
  const [showAnswer, setShowAnswer] = useState(false);
  const [isFinished, setIsFinished] = useState(false);
  const [userAnswer, setUserAnswer] = useState("");
  const [markAnswer, setMarkAnswer] = useState(false);
  const [score, setScore] = useState(0);
  const [badAnswers, setBadAnswers] = useState([]);

  function handleChange(e) {
    const { value } = e.target;
    setUserAnswer(() => value);
  }

  function handleCheckAnswer() {
    // console.log(props.choice.sentences[questionIndex].answer);
    if (userAnswer.toLowerCase() === props.choice.sentences[questionIndex].answer.toLowerCase()) {
      setMarkAnswer(true);
      setScore((curScore) => (curScore += 1));
    } else {
      setBadAnswers((prevVals) => {
        return [...prevVals, props.choice.sentences[questionIndex]];
      });
      setMarkAnswer(false);
    }
    setShowAnswer(true);
  }

  function handleNext() {
    if (questionIndex < props.choice.sentences.length - 1) {
      setShowAnswer(false);
      setUserAnswer("");
      setQuestionIndex((curIndex) => (curIndex += 1));
    } else {
      setIsFinished(true);
    }
  }

  function handleClose() {
    setScore(0);
    props.close();
  }

  return (
    <div className="question-card">
      <div className="question-header">
        <h4>{props.choice.title}</h4>
        <button className="close-btn" onClick={handleClose}>
          &times;
        </button>
      </div>
      {isFinished ? (
        <div className="finished-card">
          <p>
            You scored {score} out of {props.choice.sentences.length}
          </p>
          {badAnswers.map((ans) => {
            return (
              <div
                key={badAnswers.indexOf(ans)}
                className="answer-box incorrect"
              >
                {ans.one} <span className="answer-word">{ans.answer}</span>{" "}
                {ans.two}
              </div>
            );
          })}
          <button className="btn" onClick={handleClose}>
            Home
          </button>
        </div>
      ) : (
        <div>
          <div className="question-box">
            <p className="current-num">
              {questionIndex + 1} / {props.choice.sentences.length}
            </p>
            <p>
              <span>{props.choice.sentences[questionIndex].one} </span>
              <input
                type="text"
                placeholder={props.choice.sentences[questionIndex].clue}
                onChange={handleChange}
                value={userAnswer}
              />
              <span> {props.choice.sentences[questionIndex].two}</span>
            </p>
            <br />
            {!showAnswer && (
              <button className="btn" onClick={handleCheckAnswer}>
                Check
              </button>
            )}
          </div>
          {showAnswer && (
            <div
              className={
                markAnswer ? "answer-box correct" : "answer-box incorrect"
              }
              // style={{
              //   backgroundColor: markAnswer
              //     ? "rgba(0, 255, 0, 0.5)"
              //     : "rgba(255, 0, 0, 0.5)"
              // }}
            >
              <h5>{markAnswer ? "Correcto" : "Incorrecto"}</h5>
              <p>
                {props.choice.sentences[questionIndex].one}
                <span className="answer-word">
                  {" "}
                  {props.choice.sentences[questionIndex].answer}{" "}
                </span>
                {props.choice.sentences[questionIndex].two}
              </p>
              <button className="btn" onClick={handleNext}>
                Next
              </button>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default QuestionCard;
