import { useState } from "react";
import ChoiceCard from "./components/ChoiceCard";
import QuestionCard from "./components/QuestionCard";
import sentences from "./data";
import "./styles.css";

export default function App() {
  const [choice, setChoice] = useState(null);

  function getChoiceHandler(info) {
    setChoice(info);
  }

  function closeQuestionCard() {
    setChoice(null);
  }

  return (
    <div className="App">
      {choice === null ? (
        sentences.map((sentence) => {
          return (
            <ChoiceCard
              key={sentence.id}
              sentence={sentence}
              getChoice={getChoiceHandler}
            />
          );
        })
      ) : (
        <QuestionCard choice={choice} close={closeQuestionCard} />
      )}
    </div>
  );
}
