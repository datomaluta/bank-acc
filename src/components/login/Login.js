import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { accActions } from "../../store";
import useInput from "../../hooks/use-input";
import { useState } from "react";

import classes from "./Login.module.css";

const Login = (props) => {
  const [validCredentials, setValidCredentials] = useState(true);
  const {
    value: enteredUserName,
    isValid: enteredUserNameIsValid,
    setIsTouched: setUserNameIsTouched,
    hasError: usernameHasError,
    valueChangeHandler: userNameInputChangeHandler,
    valueBlurHandler: userNameBlurHandler,
    reset: userNameInputReset,
  } = useInput((value) => value.trim().length !== 0);

  const {
    value: EnteredPin,
    isValid: enteredPinIsValid,
    setIsTouched: setPinIsTouched,
    hasError: pinHasError,
    valueChangeHandler: pinInputChangeHandler,
    valueBlurHandler: pinBlurHandler,
    reset: pinInputReset,
  } = useInput((value) => value.trim().length === 4);

  const rightUserName = useSelector((state) => state.userName);

  const rightPin = useSelector((state) => state.pin);

  const dispatch = useDispatch();

  let formIsValid = false;
  if (enteredUserNameIsValid && enteredPinIsValid) {
    formIsValid = true;
  }

  const submitHandler = (event) => {
    event.preventDefault();
    setUserNameIsTouched(true);
    setPinIsTouched(true);

    if (!formIsValid) {
      return;
    }

    if (enteredUserName === rightUserName && +EnteredPin === rightPin) {
      dispatch(accActions.login());
    } else {
      setValidCredentials(false);
    }

    userNameInputReset();
    pinInputReset();
  };

  const userNameClasses = usernameHasError ? `${classes.invalid}` : "";
  const pinClasses = pinHasError ? `${classes.invalid}` : "";
  return (
    <div className={classes.loginWrapper}>
      <p className={classes.text}>Log in to get started</p>
      {!validCredentials && (
        <p className={classes.incorrect}>Incorrect Credentials</p>
      )}
      <form className={classes.form} onSubmit={submitHandler}>
        <input
          onBlur={userNameBlurHandler}
          className={userNameClasses}
          placeholder="User - dm"
          value={enteredUserName}
          onChange={userNameInputChangeHandler}
        />

        <input
          onBlur={pinBlurHandler}
          className={pinClasses}
          placeholder="PIN - 1111"
          type="password"
          value={EnteredPin}
          onChange={pinInputChangeHandler}
        />
        <button>Log in</button>
      </form>
    </div>
  );
};

export default Login;
