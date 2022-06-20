import React from "react";
import { Link } from "react-router-dom";
import { Shift } from "../../Contracts/Provider";
import { ProviderShift } from "./ProviderShift";
import styles from "./UpcomingShifts.module.css";

export function UpcomingShifts(props: {
  assignedShifts?: Shift[];
}): React.ReactElement {
  let shiftsToShow: Shift[] = [];
  if (props.assignedShifts && props.assignedShifts.length > 5) {
    shiftsToShow = props.assignedShifts
      ?.sort((s1, s2) => (s1.startTime < s2.startTime ? -1 : 1))
      .slice(0, 5);
  } else {
    shiftsToShow = props.assignedShifts ?? [];
  }

  return (
    <>
      <h2>Upcoming Shifts</h2>
      {!!shiftsToShow.length && (
        <>
          {shiftsToShow.map((s) => {
            return <ProviderShift key={s.jobId} shift={s}></ProviderShift>;
          })}
        </>
      )}
      {props.assignedShifts && props.assignedShifts.length > 5 && (
        <div className={styles.link}>
          <Link to={"/providers/ammar/shifts"}>
            <b>View All</b>
          </Link>
        </div>
      )}
    </>
  );
}
