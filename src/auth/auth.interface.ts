import { Role } from "../common/enums/role.enum";

export interface JwtSign {
    access_token: string;
    refresh_token: string;
}

export interface JwtPayload {
    sub: string;
    username: string;
    role: Role;
}

export interface Payload {
    userId: string;
    username: string;
    role: Role;
}
