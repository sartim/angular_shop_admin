export class User {
    id!: number;
    username!: string;
    password!: string;
    confirmPassword!: string;
    // tslint:disable-next-line:variable-name
    first_name!: string;
    // tslint:disable-next-line:variable-name
    last_name!: string;
    email!: string;
    phone!: string;
    token!: string;
    user!: {
        email: string,
        full_name: string,
        id: string
    };
}
