export interface Provider {
    title: Title;
    name: string;
    dateOfBirth: Date;
    qualifications: Qualification[];
    availabilities?: Availability[];
}

type Title = 'Mr' | 'Miss' | 'Mrs'

export interface Qualification {
    name: string;
    dateAchieved: Date;
    expiryDate?: Date;
}

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
    Sunday = 'Sun'
}