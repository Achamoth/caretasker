import React from "react";
import { Shift } from "../../Contracts/Provider";

export function UpcomingShifts(props: {
  assignedShifts?: Shift[];
}): React.ReactElement {
  return (
    <>
      <h1>Upcoming Shifts</h1>
      {!!props.assignedShifts?.length && (
        <>
          <ul>
            {props.assignedShifts.map((s) => {
              return <li key={s.jobId}>{s.jobName}</li>;
            })}
          </ul>
        </>
      )}
    </>
  );
}
