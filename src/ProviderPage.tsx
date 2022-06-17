import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Provider } from "./Contracts/Provider";
import { getProviderData } from "./MockData/MockProviderData";
import image from "./MockData/ammar.jpg";
import styles from "./ProviderPage.module.css";

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

  return (
    <>
      {provider && (
        <>
          <div className={styles.provider}>
            <div className={styles.providerHeader}>
              <span className={styles.providerImage}>
                <img src={image} alt="Profile photo" height={200} width={200} />
              </span>
              <span className={styles.providerName}>
                {provider.title} {provider.name}
              </span>
            </div>
            <div className={styles.providerQualifications}>
              <h1>Qualifications</h1>
            </div>
          </div>
        </>
      )}
    </>
  );
}
