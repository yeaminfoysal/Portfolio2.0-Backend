
export interface IAuthProvider {
    provider: "google" | "credentials";
    providerId: string
}
export enum Role {
    USER = "USER",
    ADMIN = "ADMIN"
}

export interface IUser {
    _id?: string
    name: string;
    email: string;
    password?: string;
    role: Role;
    createdAt?: Date
}