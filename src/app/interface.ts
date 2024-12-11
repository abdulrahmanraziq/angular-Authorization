export interface loginUpData {
    message: string;
    token: string;
    role: string;
    name: string;
    email: string;
  }
  
export interface loginUpPayload{
    email: string;
    password: string;
}

export interface GetAllUsers{
    message: string;
    allUsers: Array<IUser>;
}

export interface IUser{
    createdAt: string; 
    email: string;
    firstName: string;
    lastName: string;
    mobile: string; 
    password:string 
    role:string; 
    status:boolean; 
    _id:string
}