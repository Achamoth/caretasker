import { Shift } from "../../Contracts/Provider";
import Nursing from "../../Images/Nursing.svg";
import Hospital from "../../Images/Hospital.svg";
import House from "../../Images/House.svg";
import styles from "./ProviderShift.module.css";

export function ProviderShift(props: { shift: Shift }): React.ReactElement {
  const getImage = () => {
    switch (props.shift.facilityType) {
      case "Hospital":
        return Hospital;
      case "House":
        return House;
      case "Nursing":
        return Nursing;
    }
  };

  return (
    <div className={styles.container}>
      <div className={styles.icon}>
        <img
          className={styles.image}
          src={getImage()}
          width={36}
          height={36}
          alt=""
        />
      </div>
      <div className={styles.content}>
        <div className={styles.date}>
          {dateToString(props.shift.startTime)}-
          {timeToString(props.shift.endTime.getHours())}
        </div>
        <div className={styles.facilityName}>
          {props.shift.organisationName}
        </div>
      </div>
      <div className={styles.jobInfo}>
        <div className={styles.location}>
          {props.shift.location}, {props.shift.postCode}
        </div>
        <div className={styles.jobName}>{props.shift.jobName}</div>
      </div>
    </div>
  );
}

function dateToString(date: Date) {
  let dateComponent = `${date.getDate()}/${date.getMonth()}/${date.getFullYear()}`;
  let timeComponent = timeToString(date.getHours());
  return `${dateComponent} ${timeComponent}`;
}

function timeToString(hours: number) {
  return `${hours <= 12 ? hours : hours - 12}${amPm(hours)}`;
}

function amPm(hours: Number): string {
  return hours < 12 ? "AM" : "PM";
}
