import React from "react";
import { Provider } from "../Contracts/Provider";
import styles from "./ProviderHeader.module.css";
import image from "../MockData/ammar.jpg";

export function ProviderHeader(props: {
  provider: Provider;
  updateProvider: (p: Provider) => void;
}): React.ReactElement {
  return (
    <>
      <span className={styles.providerImage}>
        <img src={image} alt="Profile photo" height={200} width={200} />
      </span>
      <span className={styles.providerName}>
        {props.provider.title} {props.provider.name}
      </span>
    </>
  );
}
