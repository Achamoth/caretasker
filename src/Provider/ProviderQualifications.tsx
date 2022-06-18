import React, { useEffect, useState } from "react";
import { Provider } from "../Contracts/Provider";
import styles from "./ProviderQualifications.module.css";

export function ProviderQualifications(props: {
  provider: Provider;
  updateProvider: (p: Provider) => void;
}): React.ReactElement {
  return (
    <>
      <div className={styles.qualificationHeader}>
        <h1>Qualifications</h1>
      </div>
      <div className={styles.qualificationList}>
        <ul>
          {props.provider.qualifications.map((q) => {
            return <li>{q.name}</li>;
          })}
        </ul>
      </div>
    </>
  );
}
