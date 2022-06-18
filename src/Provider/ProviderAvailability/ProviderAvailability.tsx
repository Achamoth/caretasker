import React, { useRef, useState } from "react";
import { Provider } from "../../Contracts/Provider";
import styles from "./ProviderAvailability.module.css";

export function ProviderAvailability(props: {
  provider: Provider;
  updateProvider: (p: Provider) => void;
}): React.ReactElement {
  const [calendar, setCalendar] = useState(false);
  const [second, setSecond] = useState(false);
  const mouseDown = useRef(false);

  window.onmousedown = () => {
    mouseDown.current = true;
  };
  window.onmouseup = () => {
    mouseDown.current = false;
  };

  return (
    <>
      <h1>Availabilties</h1>
      <div className={styles.calendar}>
        <table>
          <thead>
            <tr key="header">
              <th key="empty"></th>
              <th key="monday">Monday</th>
              <th key="tuesday">Tuesday</th>
            </tr>
          </thead>
          <tbody>
            <tr key="12am">
              <td key="12amheader">12am</td>
              <td
                key="mon12am"
                className={calendar ? styles.green : undefined}
                onMouseDown={(e) => {
                  setCalendar((c) => !c);
                }}
                onMouseOver={(e) => {
                  if (mouseDown.current === true) setCalendar((c) => !c);
                }}
              ></td>
              <td
                key="tue12am"
                className={second ? styles.green : undefined}
                onMouseDown={(e) => setSecond((c) => !c)}
                onMouseOver={(e) => {
                  if (mouseDown.current === true) setSecond((c) => !c);
                }}
              ></td>
            </tr>
            <tr key="1am">
              <td key="1amheader">1am</td>
              <td key="mon1am"></td>
              <td key="tue1am"></td>
            </tr>
          </tbody>
        </table>
      </div>
    </>
  );
}
