import {
  Availability,
  DayOfWeek,
  Provider,
  Shift,
} from "../Contracts/Provider";

const wait = (ms: number): Promise<void> => {
  return new Promise((resolve) => setTimeout(resolve, ms));
};

export async function getProviderData(): Promise<Provider[]> {
  await wait(100);
  return new Promise((resolve, reject) => resolve(Providers));
}

export async function updateOrAddProvider(provider: Provider) {
  let existingIndex = Providers.findIndex((p) => p.name === provider.name);
  if (existingIndex !== -1) {
    Providers[existingIndex] = provider;
  } else {
    Providers.push(provider);
  }
}

export async function getRecommendedShifts(
  providerName: string
): Promise<Shift[]> {
  await wait(10);
  let provider = Providers.find(
    (p) => p.name.toLowerCase() === providerName.toLowerCase()
  );
  if (!provider) return [];
  let availabilities = collapseAvailabilities(provider.availabilities ?? []);
  // Doesn't handle overnight shifts properly. Need to handle this.
  return Shifts.filter(
    (s) =>
      !s.assignedTo &&
      availabilities.find(
        (a) =>
          dayOfWeekToNum(a.dayOfWeek) === s.startTime.getDay() &&
          (a.startTime.getHours() <= s.startTime.getHours() ||
            a.startTime.getDay() < s.startTime.getDay()) &&
          (a.endTime.getHours() >= s.endTime.getHours() ||
            a.endTime.getDay() > s.endTime.getDay())
      )
  );
}

export async function getAssignedShifts(
  providerName: string
): Promise<Shift[]> {
  await wait(10);
  return Shifts.filter(
    (s) => s.assignedTo?.toLowerCase() === providerName.toLowerCase()
  );
}

function dayOfWeekToNum(day: DayOfWeek) {
  switch (day) {
    case DayOfWeek.Monday:
      return 1;
    case DayOfWeek.Tuesday:
      return 2;
    case DayOfWeek.Wednesday:
      return 3;
    case DayOfWeek.Thursday:
      return 4;
    case DayOfWeek.Friday:
      return 5;
    case DayOfWeek.Saturday:
      return 6;
    case DayOfWeek.Sunday:
      return 0;
  }
}

function collapseAvailabilities(
  availabilities: Availability[]
): Availability[] {
  if (availabilities.length === 0) return [];
  let sortedAvailabilities = availabilities.sort(
    (a1, a2) => dayOfWeekToNum(a1.dayOfWeek) - dayOfWeekToNum(a2.dayOfWeek)
  );
  let result: Availability[] = [];

  DaysOfWeek.forEach((d) => {
    let availabilitiesForDayOfWeek = sortedAvailabilities
      .filter((a) => a.dayOfWeek === d)
      .sort((a1, a2) => a1.startTime.getHours() - a2.startTime.getHours());
    if (availabilitiesForDayOfWeek.length > 0) {
      let currentAvailability = { ...availabilitiesForDayOfWeek[0] };
      for (let i = 1; i < availabilitiesForDayOfWeek.length; i++) {
        let availability = availabilitiesForDayOfWeek[i];
        if (
          currentAvailability.endTime.getHours() ===
            availability.startTime.getHours() &&
          currentAvailability.dayOfWeek === availability.dayOfWeek
        ) {
          currentAvailability.endTime = availability.endTime;
        } else {
          result.push(currentAvailability);
          currentAvailability = { ...availability };
        }
      }
      result.push(currentAvailability);
    }
  });
  return result;
}

var DaysOfWeek = [
  DayOfWeek.Monday,
  DayOfWeek.Tuesday,
  DayOfWeek.Wednesday,
  DayOfWeek.Thursday,
  DayOfWeek.Friday,
  DayOfWeek.Saturday,
  DayOfWeek.Sunday,
];

