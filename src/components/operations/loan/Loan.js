import classes from "../common.module.css";
import OperationCard from "../OperationCard";
import { useDispatch } from "react-redux";
import { accActions } from "../../../store";
import useInput from "../../../hooks/use-input";
import currentDate from "../../../helpers/currentDate";

const Loan = (props) => {
  const dispatch = useDispatch();

  const {
    value: loan,
    isValid: loanIsValid,
    setIsTouched: setLoanIsTouched,
    hasError: loanHasError,
    valueChangeHandler: loanInputChangeHandler,
    valueBlurHandler: loanBlurHandler,
    reset: loanInputReset,
  } = useInput((value) => value.trim().length !== 0 && !isNaN(+value));

  let formIsValid = false;
  if (loanIsValid) {
    formIsValid = true;
  }

  const date = currentDate();

  const submitHandler = (event) => {
    event.preventDefault();
    setLoanIsTouched(true);

    if (!formIsValid) {
      return;
    }

    dispatch(accActions.requestLoan({ amount: +loan, date: date }));

    loanInputReset();
  };

  const loanClasses = loanHasError ? `${classes.invalid}` : "";

  return (
    <OperationCard className="loanWrapper">
      <p className={classes.header}>Request loan</p>
      <form onSubmit={submitHandler} className={classes.inputsWrapper}>
        <div className={classes.inputsDiv}>
          <input
            onBlur={loanBlurHandler}
            className={loanClasses}
            value={loan}
            onChange={loanInputChangeHandler}
          />
          <label>Amount</label>
        </div>
        <button>&rarr;</button>
      </form>
    </OperationCard>
  );
};

export default Loan;
