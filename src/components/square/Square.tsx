import styles from "./Square.module.css";

const Square = ({ value, width, handleClick, id }) => {
  return (
    <div
      id={id}
      onClick={handleClick}
      className={styles.Square}
      style={{ width: `${width}px`, height: `${width}px` }}
    >
      {value}
    </div>
  );
};

export default Square;
