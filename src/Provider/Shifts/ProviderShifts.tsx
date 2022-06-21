import React, { useEffect, useState } from "react";
import { Circles } from "react-loader-spinner";
import { Provider, Shift } from "../../Contracts/Provider";
import {
  getAssignedShifts,
  getRecommendedShifts,
} from "../../MockData/MockProviderData";
import { ShiftList } from "./ShiftList";
import styles from "./ProviderShifts.module.css";

export function ProviderShifts(props: {
  provider: Provider;
}): React.ReactElement {
  const [assignedShifts, setAssignedShifts] = useState<Shift[]>();
  const [recommendedShifts, setRecommendedShifts] = useState<Shift[]>();
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const getShifts = async () => {
      setLoading(true);
      let dataAssignedShifts = await getAssignedShifts(props.provider.name);
      let dataRecommendedShifts = await getRecommendedShifts(
        props.provider.name
      );
      setAssignedShifts(dataAssignedShifts);
      setRecommendedShifts(dataRecommendedShifts);
      setLoading(false);
    };
    getShifts();
  }, [props.provider.availabilities?.length, props.provider.name]);

  return (
    <div className={styles.container}>
      <div className={styles.recommendedShifts}>
        <h2>Recommended Shifts</h2>
        {!loading && (
          <>
            <ShiftList
              shifts={recommendedShifts}
              overflowLink={"/providers/ammar/search"}
            />
          </>
        )}
        {loading && (
          <div className={styles.loading}>
            <Circles height={300} width={300} ariaLabel={"loading"} />
          </div>
        )}
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
