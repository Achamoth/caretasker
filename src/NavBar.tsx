import styles from "./NavBar.module.css";

export function NavBar(): React.ReactElement {
  return (
    <div className={styles.navigation}>
      <div className={styles.link}>Home</div>
      <div className={styles.link}>Profile</div>
      <div className={styles.link}>Qualifications</div>
      <div className={styles.link}>History</div>
      <div className={styles.link}>My Shifts</div>
      <div className={styles.link}>Available Shifts</div>
      <div className={styles.link}>Training</div>
    </div>
  );
}
