import { useTheme } from "@material-tailwind/react";

interface MarkProps {
  isMarkX?: boolean;
  width: number;
}

const Mark: React.FC<MarkProps> = ({ isMarkX, width }) => {
  const { markVariant1, markVariant2 } = useTheme().colors;
  return (
    <>
      {isMarkX ? (
        <div className="select-none">
          <svg width={width} height={width} style={{ color: markVariant1 }}>
            <line
              x1={width / 5}
              y1={width / 5}
              x2={(width / 5) * 4}
              y2={(width / 5) * 4}
              stroke="currentColor"
              strokeLinecap="round"
              strokeWidth={4}
            />
            <line
              x1={(width / 5) * 4}
              y1={width / 5}
              x2={width / 5}
              y2={(width / 5) * 4}
              stroke="currentColor"
              strokeLinecap="round"
              strokeWidth={4}
            />
          </svg>
        </div>
      ) : (
        <div className="select-none">
          <svg height={width} width={width} style={{ color: markVariant2 }}>
            <circle
              cx={width / 2}
              cy={width / 2}
              r={width / 3}
              stroke="currentColor"
              strokeWidth={4}
              fillOpacity={0}
            ></circle>
          </svg>
        </div>
      )}
    </>
  );
};

export default Mark;
