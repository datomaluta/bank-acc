import MovementItem from "./MovementItem";
import classes from "./Movements.module.css";
import { useSelector } from "react-redux";

const Movements = (props) => {
  const movements = useSelector((state) => state.movements);

  const reversedMovements = movements.slice().reverse();
  const movementsDates = useSelector((state) => state.movementsDates);

  const reversedDates = movementsDates.slice().reverse();

  console.log(movements, movementsDates);

  return (
    <div className={classes.movementsWrapper}>
      {reversedMovements.map((movement, index) => (
        <MovementItem
          key={index}
          date={reversedDates[index]}
          type={movement > 0 ? "DEPOSIT" : "WITHDRAWAL"}
          amount={movement}
        />
      ))}
    </div>
  );
};

export default Movements;
