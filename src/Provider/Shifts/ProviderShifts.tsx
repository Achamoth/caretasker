import React, { useEffect, useState } from "react";
import { RecommendedShifts } from "./RecommendedShifts";
import { UpcomingShifts } from "./UpcomingShifts";
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
    <>
      <div className={styles.recommendedShifts}>
        <RecommendedShifts recommendedShifts={recommendedShifts} />
      </div>
      <div className={styles.upcomingShifts}>
        <UpcomingShifts assignedShifts={assignedShifts} />
      </div>
    </>
  );
}
