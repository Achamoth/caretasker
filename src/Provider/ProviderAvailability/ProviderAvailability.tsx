import React from "react";
import { Availability, Provider } from "../../Contracts/Provider";
import { Calendar } from "./Calendar";
import styles from "./ProviderAvailability.module.css";

export function ProviderAvailability(props: {
  provider: Provider;
  updateProvider: (p: Provider) => void;
}): React.ReactElement {
  let availabilities = props.provider.availabilities ?? [];

  const updateAvailabilities = (a: Availability[]): void => {
    let newProvider = { ...props.provider };
    newProvider.availabilities = a;
    props.updateProvider(newProvider);
  };

  return (
    <div className={styles.container}>
      <h2>My Availability</h2>
      <Calendar
        availabilities={availabilities}
        setAvailabilities={updateAvailabilities}
      />
    </div>
  );
}
