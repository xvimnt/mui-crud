export interface User {
    email: string;
    username: string;
    email_verified: boolean;
    jwt: string,
    sub: string, // Cognito ID
}
