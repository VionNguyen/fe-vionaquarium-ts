export interface AuthContextType {
    signup: (user: UserSign, callback: VoidFunction) => Promise<void>;
    signin: (user: InitStateUser, callback: VoidFunction) => Promise<void>;
    signout: () => void;
    changeProfile: (user: ChangeProfile, callback: VoidFunction) => Promise<void>;
    getUserInfor: () => Promise<void>;
    user: (InitStateUser);
    isUserLoggedIn: Boolean;
}

export interface MoreUser {
    username: string;
}

export type UserSign = {
    email: string;
    password: string;
    id?: string;
    access_token?: string
    createdAt?: string;
    updateAt?: string;
}

export type ChangeProfile = {
    firstName: string;
    lastName: string;
    address1: string;
    address2: string;
    isUpDate: boolean;
}

export type UserAccessToken = {
    access_token?: string;
    id?: string
}

export type DataSign = {
    email: string;
    password: string;
}

export type OrInterFace = UserSign | ChangeProfile | UserAccessToken
export type AndInterFace = UserSign & ChangeProfile & UserAccessToken & MoreUser
export type SigninUser = MoreUser & UserSign
export type UpDateUser = ChangeProfile & UserAccessToken
export type InitStateUser = UserSign & ChangeProfile & MoreUser