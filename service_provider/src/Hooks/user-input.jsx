import { useState } from "react";

const useInput = (validateInput) => {
  const [enteredValue, setEnteredValue] = useState("");
  const [isTouched, setIsTouched] = useState(false);
  const [enteredNumber, setEnteredNumber] = useState("");
  const [enteredImage, setEnteredImage] = useState("");

  const enteredInputIsValid = validateInput(enteredValue);
  const hasError = !enteredInputIsValid && isTouched;
  const enteredInputNumberIsValid = validateInput(enteredNumber);
  const hasNumberError = !enteredInputNumberIsValid && isTouched;
  const enteredFileIsValid = validateInput(enteredImage);
  const hasFileHasError = !enteredFileIsValid && isTouched;

  const inputChangeHandler = (event) => {
    setEnteredValue(event.target.value);
  };
  const inputNumberChangeHandler = (event) => {
    const re = /^[0-9\b]+$/;
    if (event.target.value === "" || re.test(event.target.value)) {
      setEnteredNumber(event.target.value);
    }
  };
  const inputFileHandler = (event) => {
    console.dir(event);
    if (event.target.files.length) {
      const upload_file = event.target.files[0].name;
      setEnteredImage(upload_file);
    }
  };

  const inputBlurHandler = () => {
    setIsTouched(true);
  };

  const reset = () => {
    setEnteredValue("");
    setEnteredNumber("");
    setIsTouched(false);
    setEnteredImage("");
  };

  return {
    value: enteredValue,
    numberValue: enteredNumber,
    image: enteredImage,
    isFileValid: enteredFileIsValid,
    hasError,
    hasFileHasError,
    hasNumberError,
    inputChangeHandler,
    inputBlurHandler,
    inputNumberChangeHandler,
    inputFileHandler,
    isValid: enteredInputIsValid,
    isNumberValid: enteredInputNumberIsValid,
    reset,
  };
};

export default useInput;
