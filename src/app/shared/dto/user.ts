import { UserRole } from "./userRole";
export class User {
    constructor(
        public id:string = "",
        public email: string = '',
        public password: string = '',
        public roles: UserRole[] = []
    ) { }
}