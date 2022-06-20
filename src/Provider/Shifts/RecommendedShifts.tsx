import React from "react";
import { Shift } from "../../Contracts/Provider";

export function RecommendedShifts(props: {
  recommendedShifts?: Shift[];
}): React.ReactElement {
  return (
    <>
      <h2>Recommended Shifts</h2>
      {!!props.recommendedShifts?.length && (
        <>
          <ul>
            {props.recommendedShifts.map((s) => {
              return <li key={s.jobId}>{s.jobName}</li>;
            })}
          </ul>
        </>
      )}
    </>
  );
}
