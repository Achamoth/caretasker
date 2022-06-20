import React from "react";
import { Provider } from "../Contracts/Provider";
import styles from "./ProviderQualifications.module.css";

export function ProviderQualifications(props: {
  provider: Provider;
  updateProvider: (p: Provider) => void;
}): React.ReactElement {
  return (
    <>
      <div className={styles.summary}>{props.provider.summary}</div>
      <div className={styles.qualificationList}>
        <ul>
          {props.provider.qualifications.map((q) => {
            return (
              <li key={q.name}>
                {q.name},{" "}
                {`${q.dateAchieved.getMonth()}/${q.dateAchieved.getFullYear()}`}
                {q.expiryDate && (
                  <>
                    {" "}
                    -{" "}
                    {`${q.expiryDate.getMonth()}/${q.expiryDate.getFullYear()}`}
                  </>
                )}
                {q.institutionName && (
                  <span className={styles.institutionName}>
                    {" "}
                    ({q.institutionName})
                  </span>
                )}
              </li>
            );
          })}
        </ul>
      </div>
    </>
  );
}
