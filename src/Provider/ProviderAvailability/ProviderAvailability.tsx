import React, { useRef, useState } from "react";
import { Provider } from "../../Contracts/Provider";
import { Calendar } from "./Calendar";
import styles from "./ProviderAvailability.module.css";

export function ProviderAvailability(props: {
  provider: Provider;
  updateProvider: (p: Provider) => void;
}): React.ReactElement {
  return (
    <>
      <h1>Availabilties</h1>
      <Calendar />
    </>
  );
}
