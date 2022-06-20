import { Shift } from "../../Contracts/Provider";
import styles from "./ProviderShift.module.css";

export function ProviderShift(props: { shift: Shift }): React.ReactElement {
  return (
    <div className={styles.container}>{props.shift.startTime.toString()}</div>
  );
}
