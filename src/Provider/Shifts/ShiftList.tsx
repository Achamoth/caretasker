import React from "react";
import { Link } from "react-router-dom";
import { Shift } from "../../Contracts/Provider";
import { ProviderShift } from "./ProviderShift";
import NoShifts from "../../Images/NoShifts.svg";
import styles from "./ShiftList.module.css";

export function ShiftList(props: {
  shifts?: Shift[];
  overflowLink: string;
}): React.ReactElement {
  let shiftsToShow: Shift[] = [];
  if (props.shifts) {
    shiftsToShow = props.shifts?.sort((s1, s2) =>
      s1.startTime < s2.startTime ? -1 : 1
    );
    if (props.shifts.length > 5) {
      shiftsToShow = shiftsToShow.slice(0, 5);
    }
  }

  return (
    <>
      {!shiftsToShow ||
        (!shiftsToShow.length && (
          <div className={styles.noShifts}>
            <img
              className={styles.noShiftsImage}
              src={NoShifts}
              width={300}
              height={300}
              alt="No shifts to display"
            ></img>
            <div className={styles.noShiftsText}>No shifts to display</div>
          </div>
        ))}
      {!!shiftsToShow.length && (
        <>
          {shiftsToShow.map((s) => {
            return <ProviderShift key={s.jobId} shift={s}></ProviderShift>;
          })}
        </>
      )}
      {props.shifts && props.shifts.length > 5 && (
        <div className={styles.link}>
          <Link to={props.overflowLink}>
            <b>View All</b>
          </Link>
        </div>
      )}
    </>
  );
}
