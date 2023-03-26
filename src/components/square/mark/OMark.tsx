import { useSelector } from "react-redux";
import { boxWidthValue } from "../../../slices/board/board";
import styles from "./OMark.module.css"

const OMark = () => {
  const boxWidth = useSelector(boxWidthValue);

  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={boxWidth}
      height={boxWidth}
      viewBox="0 0 100 100"
    >
      <circle cx={50} cy={50} r={boxWidth} fill="transparent" className={styles.OMark}/>
    </svg>
  );
};

export default OMark;
