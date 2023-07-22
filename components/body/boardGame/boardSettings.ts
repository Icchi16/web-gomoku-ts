interface BoardSettingProps {
  MAX_ROW: number;
  MAX_COL: number;
  MAX_BOX: number;
}

function boardConstructor(
  this: any,
  MAX_ROW: number,
  MAX_COL: number,
  MAX_BOX?: number
) {
  this.MAX_ROW = MAX_ROW;
  this.MAX_COL = MAX_COL;
  this.MAX_BOX = this.MAX_COL * this.MAX_ROW;
}

// Change Board Settings here
const BOARD_COLUMN = 42; //42
const BOARD_ROW = 23; //23

const boardSettings: BoardSettingProps = new (boardConstructor as any)(
  BOARD_ROW,
  BOARD_COLUMN
);

export default boardSettings;
