interface BoardSettingProps {
  MAX_ROW: number;
  MAX_COL: number;
  MAX_BOX: () => number;
}

const boardSettings: BoardSettingProps = {
  MAX_ROW: 10,
  MAX_COL: 10,
  MAX_BOX: function () {
    return this.MAX_COL * this.MAX_ROW;
  },
};

module.exports = boardSettings;
