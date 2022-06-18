import { useRef, useState } from "react";
import { DayOfWeek } from "../../Contracts/Provider";
import styles from "./Calendar.module.css";

interface Availability {
  dayOfWeek: DayOfWeek;
  startTime: Date;
  endTime: Date;
}

type DayOfWeekString = "Mon" | "Tue" | "Wed" | "Thu" | "Fri" | "Sat" | "Sun";

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

function dayOfWeekToEnum(dayOfWeek: DayOfWeekString): DayOfWeek {
  switch (dayOfWeek) {
    case "Mon":
      return DayOfWeek.Monday;
    case "Tue":
      return DayOfWeek.Tuesday;
    case "Wed":
      return DayOfWeek.Wednesday;
    case "Thu":
      return DayOfWeek.Thursday;
    case "Fri":
      return DayOfWeek.Friday;
    case "Sat":
      return DayOfWeek.Saturday;
    case "Sun":
      return DayOfWeek.Sunday;
  }
}

function datifyTime(timeOfDay: TimeOfDayString): Date {
  switch (timeOfDay) {
    case "12am":
      return new Date(0, 0, undefined, 0);
    case "1am":
      return new Date(0, 0, undefined, 1);
    case "2am":
      return new Date(0, 0, undefined, 2);
    case "3am":
      return new Date(0, 0, undefined, 3);
    case "4am":
      return new Date(0, 0, undefined, 4);
    case "5am":
      return new Date(0, 0, undefined, 5);
    case "6am":
      return new Date(0, 0, undefined, 6);
    case "7am":
      return new Date(0, 0, undefined, 7);
    case "8am":
      return new Date(0, 0, undefined, 8);
    case "9am":
      return new Date(0, 0, undefined, 9);
    case "10am":
      return new Date(0, 0, undefined, 10);
    case "11am":
      return new Date(0, 0, undefined, 11);
    case "12pm":
      return new Date(0, 0, undefined, 12);
    case "1pm":
      return new Date(0, 0, undefined, 13);
    case "2pm":
      return new Date(0, 0, undefined, 14);
    case "3pm":
      return new Date(0, 0, undefined, 15);
    case "4pm":
      return new Date(0, 0, undefined, 16);
    case "5pm":
      return new Date(0, 0, undefined, 17);
    case "6pm":
      return new Date(0, 0, undefined, 18);
    case "7pm":
      return new Date(0, 0, undefined, 19);
    case "8pm":
      return new Date(0, 0, undefined, 20);
    case "9pm":
      return new Date(0, 0, undefined, 21);
    case "10pm":
      return new Date(0, 0, undefined, 22);
    case "11pm":
      return new Date(0, 0, undefined, 23);
  }
}

function generateAvailability(
  dayOfWeek: DayOfWeek,
  startTime: Date
): Availability {
  return {
    dayOfWeek,
    startTime,
    endTime: new Date(0, 0, undefined, startTime.getHours() + 1),
  };
}

export function Calendar(): React.ReactElement {
  const [availabilities, setAvailabilities] = useState<
    Map<string, Availability>
  >(new Map<string, Availability>());

  const mouseDown = useRef(false);
  window.onmousedown = () => {
    mouseDown.current = true;
  };
  window.onmouseup = () => {
    mouseDown.current = false;
  };

  let daysOfWeek: DayOfWeekString[] = [
    "Mon",
    "Tue",
    "Wed",
    "Thu",
    "Fri",
    "Sat",
    "Sun",
  ];

  let hoursOfDay: TimeOfDayString[] = [
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

  const updateAvailabilities = (
    key: string,
    dayOfWeek: DayOfWeekString,
    hourOfDay: TimeOfDayString
  ) => {
    setAvailabilities((a) => {
      let newAvailabilities = new Map<string, Availability>(a);
      if (a.has(key)) {
        newAvailabilities.delete(key);
      } else {
        let availability = generateAvailability(
          dayOfWeekToEnum(dayOfWeek),
          datifyTime(hourOfDay)
        );
        newAvailabilities.set(key, availability);
      }
      return newAvailabilities;
    });
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
            return (
              <tr key={hourOfDay}>
                <td key={`${hourOfDay}Header`}>{hourOfDay}</td>
                {daysOfWeek.map((dayOfWeek) => {
                  let key = `${dayOfWeek.toString()}${hourOfDay}`;
                  let className = availabilities.has(key)
                    ? styles.green
                    : undefined;
                  return (
                    <td
                      key={key}
                      className={className}
                      onMouseDown={(e) => {
                        e.preventDefault();
                        updateAvailabilities(key, dayOfWeek, hourOfDay);
                      }}
                      onMouseOver={(e) => {
                        e.preventDefault();
                        if (mouseDown.current) {
                          updateAvailabilities(key, dayOfWeek, hourOfDay);
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
