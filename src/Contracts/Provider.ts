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
    startTime: string;
    endTime: string;
}

export enum DayOfWeek {
    Monday,
    Tuesday,
    Wednesday,
    Thursday,
    Friday,
    Saturday,
    Sunday
}