export interface Login {
    email: string,
    password: string
}

export interface Register {
    firstName: string,
    lastName: string,
    email: string,
    password: string,
}

export interface LoginResponse {
    token: string;
    user: UserData;
}

export interface UserData {
    createdAt: Date;
    email: string;
    password: string;
    resetToken: string | null;
    resetTokenExpires: Date | null;
    role: string;
    updatedAt: Date;
    userId: string;
    verified: boolean;
}