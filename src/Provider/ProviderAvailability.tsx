import React from "react";
import { Provider } from "../Contracts/Provider";

export function ProviderAvailability(props: {
  provider: Provider;
  updateProvider: (p: Provider) => void;
}): React.ReactElement {
  return (
    <>
      <h1>Availabilties</h1>
    </>
  );
}
