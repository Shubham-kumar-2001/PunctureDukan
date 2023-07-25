import React from "react";
import classes from "./InputForm.module.css";

const TextInput = (props) => {
  const divClasses = `${classes["input-container"]} ${props.className}`;
  const labelClasses = `${classes.filled}  ${props.className}`;
  return (
    <div className={divClasses}>
      <input
        {...props.input}
        value={props.value}
        onChange={props.onChange}
        onBlur={props.onBlur}
        id={props.label.toLowerCase()}
        disabled={props.disabled}
        checked={props.checked}
      />
      <label
        htmlFor={props.label.toLowerCase()}
        className={props.value && labelClasses}
      >
        {props.label}
      </label>
    </div>
  );
};
export default TextInput;
