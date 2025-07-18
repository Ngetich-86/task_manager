export interface User {
    id: string;
    username: string;
    firstname:string;
    lastname:string;
    email: string;
    password?: string;
    active:boolean;
    createdAt?: Date; 
    updatedAt?: Date; 
    role?: 'user' | 'admin'; 
}
