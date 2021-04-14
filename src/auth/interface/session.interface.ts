import { IUser } from "~/user/interfaces/user.interface";

export interface ISession {
    token: string;
    user: IUser;
}