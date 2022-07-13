import classes from "../common.module.css";
import OperationCard from "../OperationCard";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
// import { useState } from "react";
import useInput from "../../../hooks/use-input";
import { accActions } from "../../../store";

const Close = (props) => {
  // const [validCredentials, setValidCredentials] = useState(true);
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
      dispatch(accActions.closeAcc());
    } else {
      // setValidCredentials(false);
    }

    userNameInputReset();
    pinInputReset();
  };

  const userNameClasses = usernameHasError ? `${classes.invalid}` : "";
  const pinClasses = pinHasError ? `${classes.invalid}` : "";
  return (
    <OperationCard className="closeWrapper">
      <p className={classes.header}>Close account</p>
      <form onSubmit={submitHandler} className={classes.inputsWrapper}>
        <div className={classes.inputsDiv}>
          <input
            onBlur={userNameBlurHandler}
            className={userNameClasses}
            placeholder="User"
            value={enteredUserName}
            onChange={userNameInputChangeHandler}
          />
          <label>Confirm user</label>
        </div>
        <div className={classes.inputsDiv}>
          <input
            onBlur={pinBlurHandler}
            className={pinClasses}
            placeholder="PIN"
            type="password"
            value={EnteredPin}
            onChange={pinInputChangeHandler}
          />
          <label>Confirm Pin</label>
        </div>
        <button>&rarr;</button>
      </form>
    </OperationCard>
  );
};

export default Close;
