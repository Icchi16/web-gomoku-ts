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

// Board Col needs to be odd
const boardSettings: BoardSettingProps = new (boardConstructor as any)(21, 43);

export default boardSettings;
