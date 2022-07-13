import classes from "./Current.module.css";
import { useSelector } from "react-redux";
import currentDate from "../../helpers/currentDate";

const Current = (props) => {
  const movements = useSelector((state) => state.movements);
  const balance = movements
    .reduce((prevValue, currentValue) => prevValue + currentValue)
    .toFixed(2);

  const date = currentDate(true);

  return (
    <div className={classes.wrapper}>
      <div className={classes.dateAndCurrent}>
        <p className={classes.currentText}>Current balance</p>
        <p className={classes.dateText}>{date}</p>
      </div>
      <div className={classes.balance}>
        <p>
          <span>{balance}</span> €
        </p>
      </div>
    </div>
  );
};

export default Current;
