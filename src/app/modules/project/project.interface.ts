export interface IProject {
    _id?: string;
    title: string;
    images: string[];
    technologies: {
        frontend?: string[];
        backend?: string[];
        database?: string[];
        tools?: string[];
    };
    repositories?: {
        client?: string;
        server?: string;
    };
    preview: string;
    overview?: string;
    features: string[];
    challenges?: string[];
    plans?: string[];
    status?: "Ongoing" | "Completed";
    category?: "Full-stack" | "Frontend" | "Backend";
    isFeatured?: boolean;
    createdAt?: Date;
    updatedAt?: Date;
}
