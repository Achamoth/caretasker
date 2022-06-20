import React from "react";
import { Provider } from "../Contracts/Provider";
import styles from "./ProviderHeader.module.css";
import image from "../MockData/ammar.jpg";
import { ProviderQualifications } from "./ProviderQualifications";

export function ProviderHeader(props: {
  provider: Provider;
  updateProvider: (p: Provider) => void;
}): React.ReactElement {
  return (
    <div className={styles.headerContainer}>
      <div className={styles.providerImage}>
        <img src={image} alt="" height={200} width={200} />
      </div>
      <div className={styles.summary}>
        <div className={styles.providerName}>
          {props.provider.title} {props.provider.name}
        </div>
        <div className={styles.providerQualifications}>
          <ProviderQualifications
            provider={props.provider}
            updateProvider={props.updateProvider}
          />
        </div>
      </div>
    </div>
  );
}
