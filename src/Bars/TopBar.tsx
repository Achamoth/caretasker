import React from "react";
import logo from "../Images/THealth_logo.svg";
import styles from "./TopBar.module.css";

export function TopBar(): React.ReactElement {
  return (
    <div className={styles.header}>
      <div className={styles.logo}>
        <img src={logo} width={60} height={50} alt="" />
      </div>
      <div className={styles.text}>Caretasker</div>
    </div>
  );
}
