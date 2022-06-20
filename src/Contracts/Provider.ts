export interface Provider {
  title: Title;
  name: string;
  dateOfBirth: Date;
  summary: string;
  qualifications: Qualification[];
  availabilities?: Availability[];
}

type Title = "Mr" | "Miss" | "Mrs";

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
  Monday = "Mon",
  Tuesday = "Tue",
  Wednesday = "Wed",
  Thursday = "Thu",
  Friday = "Fri",
  Saturday = "Sat",
  Sunday = "Sun",
}

export interface Shift {
  organisationName: string;
  location: string;
  postCode: string;
  jobName: string;
  description: string;
  startTime: Date;
  endTime: Date;
  assignedTo?: string;
  jobId: string;
}
