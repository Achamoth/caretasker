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