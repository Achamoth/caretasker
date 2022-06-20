import { useMemo, useRef, useState } from 'react';
import styles from './Calendar.module.css';

export interface Availability {
    dayOfWeek: DayOfWeek;
    startTime: Date;
    endTime: Date;
}

export enum DayOfWeek {
    Monday = 'Mon',
    Tuesday = 'Tue',
    Wednesday = 'Wed',
    Thursday = 'Thu',
    Friday = 'Fri',
    Saturday = 'Sat',
    Sunday = 'Sun',
}

const daysOfWeek = [
    DayOfWeek.Monday,
    DayOfWeek.Tuesday,
    DayOfWeek.Wednesday,
    DayOfWeek.Thursday,
    DayOfWeek.Friday,
    DayOfWeek.Saturday,
    DayOfWeek.Sunday
];

const hoursOfDay = [
    '12am',
    '1am',
    '2am',
    '3am',
    '4am',
    '5am',
    '6am',
    '7am',
    '8am',
    '9am',
    '10am',
    '11am',
    '12pm',
    '1pm',
    '2pm',
    '3pm',
    '4pm',
    '5pm',
    '6pm',
    '7pm',
    '8pm',
    '9pm',
    '10pm',
    '11pm'
] as const;

type TimeOfDay = typeof hoursOfDay[number];

function datifyTime(timeOfDay: TimeOfDay): Date {
    switch (timeOfDay) {
        case '12am':
            return new Date(0, 1, 1, 0);
        case '1am':
            return new Date(0, 1, 1, 1);
        case '2am':
            return new Date(0, 1, 1, 2);
        case '3am':
            return new Date(0, 1, 1, 3);
        case '4am':
            return new Date(0, 1, 1, 4);
        case '5am':
            return new Date(0, 1, 1, 5);
        case '6am':
            return new Date(0, 1, 1, 6);
        case '7am':
            return new Date(0, 1, 1, 7);
        case '8am':
            return new Date(0, 1, 1, 8);
        case '9am':
            return new Date(0, 1, 1, 9);
        case '10am':
            return new Date(0, 1, 1, 10);
        case '11am':
            return new Date(0, 1, 1, 11);
        case '12pm':
            return new Date(0, 1, 1, 12);
        case '1pm':
            return new Date(0, 1, 1, 13);
        case '2pm':
            return new Date(0, 1, 1, 14);
        case '3pm':
            return new Date(0, 1, 1, 15);
        case '4pm':
            return new Date(0, 1, 1, 16);
        case '5pm':
            return new Date(0, 1, 1, 17);
        case '6pm':
            return new Date(0, 1, 1, 18);
        case '7pm':
            return new Date(0, 1, 1, 19);
        case '8pm':
            return new Date(0, 1, 1, 20);
        case '9pm':
            return new Date(0, 1, 1, 21);
        case '10pm':
            return new Date(0, 1, 1, 22);
        case '11pm':
            return new Date(0, 1, 1, 23);
    }
}

const generateAvailabilityKey = (
    dayOfWeek: DayOfWeek,
    hourOfDay: Number
): string => {
    return `${dayOfWeek.toString()}${hourOfDay}`;
};

type SelectedDateTime = {
    day: DayOfWeek,
    time: TimeOfDay,
    dateTime: Date
};

