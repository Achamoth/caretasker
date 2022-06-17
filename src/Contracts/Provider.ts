export interface Provider {
    title: Title;
    name: string;
    dateOfBirth: Date;
    qualifications: Qualification[];
}

type Title = 'Mr' | 'Miss' | 'Mrs'

export interface Qualification {
    name: string;
    dateAchieved: Date;
    expiryDate?: Date;
}