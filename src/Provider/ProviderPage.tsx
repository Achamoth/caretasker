import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Provider } from "../Contracts/Provider";
import { getProviderData } from "../MockData/MockProviderData";
import { ProviderHeader } from "./ProviderHeader";
import { ProviderQualifications } from "./ProviderQualifications";
import styles from "./ProviderPage.module.css";
import { ProviderAvailability } from "./ProviderAvailability";

export function ProviderPage(): React.ReactElement {
  const [provider, setProvider] = useState<Provider>();
  const firstName = useParams().providerName!;

  useEffect(() => {
    const fetchProvider = async () => {
      let providers = await getProviderData();
      let currentProvider = providers.filter((p) =>
        p.name.toLocaleLowerCase().includes(firstName)
      )[0];
      setProvider(currentProvider);
    };
    fetchProvider();
  }, []);

  const updateProvider = async (p: Provider) => {
    setProvider(p);
  };

  return (
    <>
      {provider && (
        <>
          <div className={styles.provider}>
            <div className={styles.providerHeader}>
              <ProviderHeader
                provider={provider}
                updateProvider={updateProvider}
              />
            </div>
            <div className={styles.providerQualifications}>
              <ProviderQualifications
                provider={provider}
                updateProvider={updateProvider}
              />
            </div>
            <div className={styles.providerAvailabilty}>
              <ProviderAvailability
                provider={provider}
                updateProvider={updateProvider}
              />
            </div>
          </div>
        </>
      )}
    </>
  );
}
