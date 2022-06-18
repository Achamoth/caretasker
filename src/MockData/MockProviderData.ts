import { Availability, Provider } from '../Contracts/Provider'

const wait = (ms: number): Promise<void> => {
    return new Promise(resolve => setTimeout(resolve, ms));
}

export async function getProviderData(): Promise<Provider[]> {
    await wait(100);
    return new Promise((resolve, reject) => resolve(Providers))
}

export async function updateOrAddProvider(provider: Provider) {
    let existingIndex = Providers.findIndex(p => p.name === provider.name);
    if (existingIndex !== -1) {
        Providers[existingIndex] = provider;
    } else {
        Providers.push(provider);
    }
}

export async function updateProviderAvailabilties(providerName: string, availabilities: Availability[]) {
    let provider = Providers.find(p => p.name === providerName);
    if (provider) {
        provider.availabilities = availabilities;
    }
    console.log(Providers);
}

export async function getProviderAvailabilities(providerName: string) : Promise<Availability[]> {
    return Providers.find(p => p.name === providerName)?.availabilities ?? [];
}

var Providers: Provider[] = [
    {
        name: 'Ammar Abu Shamleh',
        title: 'Mr',
        dateOfBirth: new Date(1997, 3, 24),
        qualifications: [
            {name: 'Nursing degree', dateAchieved: new Date(2018, 11)},
            {name: 'WWVP', dateAchieved: new Date(2022, 1, 1), expiryDate: new Date(2023, 1, 1)}
        ]
    }
]