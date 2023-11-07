export class User {
    id!: number;
    username!: string;
    password!: string;
    confirmPassword!: string;
    firstName!: string;
    lastName!: string;
    email!: string;
    phone!: string;
    token!: string;
    user!: {
      username: string,
      firstName: string,
    };
}
