export interface User {
    email: string;
    nickname: string;
    email_verified: boolean;
    jwt: string,
    sub: string, // Cognito ID
}
