import { useRef } from "react";
import styles from "./Calendar.module.css";

export interface Availability {
  dayOfWeek: DayOfWeek;
  startTime: Date;
  endTime: Date;
}

export enum DayOfWeek {
  Monday = "Mon",
  Tuesday = "Tue",
  Wednesday = "Wed",
  Thursday = "Thu",
  Friday = "Fri",
  Saturday = "Sat",
  Sunday = "Sun",
}

type TimeOfDayString =
  | "12am"
  | "1am"
  | "2am"
  | "3am"
  | "4am"
  | "5am"
  | "6am"
  | "7am"
  | "8am"
  | "9am"
  | "10am"
  | "11am"
  | "12pm"
  | "1pm"
  | "2pm"
  | "3pm"
  | "4pm"
  | "5pm"
  | "6pm"
  | "7pm"
  | "8pm"
  | "9pm"
  | "10pm"
  | "11pm";

function datifyTime(timeOfDay: TimeOfDayString): Date {
  switch (timeOfDay) {
    case "12am":
      return new Date(0, 1, 1, 0);
    case "1am":
      return new Date(0, 1, 1, 1);
    case "2am":
      return new Date(0, 1, 1, 2);
    case "3am":
      return new Date(0, 1, 1, 3);
    case "4am":
      return new Date(0, 1, 1, 4);
    case "5am":
      return new Date(0, 1, 1, 5);
    case "6am":
      return new Date(0, 1, 1, 6);
    case "7am":
      return new Date(0, 1, 1, 7);
    case "8am":
      return new Date(0, 1, 1, 8);
    case "9am":
      return new Date(0, 1, 1, 9);
    case "10am":
      return new Date(0, 1, 1, 10);
    case "11am":
      return new Date(0, 1, 1, 11);
    case "12pm":
      return new Date(0, 1, 1, 12);
    case "1pm":
      return new Date(0, 1, 1, 13);
    case "2pm":
      return new Date(0, 1, 1, 14);
    case "3pm":
      return new Date(0, 1, 1, 15);
    case "4pm":
      return new Date(0, 1, 1, 16);
    case "5pm":
      return new Date(0, 1, 1, 17);
    case "6pm":
      return new Date(0, 1, 1, 18);
    case "7pm":
      return new Date(0, 1, 1, 19);
    case "8pm":
      return new Date(0, 1, 1, 20);
    case "9pm":
      return new Date(0, 1, 1, 21);
    case "10pm":
      return new Date(0, 1, 1, 22);
    case "11pm":
      return new Date(0, 1, 1, 23);
  }
}

export function Calendar(props: {
  availabilities: Availability[];
  setAvailabilities: (availabilities: Availability[]) => void;
}): React.ReactElement {
  const generateAvailabilityKey = (
    dayOfWeek: DayOfWeek,
    hourOfDay: Number
  ): string => {
    return `${dayOfWeek.toString()}${hourOfDay}`;
  };

  const generateAvailabilityMap = (
    a: Availability[]
  ): Map<string, Availability> => {
    let result = new Map<string, Availability>();
    props.availabilities.forEach((a) => {
      result.set(
        generateAvailabilityKey(a.dayOfWeek, a.startTime.getHours()),
        a
      );
    });
    return result;
  };

  let availabilityMap = generateAvailabilityMap(props.availabilities);

  const mouseDown = useRef(false);
  window.onmousedown = () => {
    mouseDown.current = true;
  };
  window.onmouseup = () => {
    mouseDown.current = false;
  };

  const daysOfWeek: DayOfWeek[] = [
    DayOfWeek.Monday,
    DayOfWeek.Tuesday,
    DayOfWeek.Wednesday,
    DayOfWeek.Thursday,
    DayOfWeek.Friday,
    DayOfWeek.Saturday,
    DayOfWeek.Sunday,
  ];

  const hoursOfDay: TimeOfDayString[] = [
    "12am",
    "1am",
    "2am",
    "3am",
    "4am",
    "5am",
    "6am",
    "7am",
    "8am",
    "9am",
    "10am",
    "11am",
    "12pm",
    "1pm",
    "2pm",
    "3pm",
    "4pm",
    "5pm",
    "6pm",
    "7pm",
    "8pm",
    "9pm",
    "10pm",
    "11pm",
  ];

  const updateAvailabilities = (dayOfWeek: DayOfWeek, startTime: Date) => {
    let key = generateAvailabilityKey(dayOfWeek, startTime.getHours());

    if (availabilityMap.has(key)) {
      availabilityMap.delete(key);
    } else {
      let availability = {
        dayOfWeek,
        startTime,
        endTime: new Date(0, 1, 1, startTime.getHours() + 1),
      };
      availabilityMap.set(key, availability);
    }
    props.setAvailabilities([...availabilityMap.values()]);
  };

  return (
    <div className={styles.calendar}>
      <table>
        <thead>
          <tr key="header">
            <th key="emptyCellHeader"></th>
            {daysOfWeek.map((d) => {
              return <td key={`${d.toString()}Header`}>{d.toString()}</td>;
            })}
          </tr>
        </thead>
        <tbody>
          {hoursOfDay.map((hourOfDay) => {
            let datifiedStartTime = datifyTime(hourOfDay);

            return (
              <tr key={hourOfDay}>
                <td key={`${hourOfDay}Header`}>{hourOfDay}</td>
                {daysOfWeek.map((dayOfWeek) => {
                  let key = generateAvailabilityKey(
                    dayOfWeek,
                    datifiedStartTime.getHours()
                  );
                  let className = availabilityMap.has(key)
                    ? styles.green
                    : undefined;

                  return (
                    <td
                      key={key}
                      className={className}
                      onMouseDown={(e) => {
                        e.preventDefault();
                        updateAvailabilities(dayOfWeek, datifiedStartTime);
                      }}
                      onMouseOver={(e) => {
                        e.preventDefault();
                        if (mouseDown.current) {
                          updateAvailabilities(dayOfWeek, datifiedStartTime);
                        }
                      }}
                    ></td>
                  );
                })}
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}
