import { Availability, Provider, Shift } from "../Contracts/Provider";

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
  return [Shifts[1]];
}

export async function getAssignedShifts(
  providerName: string
): Promise<Shift[]> {
  await wait(10);
  return Shifts.filter(
    (s) => s.assignedTo?.toLowerCase() === providerName.toLowerCase()
  );
}

var Providers: Provider[] = [
  {
    name: "Ammar Abu Shamleh",
    title: "Mr",
    dateOfBirth: new Date(1997, 3, 24),
    qualifications: [
      { name: "Nursing degree", dateAchieved: new Date(2018, 11) },
      {
        name: "WWVP",
        dateAchieved: new Date(2022, 1, 1),
        expiryDate: new Date(2023, 1, 1),
      },
    ],
  },
];

var Shifts: Shift[] = [
  {
    organisationName: "St Rita's Nursing Home",
    jobId: "001",
    jobName: "Aged care nurse needed",
    location: "North Perth",
    postCode: "6006",
    description:
      "We need an experienced aged care nurse to fill in a shift for next Monday.",
    startTime: new Date(2022, 6, 20, 8),
    endTime: new Date(2022, 6, 20, 16),
    assignedTo: "Ammar Abu Shamleh",
  },
  {
    organisationName: "St Rita's Nursing Home",
    jobId: "002",
    jobName: "Aged care nurse needed",
    location: "North Perth",
    postCode: "6006",
    description:
      "We need an experienced aged care nurse to fill in a shift for next Tuesday.",
    startTime: new Date(2022, 6, 21, 8),
    endTime: new Date(2022, 6, 21, 16),
  },
];
