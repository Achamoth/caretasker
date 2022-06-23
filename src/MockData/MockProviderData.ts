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
  await wait(1000);
  let provider = Providers.find(
    (p) => p.name.toLowerCase() === providerName.toLowerCase()
  );
  if (!provider) return [];
  let availabilities = collapseAvailabilities(provider.availabilities ?? []);
  // Doesn't deal with overnight shifts properly
  return Shifts.filter(
    (s) =>
      !s.assignedTo &&
      availabilities.find(
        (a) =>
          (dayOfWeekToNum(a.startDayOfWeek) < s.startTime.getDay() &&
            dayOfWeekToNum(a.endDayOfWeek) > s.endTime.getDay()) ||
          (dayOfWeekToNum(a.startDayOfWeek) === s.startTime.getDay() &&
            a.startTime.getHours() <= s.startTime.getHours() &&
            (a.endTime.getHours() >= s.endTime.getHours() ||
              dayOfWeekToNum(a.endDayOfWeek) > s.endTime.getDay()))
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
    case DayOfWeek.Sunday:
      return 0;
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
  }
}

type MergedAvailability = {
  startDayOfWeek: DayOfWeek;
  startTime: Date;
  endDayOfWeek: DayOfWeek;
  endTime: Date;
};

// Doesn't deal with Saturday -> Sunday properly (Saturday availabilities get broken if they go to midnight)
function collapseAvailabilities(
  availabilities: Availability[]
): MergedAvailability[] {
  if (availabilities.length === 0) return [];
  let sortedAvailabilities = availabilities.sort((a1, a2) => {
    let orderByDay =
      dayOfWeekToNum(a1.dayOfWeek) - dayOfWeekToNum(a2.dayOfWeek);
    if (orderByDay === 0) {
      return a1.startTime.getHours() - a2.startTime.getHours();
    }
    return orderByDay;
  });
  let result: MergedAvailability[] = [];

  let currentAvailability = {
    ...sortedAvailabilities[0],
    startDayOfWeek: sortedAvailabilities[0].dayOfWeek,
    endDayOfWeek: sortedAvailabilities[0].dayOfWeek,
  };
  for (let i = 1; i < sortedAvailabilities.length; i++) {
    let availability = sortedAvailabilities[i];
    if (
      currentAvailability.endTime.getHours() ===
        availability.startTime.getHours() &&
      currentAvailability.dayOfWeek === availability.dayOfWeek
    ) {
      currentAvailability.endTime = availability.endTime;
    } else if (
      currentAvailability.endTime.getHours() === 0 &&
      availability.startTime.getHours() === 0 &&
      currentAvailability.dayOfWeek === dayBefore(availability.dayOfWeek)
    ) {
      currentAvailability.endTime = availability.endTime;
      currentAvailability.endDayOfWeek = availability.dayOfWeek;
    } else {
      if (currentAvailability.endTime.getHours() === 0) {
        currentAvailability.endDayOfWeek = dayAfter(
          currentAvailability.startDayOfWeek
        );
      }
      result.push(currentAvailability);
      currentAvailability = {
        ...availability,
        startDayOfWeek: availability.dayOfWeek,
        endDayOfWeek: availability.dayOfWeek,
      };
    }
  }
  if (currentAvailability.endTime.getHours() === 0) {
    currentAvailability.endDayOfWeek = dayAfter(
      currentAvailability.startDayOfWeek
    );
  }
  result.push(currentAvailability);
  return result;
}

function dayAfter(dayOfWeek: DayOfWeek): DayOfWeek {
  switch (dayOfWeek) {
    case DayOfWeek.Monday:
      return DayOfWeek.Tuesday;
    case DayOfWeek.Tuesday:
      return DayOfWeek.Wednesday;
    case DayOfWeek.Wednesday:
      return DayOfWeek.Thursday;
    case DayOfWeek.Thursday:
      return DayOfWeek.Friday;
    case DayOfWeek.Friday:
      return DayOfWeek.Saturday;
    case DayOfWeek.Saturday:
      return DayOfWeek.Sunday;
    case DayOfWeek.Sunday:
      return DayOfWeek.Monday;
  }
}

