export type UserType = 'Employee' | 'Customer' | 'PrintAgent' | 'PickPointManager' | 'Guest';

export interface User {
   access: string
   fullName: string
   id: string
   token: string
   userType: UserType
}

export interface SiteKey {
    value: string;
 }