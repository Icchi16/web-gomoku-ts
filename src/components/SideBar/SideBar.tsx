import { css, Button } from "@nextui-org/react";
import styles from "./SideBar.module.css";

export const SIDEBAR_SIZE = 230;

const SideBar = () => {
  return (
    <div className={styles.SideBar}>
      <h1>Gomoku</h1>
      <ul className={styles.BtnList}>
        <li>
          <Button>VS Friend</Button>
        </li>
        <li>
          <Button>VS Bot</Button>
        </li>
        <li>
          <Button>Guide</Button>
        </li>
      </ul>
      <br />

      <div>Game make by SirIcchi16</div>
    </div>
  );
};

export default SideBar;