function dayBefore(dayOfWeek: DayOfWeek): DayOfWeek {
  switch (dayOfWeek) {
    case DayOfWeek.Monday:
      return DayOfWeek.Sunday;
    case DayOfWeek.Tuesday:
      return DayOfWeek.Monday;
    case DayOfWeek.Wednesday:
      return DayOfWeek.Tuesday;
    case DayOfWeek.Thursday:
      return DayOfWeek.Wednesday;
    case DayOfWeek.Friday:
      return DayOfWeek.Thursday;
    case DayOfWeek.Saturday:
      return DayOfWeek.Friday;
    case DayOfWeek.Sunday:
      return DayOfWeek.Saturday;
  }
}

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
        startTime: new Date(0, 1, 1, 0),
        endTime: new Date(0, 1, 1, 1),
      },
      {
        dayOfWeek: DayOfWeek.Saturday,
        startTime: new Date(0, 1, 1, 1),
        endTime: new Date(0, 1, 1, 2),
      },
      {
        dayOfWeek: DayOfWeek.Saturday,
        startTime: new Date(0, 1, 1, 2),
        endTime: new Date(0, 1, 1, 3),
      },
      {
        dayOfWeek: DayOfWeek.Saturday,
        startTime: new Date(0, 1, 1, 3),
        endTime: new Date(0, 1, 1, 4),
      },
      {
        dayOfWeek: DayOfWeek.Saturday,
        startTime: new Date(0, 1, 1, 4),
        endTime: new Date(0, 1, 1, 5),
      },
      {
        dayOfWeek: DayOfWeek.Saturday,
        startTime: new Date(0, 1, 1, 5),
        endTime: new Date(0, 1, 1, 6),
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
    startTime: new Date(2022, 6, 3, 8),
    endTime: new Date(2022, 6, 3, 16),
    facilityType: "Nursing",
  },
  {
    organisationName: "The Richardson Aged Care",
    jobId: "10308",
    jobName: "Registered Nurse",
    location: "West Perth",
    postCode: "6005",
    description:
      "We need an experienced aged care nurse to fill in a shift for next Tuesday.",
    startTime: new Date(2022, 6, 1, 1),
    endTime: new Date(2022, 6, 1, 8),
    facilityType: "Nursing",
  },
  {
    organisationName: "Claremont Hospital",
    jobId: "10311",
    jobName: "Disability Nurse",
    location: "Claremont",
    postCode: "6010",
    description:
      "We need an experienced aged care nurse to fill in a shift for next Tuesday.",
    startTime: new Date(2022, 6, 8, 16),
    endTime: new Date(2022, 6, 8, 20),
    facilityType: "Hospital",
  },
  {
    organisationName: "Hills Nursing",
    jobId: "10452",
    jobName: "Admiral Nurse",
    location: "Joondalup",
    postCode: "6027",
    description:
      "We need an experienced aged care nurse to fill in a shift for next Tuesday.",
    startTime: new Date(2022, 6, 14, 9),
    endTime: new Date(2022, 6, 14, 14),
    facilityType: "House",
  },
  {
    organisationName: "Care2U",
    jobId: "10322",
    jobName: "Parkinson's Nurse Specialist",
    location: "Dianella",
    postCode: "6059",
    description:
      "We need an experienced aged care nurse to fill in a shift for next Tuesday.",
    startTime: new Date(2022, 6, 17, 10),
    endTime: new Date(2022, 6, 17, 16),
    facilityType: "House",
  },
  {
    organisationName: "The Richardson Aged Care",
    jobId: "10333",
    jobName: "Registered Nurse",
    location: "West Perth",
    postCode: "6005",
    description:
      "We need an experienced aged care nurse to fill in a shift for next Tuesday.",
    startTime: new Date(2022, 6, 11, 12),
    endTime: new Date(2022, 6, 11, 20),
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
    startTime: new Date(2022, 5, 27, 8),
    endTime: new Date(2022, 5, 27, 16),
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
    startTime: new Date(2022, 5, 28, 8),
    endTime: new Date(2022, 5, 28, 16),
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
    startTime: new Date(2022, 5, 29, 12),
    endTime: new Date(2022, 5, 29, 20),
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
    startTime: new Date(2022, 5, 30, 8),
    endTime: new Date(2022, 5, 30, 16),
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
