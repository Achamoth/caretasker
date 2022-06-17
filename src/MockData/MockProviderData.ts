import { Provider } from '../Contracts/Provider'

const wait = (ms: number): Promise<void> => {
    return new Promise(resolve => setTimeout(resolve, ms));
}

export async function getProviderData(): Promise<Provider[]> {
    await wait(100);
    return new Promise((resolve, reject) => resolve([
        {
            name: 'Ammar Abu Shamleh',
            title: 'Mr',
            dateOfBirth: new Date(1997, 3, 24),
            qualifications: []
        }
    ]))
}