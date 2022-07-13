import classes from "./MovementItem.module.css";

const MovementItem = (props) => {
  const typeClass =
    props.type === "DEPOSIT" ? `${classes.deposit}` : `${classes.withdrawal}`;
  return (
    <div className={classes.movementItem}>
      <div className={classes.typeAndDate}>
        <div className={typeClass}>{props.type}</div>
        <p>{props.date}</p>
      </div>
      <div className={classes.amount}>
        <p>
          <span>{props.amount.toFixed(2)}</span> €
        </p>
      </div>
    </div>
  );
};

export default MovementItem;
