//User Model
// export interface UserModel{
//     id?: string
//     avatar?: string,
//     username: string,
//     password:string,
//     isAdmin?: false,
//     createAt?: number,
//     isDeleted?: false,
//     token:string
// }
export interface UserModel {
    username: string;
    password: string;
  
    // token:string | null,
    //error:any
  }
  export interface UserState {
    //user: UserModel;
    token: null;
    isLoading: boolean;
    isAdmin: null;
  }
  