import React, { useState } from "react";
import "./App.css";
import quesArray from "./data/questions.json";

const App = () => {
  //defining State variables
  const [currentQIndx, setcurrentQIndx] = useState(0);
  //dont show any seclection at starts
  const [selectedOption, setSelectedOption] = useState(""); // null or ''
  //starting userScore is 0
  const [userScore, setUserScore] = useState(0);
  //at end of quiz showScore, currently it is false, when all quesArray asked it will be true
  const [showScore, setShowScore] = useState(false);

  //set selected option which user select
  const eventOptionSelect = (option) => {
    //user only select option once
    if (!selectedOption) setSelectedOption(option);
  };

  const eventNextQuestion = () => {
    //if correct answer add in user userScore
    if (selectedOption === quesArray[currentQIndx].answer) {
      setUserScore(userScore + 1);
    }

    setSelectedOption(""); // for next question make it null [not selected]

    //check if quiz is finished
    if (currentQIndx + 1 < quesArray.length) {
      setcurrentQIndx(currentQIndx + 1);
    } else {
      setShowScore(true);
    }
  };

  return (
    <div className="app">
      {showScore ? (
        <div className="quiz-section ">
          You scored {userScore} out of {quesArray.length}
        </div>
      ) : (
        <div className="quiz-section text-center p-5">
          <div className="question-section">
            <div className="question-count">
              <span>Question {currentQIndx + 1}</span>/{quesArray.length}
            </div>
            <div className="question-text fs-2">
              {quesArray[currentQIndx].question}
            </div>
          </div>
          <div className="options-section">
            {quesArray[currentQIndx].options.map((option, QuesOptionIndex) => {
              //console.log(option+" => "+QuesOptionIndex);
              const isCorrect =
                QuesOptionIndex === quesArray[currentQIndx].correctOptionIndex;
              const isSelected = selectedOption === option;

              // Applying different classes based on correctness and selection
              const optionClass = isSelected
                ? isCorrect
                  ? "correct"
                  : "wrong"
                : "";

              //console.log(" optionClass => "+optionClass);

              return (
                <button
                  key={QuesOptionIndex}
                  className={`option ${optionClass}`}
                  onClick={() => eventOptionSelect(option)}
                >
                  {option}
                </button>
              );
            })}
          </div>
          <button className="next-button" onClick={eventNextQuestion}>
            Next Question
          </button>
        </div>
      )}
    </div>
  );
};

export default App;
