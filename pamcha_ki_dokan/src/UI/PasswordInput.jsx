import React, { useState } from "react";
import classes from "./InputForm.module.css";
import ButtonForm from "./buttonForm";
import { faEye, faEyeSlash } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
const PasswordInput = (props) => {
  const [showPassword, setShowPassword] = useState(false);
  const divClasses = `${classes["input-container"]} ${props.className}`;
  const labelClasses = `${classes.filled}  ${props.className}`;
  const isShowPassword = () => {
    setShowPassword(!showPassword);
  };
  return (
    <div className={divClasses}>
      <input
        name="password"
        type={`${showPassword ? "text" : "password"}`}
        value={props.value}
        onChange={props.onChange}
        onBlur={props.onBlur}
        id={props.label.toLowerCase()}
      />
      <label
        htmlFor={props.label.toLowerCase()}
        className={props.value && labelClasses}
      >
        {props.label}
      </label>
      <ButtonForm
        className="absolute bottom-[27%] right-[5%]"
        type="button"
        onClick={isShowPassword}
        buttonContent={
          showPassword ? (
            <FontAwesomeIcon icon={faEyeSlash} />
          ) : (
            <FontAwesomeIcon icon={faEye} />
          )
        }
      />
    </div>
  );
};
export default PasswordInput;
