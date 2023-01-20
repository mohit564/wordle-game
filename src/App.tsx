import React, { useState, useEffect, useRef } from "react";
import OtpInput from "react18-input-otp";
import toast, { Toaster } from "react-hot-toast";

// styles
import "./App.css";

// helpers
import { getRandomWord } from "./utils/word";

const App = () => {
  const inputRef = useRef<OtpInput | null>(null);

  const [word, setWord] = useState<string>("");
  const [target, setTarget] = useState<string>(getRandomWord());
  const [isInputDisabled, setInputDisabled] = useState<boolean>(false);
  const [containerClasses, setContainerClasses] = useState<string[]>([]);

  const handleInputChange = (text: string) => {
    if (!text.match(/^[a-zA-Z]+$/)) {
      if (inputRef.current) inputRef.current.focusInput(word.length);
      return;
    }

    setWord(text.toUpperCase());
  };

  const handleSubmit = () => {
    if (word.length < 5) {
      toast("Please enter all letters", {
        duration: 1000,
        icon: "🙏",
      });
      return;
    }

    let classes = ["submitted"];

    for (let i = 0; i < word.length; i++) {
      if (word.charAt(i) === target.charAt(i)) {
        classes.push(`correct${i + 1}`);
        continue;
      }
      if (target.includes(word.charAt(i))) {
        classes.push(`present${i + 1}`);
      }
    }

    setContainerClasses(classes);
    setInputDisabled(true);
  };

  const handleReset = () => {
    setWord("");
    setTarget(getRandomWord());
    setContainerClasses([]);
    setInputDisabled(false);
  };

  useEffect(() => {
    console.log(`Answer: ${target}`);
  }, [target]);

  const resultMessage =
    word === target ? "You Won. Congratulations!" : "You Lost. Try Again!";

  return (
    <>
      <h2 className="heading">Wordle Game</h2>
      {isInputDisabled && <h3 className="result">Result : {resultMessage}</h3>}
      <OtpInput
        ref={inputRef}
        value={word}
        onChange={handleInputChange}
        numInputs={5}
        containerStyle={`container ${containerClasses.join(" ")}`}
        inputStyle={"input-boxes"}
        focusStyle={!isInputDisabled ? "input-focus" : ""}
        onSubmit={handleSubmit}
        shouldAutoFocus={true}
        isDisabled={isInputDisabled}
      ></OtpInput>
      {(!isInputDisabled || word.length < 5) && (
        <button className="submit" onClick={handleSubmit}>
          Submit
        </button>
      )}
      {isInputDisabled && word.length === 5 && (
        <button className="reset" onClick={handleReset}>
          Reset
        </button>
      )}
      <Toaster />
    </>
  );
};

export default App;
