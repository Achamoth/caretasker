import React, { useEffect, useState } from "react";
import { ShiftList } from "./ShiftList";
import styles from "./ProviderShifts.module.css";
import { Provider, Shift } from "../../Contracts/Provider";
import {
  getAssignedShifts,
  getRecommendedShifts,
} from "../../MockData/MockProviderData";

export function ProviderShifts(props: {
  provider: Provider;
}): React.ReactElement {
  const [assignedShifts, setAssignedShifts] = useState<Shift[]>();
  const [recommendedShifts, setRecommendedShifts] = useState<Shift[]>();

  useEffect(() => {
    const getShifts = async () => {
      let dataAssignedShifts = await getAssignedShifts(props.provider.name);
      let dataRecommendedShifts = await getRecommendedShifts(
        props.provider.name
      );
      setAssignedShifts(dataAssignedShifts);
      setRecommendedShifts(dataRecommendedShifts);
    };
    getShifts();
  }, [props.provider.availabilities?.length, props.provider.name]);

  return (
    <div className={styles.container}>
      <div className={styles.recommendedShifts}>
        <h2>Recommended Shifts</h2>
        <ShiftList
          shifts={recommendedShifts}
          overflowLink={"/providers/ammar/search"}
        />
      </div>
      <div className={styles.upcomingShifts}>
        <h2>Upcoming Shifts</h2>
        <ShiftList
          shifts={assignedShifts}
          overflowLink={"/providers/ammar/shifts"}
        />
      </div>
    </div>
  );
}
