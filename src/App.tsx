import React, { useState, useEffect, useRef } from "react";
import OtpInput from "react18-input-otp";
import toast, { Toaster } from "react-hot-toast";

// styles
import "./App.css";

// helpers
import { getRandomWord } from "./utils/word";

const App = () => {
  const inputRef = useRef<OtpInput | null>(null);

  const [attempt, setAttempt] = useState<number>(0);
  const [responses, setResponses] = useState<string[]>(Array(6).fill(""));
  const [target, setTarget] = useState<string>(getRandomWord());
  const [containerClasses, setContainerClasses] = useState<string[][]>(
    Array(6).fill([""])
  );
  const [resultMessage, setResultMessage] = useState<string>("");
  const [isInputDisabled, setInputDisabled] = useState<boolean>(false);

  const handleInputChange = (text: string, index: number) => {
    if (!text.match(/^[a-zA-Z]+$/)) {
      inputRef.current?.focusInput(responses[index].length);
      return;
    }

    let temp = [...responses];
    temp[index] = text.toUpperCase();
    setResponses(temp);
  };

  const handleSubmit = () => {
    if (responses[attempt].length < 5) {
      toast("Please enter all letters", {
        duration: 1000,
        icon: "🙏",
      });
      return;
    }

    let classes = ["submitted"];

    for (let i = 0; i < 5; i++) {
      if (responses[attempt].charAt(i) === target.charAt(i)) {
        classes.push(`correct${i + 1}`);
        continue;
      }
      if (target.includes(responses[attempt].charAt(i))) {
        classes.push(`present${i + 1}`);
      }
    }

    let temp = [...containerClasses];
    temp[attempt] = classes;
    setContainerClasses(temp);

    if (responses[attempt] === target) {
      setResultMessage("You Won. Congratulations!");
    }

    setAttempt((prev) => prev + 1);
  };

  const handleReset = () => {
    setAttempt(0);
    setResponses(Array(6).fill(""));
    setTarget(getRandomWord());
    setContainerClasses(Array(6).fill([]));
    setResultMessage("");
    setInputDisabled(false);
  };

  useEffect(() => {
    console.log(`Answer: ${target}`);
  }, [target]);

  useEffect(() => {
    if (attempt > 5) {
      setResultMessage(`Answer was ${target}. Best Luck Next Time!`);
      setInputDisabled(true);
    }
    inputRef.current?.focusInput(0);
  }, [attempt]);

  return (
    <>
      <h2 className="heading">Wordle Game</h2>
      {resultMessage && <h3 className="result">{resultMessage}</h3>}
      {responses.map((_, index) => (
        <OtpInput
          key={index}
          ref={index === attempt ? inputRef : null}
          value={responses[index]}
          onChange={(text) => handleInputChange(text, index)}
          numInputs={5}
          containerStyle={`container ${containerClasses[index].join(" ")}`}
          inputStyle={"input-boxes"}
          focusStyle={index === attempt && !resultMessage ? "input-focus" : ""}
          onSubmit={handleSubmit}
          shouldAutoFocus={true}
          isDisabled={isInputDisabled || Boolean(resultMessage)}
        />
      ))}
      {attempt <= 5 && !resultMessage && (
        <button className="submit" onClick={handleSubmit}>
          Submit
        </button>
      )}
      {resultMessage && (
        <button className="reset" onClick={handleReset}>
          Reset
        </button>
      )}
      <Toaster />
    </>
  );
};

export default App;
