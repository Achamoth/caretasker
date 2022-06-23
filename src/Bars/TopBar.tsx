import React from "react";
import logo from "../Images/THealthLogo.png";
import caretasker_logo from "../Images/Logo.png";
import styles from "./TopBar.module.css";

export function TopBar(): React.ReactElement {
  return (
    <div className={styles.header}>
      <div className={styles.logo}>
        <img src={logo} width={77} height={35} alt="" />
      </div>
      <div className={styles.caretaskerLogo}>
        <img src={caretasker_logo} width={168} height={40} alt="" />
      </div>
    </div>
  );
}
