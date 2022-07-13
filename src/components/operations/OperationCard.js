import "./OperationCard.css";
const OperationCard = (props) => {
  return (
    <div className={`mainWrapper ${props.className}`}>{props.children}</div>
  );
};

export default OperationCard;
