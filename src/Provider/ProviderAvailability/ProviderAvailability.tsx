import React, { useState } from "react";
import { useEffect } from "react";
import { Availability, Provider } from "../../Contracts/Provider";
import {
  getProviderAvailabilities,
  updateProviderAvailabilties,
} from "../../MockData/MockProviderData";
import { Calendar } from "./Calendar";
import styles from "./ProviderAvailability.module.css";

export function ProviderAvailability(props: {
  provider: Provider;
  updateProvider: (p: Provider) => void;
}): React.ReactElement {
  let [availabilities, setAvailabilities] = useState<Availability[]>([]);

  useEffect(() => {
    const fetchAvailabilities = async () => {
      let initialAvailabilities = await getProviderAvailabilities(
        props.provider.name
      );
      setAvailabilities(initialAvailabilities);
    };
    fetchAvailabilities();
  }, []);

  const updateAvailabilities = (
    dispatch: (a: Availability[]) => Availability[]
  ): void => {
    setAvailabilities((a) => {
      let newAvailabilities = dispatch(a);
      updateProviderAvailabilties(props.provider.name, newAvailabilities);
      return newAvailabilities;
    });
  };

  return (
    <>
      <h1>Availabilties</h1>
      <Calendar
        availabilities={availabilities}
        setAvailabilities={updateAvailabilities}
      />
    </>
  );
}
