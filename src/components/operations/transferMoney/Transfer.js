import classes from "../common.module.css";
import OperationCard from "../OperationCard";
import { useDispatch } from "react-redux";
import { accActions } from "../../../store/index";
import useInput from "../../../hooks/use-input";
import currentDate from "../../../helpers/currentDate";

const Transfer = (props) => {
  const {
    value: amount,
    isValid: amountIsValid,
    setIsTouched: setAmountIsTouched,
    hasError: hasAmountError,
    valueChangeHandler: amountInputChangeHandler,
    valueBlurHandler: amountBlurHandler,
    reset: amountInputReset,
  } = useInput((value) => value.trim().length !== 0 && !isNaN(+value));

  const {
    value: transferTo,
    isValid: transferToIsValid,
    setIsTouched: setTransferToIsTouched,
    hasError: hasTransferToError,
    valueChangeHandler: transferToInputChangeHandler,
    valueBlurHandler: transferToBlurHanlder,
    reset: transferToInputReset,
  } = useInput((value) => value.trim().length !== 0);

  let formIsValid = false;
  if (amountIsValid && transferToIsValid) {
    formIsValid = true;
  }

  const dispatch = useDispatch();
  const date = currentDate();

  const submitHandler = (event) => {
    event.preventDefault();

    setAmountIsTouched(true);
    setTransferToIsTouched(true);

    if (!formIsValid) {
      return;
    }

    dispatch(accActions.transfer({ amount: +amount, date: date }));
    amountInputReset();
    transferToInputReset();
  };

  const amountClasses = hasAmountError ? `${classes.invalid}` : "";
  const transferToClasses = hasTransferToError ? `${classes.invalid}` : "";

  return (
    <OperationCard className="transferWrapper">
      <p className={classes.header}>Transfer Money</p>
      <form onSubmit={submitHandler} className={classes.inputsWrapper}>
        <div className={classes.inputsDiv}>
          <input
            className={transferToClasses}
            onBlur={transferToBlurHanlder}
            value={transferTo}
            onChange={transferToInputChangeHandler}
          />
          <label>Transfer To</label>
        </div>
        <div className={classes.inputsDiv}>
          <input
            onBlur={amountBlurHandler}
            className={amountClasses}
            value={amount}
            onChange={amountInputChangeHandler}
          />
          <label>Amount</label>
        </div>
        <button>&rarr;</button>
      </form>
    </OperationCard>
  );
};

export default Transfer;
