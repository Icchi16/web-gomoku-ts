import { useSelector } from "react-redux";
import { boxWidthValue } from "../../../slices/board/board";

const XMark = () => {
  const boxWidth = useSelector(boxWidthValue);

  // svg attributes
  const MarkAttr = {
    strokeWidth: 15,
    stroke: "currentColor",
    strokeLinecap: "round",
  };

  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={boxWidth}
      height={boxWidth}
      fill="currentColor"
      viewBox="0 0 100 100"
    >
      <line x1={20} y1={20} x2={80} y2={80} {...MarkAttr} />
      <line x1={80} y1={20} x2={20} y2={80} {...MarkAttr} />
    </svg>
  );
};

export default XMark;
