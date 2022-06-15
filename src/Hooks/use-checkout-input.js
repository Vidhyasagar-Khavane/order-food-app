import React, { useState } from "react";

const useCheckOutInput = (validateValue) => {
  const [enteredValue, setEnteredValue] = useState("");
  const [isTouched, setIsTouched] = useState(false);

  const inputIsValid = validateValue(enteredValue);
  const hasError = !inputIsValid && isTouched;

  const inputChangeHandler = (event) => {
    setEnteredValue(event.target.value);
  };

  const inputIsBlur = () => {
    setIsTouched(true);
  };

  const reset = () => {
    setEnteredValue("");
    setIsTouched(false);
  };
  return {
    value: enteredValue,
    isValid: inputIsValid,
    hasError,
    inputChangeHandler,
    inputIsBlur,
    reset,
  };
};
export default useCheckOutInput;
