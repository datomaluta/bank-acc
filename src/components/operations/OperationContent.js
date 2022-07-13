import React from "react";
import classes from "./OperationContent.module.css";

const OperationContent = (props) => {
  return (
    <React.Fragment>
      <p className={classes.header}>{props.title}</p>
      <div className={classes.inputsWrapper}>
        <div className={classes.transferTo}>
          <input />
          <label>{props.label1}</label>
        </div>
        <div className={classes.amount}>
          <input />
          <label>{props.label2}</label>
        </div>
        <button>&rarr;</button>
      </div>
    </React.Fragment>
  );
};

export default OperationContent;