export function Calendar(props: {
    availabilities: Availability[];
    setAvailabilities: (availabilities: Availability[]) => void;
}): React.ReactElement {

    const [selection, setSelection] = useState<{
        start: SelectedDateTime | null,
        end: SelectedDateTime | null,
    }>({
        start: null,
        end: null
    })

    const [selecting, setSelecting] = useState({
        selecting: false,
        addMode: true
    });

    const [chosenDaysAndTimes, setChosenDaysAndTimes] = useState<string[]>([])

    const onMouseDown = (day: DayOfWeek, time: TimeOfDay) => {
        setSelection({
            start: {
                day,
                time,
                dateTime: datifyTime(time)
            },
            end: {
                day,
                time,
                dateTime: datifyTime(time)
            }
        });

        const clickedDateTime = `${day}-${time}`

        setSelecting({
            selecting: true,
            addMode: !(chosenDaysAndTimes.includes(clickedDateTime))
        });
    }

    const onMouseOver = (day: DayOfWeek, time: TimeOfDay) => {
        if (selecting.selecting) {
            setSelection(currentState => ({
                ...currentState,
                end: {
                    day,
                    time,
                    dateTime: datifyTime(time)
                }
            }));
        }
    }

    const validDates = useMemo(() => {
        if (selection.start && selection.end) {
            let selectedDayStartIndex = daysOfWeek.indexOf(selection.start.day);
            let selectedDayEndIndex = daysOfWeek.indexOf(selection.end.day);
            const dayStartIndex = Math.min(selectedDayStartIndex, selectedDayEndIndex);
            const dayEndIndex = Math.max(selectedDayStartIndex, selectedDayEndIndex);

            const validDays = daysOfWeek.filter((it, index) => {
                return index >= dayStartIndex && index <= dayEndIndex;
            })

            let selectedTimeStartIndex = hoursOfDay.indexOf(selection.start.time);
            let selectedTimeEndIndex = hoursOfDay.indexOf(selection.end.time);
            const timeStartIndex = Math.min(selectedTimeStartIndex, selectedTimeEndIndex);
            const timeEndIndex = Math.max(selectedTimeStartIndex, selectedTimeEndIndex);

            const validTimes = hoursOfDay.filter((it, index) => {
                return index >= timeStartIndex && index <= timeEndIndex;
            })

            return {
                days: validDays,
                times: validTimes
            }
        }

        return {
            days: [],
            times: []
        };
    }, [selection.start, selection.end])

    const onMouseUp = (day: DayOfWeek, time: TimeOfDay) => {
        setSelecting({
            selecting: false,
            addMode: true
        });

        setSelection({
            start: null,
            end: null
        })

        const dateTimes = validDates.days.flatMap(day => validDates.times.map(time => `${day}-${time}`))

        if (selecting.addMode) {
            setChosenDaysAndTimes(currentValues => ([...new Set<string>([...currentValues, ...dateTimes])]))
        } else {
            setChosenDaysAndTimes(currentValues => (currentValues.filter(it => !dateTimes.includes(it))))
        }
    }

    return (
        <div className={styles.calendar}>
            <table>
                <thead>
                <tr key='header'>
                    <th key='emptyCellHeader'></th>
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

                                const dateTime = `${dayOfWeek}-${hourOfDay}`

                                const selected = validDates.times.includes(hourOfDay) && validDates.days.includes(dayOfWeek);
                                const chosen = chosenDaysAndTimes.includes(dateTime);

                                const classNames = [
                                    selected ? styles.selected : null,
                                    chosen ? styles.chosen : null,
                                    selected && !selecting.addMode ? styles.deleteMode : null
                                ].filter(it => !!it).join(' ');

                                return (
                                    <td
                                        key={key}
                                        className={classNames}
                                        onMouseDown={(e) => {
                                            e.preventDefault();
                                            onMouseDown(dayOfWeek, hourOfDay)
                                        }}
                                        onMouseOver={(e) => {
                                            e.preventDefault();
                                            onMouseOver(dayOfWeek, hourOfDay)
                                        }}
                                        onMouseUp={(e) => {
                                            e.preventDefault();
                                            onMouseUp(dayOfWeek, hourOfDay);
                                        }}
                                    ></td>
                                );
                            })}
                        </tr>
                    );
                })}
                </tbody>
            </table>
            <div>{`Start DateTime: ${selection.start ? `Day: ${selection.start.day}, Time: ${selection.start.time}` : 'none'}`}</div>
            <div>{`End DateTime: ${selection.end ? `Day: ${selection.end.day}, Time: ${selection.end.time}` : 'none'}`}</div>
            <div>{`Valid Date/Times: ${JSON.stringify(validDates)}`}</div>
            <div>{`Chosen Date/Times: ${JSON.stringify(chosenDaysAndTimes)}`}</div>
        </div>
    );
}
