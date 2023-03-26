import { useSelector } from "react-redux";
import { boxWidthValue } from "../../../slices/board/board";
import styles from "./OMark.module.css";

const OMark = () => {
  const boxWidth = useSelector(boxWidthValue);

  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={boxWidth}
      height={boxWidth}
      viewBox="0 0 100 100"
    >
      {/* <circle
        cx={50}
        cy={50}
        r={boxWidth}
        fill="transparent"
        className={styles.OMark}
      /> */}
      <g>
        <g>
          <path
            stroke="#000"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="15"
            fill="none"
            d="M50,20 A30,30 0 0,1 80,50 A30,30 0 0,1 50,80 A30,30 0 0,1 20,50 A30,30 0 0,1 50,20 Z"
          ></path>
        </g>
      </g>
    </svg>
  );
};

export default OMark;
