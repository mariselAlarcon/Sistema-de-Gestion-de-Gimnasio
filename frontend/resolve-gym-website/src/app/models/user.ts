import { Role } from "./role";

export interface UserRequest {
    username: String;
    password: String;
    email: String;
    role: String;
    personalInformation: {
        firstName: String;
        lastName: String;
        dni: String;
        address: String;
        phoneNumber: String;
        dateOfBirth: Date;
    };
    img: {
        data: Buffer;
        contentType: String;
    }
}

export interface UserResponse {
    _id: String;
    username: String;
    password: String;
    email: String;
    role: Role;
    personalInformation: {
        firstName: String;
        lastName: String;
        dni: String;
        address: String;
        phoneNumber: String;
        dateOfBirth: Date;
    };
    img: {
        data: Buffer;
        contentType: String;
    }
}