var Providers: Provider[] = [
  {
    name: "Ammar Abu Shamleh",
    title: "Mr",
    dateOfBirth: new Date(1997, 3, 24),
    summary:
      "I am a professional nurse with over 6 years of experience in the aged care industry. I have a deep passion for providing the highest quality healthcare to our elderly population, and continually strive to better myself.",
    qualifications: [
      {
        name: "Bachelor of Nursing",
        institutionName: "Murdoch University",
        dateAchieved: new Date(2018, 11),
      },
      {
        name: "Master of Nursing",
        institutionName: "The University of Notre Dame Australia",
        dateAchieved: new Date(2019, 11),
      },
      {
        name: "Working With Vulnerable People",
        dateAchieved: new Date(2022, 4, 7),
        expiryDate: new Date(2023, 4, 8),
      },
    ],
    availabilities: [
      {
        dayOfWeek: DayOfWeek.Saturday,
        startTime: new Date(0, 1, 1, 1),
        endTime: new Date(0, 1, 1, 2),
      },
    ],
  },
];

var UnassignedShifts: Shift[] = [
  {
    organisationName: "St Rita's Nursing Home",
    jobId: "10307",
    jobName: "Registered Nurse",
    location: "North Perth",
    postCode: "6006",
    description:
      "We need an experienced aged care nurse to fill in a shift for next Tuesday.",
    startTime: new Date(2022, 7, 3, 8),
    endTime: new Date(2022, 7, 3, 16),
    facilityType: "Nursing",
  },
];

var AssignedShifts: Shift[] = [
  {
    organisationName: "St Rita's Nursing Home",
    jobId: "10302",
    jobName: "Registered Nurse",
    location: "North Perth",
    postCode: "6006",
    description:
      "We need an experienced aged care nurse to fill in a shift for next Monday.",
    startTime: new Date(2022, 6, 27, 8),
    endTime: new Date(2022, 6, 27, 16),
    facilityType: "Nursing",
    assignedTo: "Ammar Abu Shamleh",
  },
  {
    organisationName: "St Rita's Nursing Home",
    jobId: "10303",
    jobName: "Registered Nurse",
    location: "North Perth",
    postCode: "6006",
    description:
      "We need an experienced aged care nurse to fill in a shift for next Monday.",
    startTime: new Date(2022, 6, 28, 8),
    endTime: new Date(2022, 6, 28, 16),
    facilityType: "Nursing",
    assignedTo: "Ammar Abu Shamleh",
  },
  {
    organisationName: "Bentley Hospital - DACR",
    jobId: "10304",
    jobName: "Aged Care Nurse",
    location: "Bentley",
    postCode: "6102",
    description:
      "We need an experienced aged care nurse to fill in a shift for next Monday.",
    startTime: new Date(2022, 6, 29, 12),
    endTime: new Date(2022, 6, 29, 20),
    facilityType: "Hospital",
    assignedTo: "Ammar Abu Shamleh",
  },
  {
    organisationName: "Mercy Care",
    jobId: "10305",
    jobName: "Home Care Nurse",
    location: "Claremont",
    postCode: "6010",
    description:
      "We need an experienced aged care nurse to fill in a shift for next Monday.",
    startTime: new Date(2022, 6, 30, 8),
    endTime: new Date(2022, 6, 30, 16),
    facilityType: "House",
    assignedTo: "Ammar Abu Shamleh",
  },
  {
    organisationName: "St Rita's Nursing Home",
    jobId: "10306",
    jobName: "Registered Nurse",
    location: "North Perth",
    postCode: "6006",
    description:
      "We need an experienced aged care nurse to fill in a shift for next Monday.",
    startTime: new Date(2022, 7, 1, 8),
    endTime: new Date(2022, 7, 1, 16),
    facilityType: "Nursing",
    assignedTo: "Ammar Abu Shamleh",
  },
  {
    organisationName: "St Rita's Nursing Home",
    jobId: "10401",
    jobName: "Registered Nurse",
    location: "North Perth",
    postCode: "6006",
    description:
      "We need an experienced aged care nurse to fill in a shift for next Tuesday.",
    startTime: new Date(2022, 7, 2, 8),
    endTime: new Date(2022, 7, 2, 16),
    facilityType: "Nursing",
    assignedTo: "Ammar Abu Shamleh",
  },
];

var Shifts: Shift[] = [...AssignedShifts, ...UnassignedShifts];
