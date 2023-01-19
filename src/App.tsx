import React, { useState } from "react";
import OtpInput from "react18-input-otp";

const App = () => {
  const [word, setWord] = useState<string>("");

  const handleInputChange = (enteredWord: string) => {
    setWord(enteredWord);
  };

  return (
    <OtpInput
      value={word}
      onChange={handleInputChange}
      numInputs={5}
      containerStyle={{
        display: "flex",
        justifyContent: "center",
        gap: "1rem",
      }}
      inputStyle={{ height: "50px", width: "50px", fontSize: "1.5rem" }}
      shouldAutoFocus={true}
    ></OtpInput>
  );
};

export default App;
