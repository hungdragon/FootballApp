import { UserAction } from "../actions";
import { UserModel, UserState } from "../models";
const initialState = {
  user_pass: {} as UserModel,
  token: null,
  status: null,
  isLoading: true,
  isAdmin: null,
  fullName:''
};



const UserReducer = (state: UserState = initialState, action: UserAction) => {
  const { type } = action;
  switch (type) {
    case "ON_LOGIN":
      // console.log('da vao reducer')
      // console.log(action.payload)
      console.log("vào reducer lỗi rồi" + action.payload);
      var { isAdmin, token,username} = JSON.parse(JSON.stringify(action.payload)); /// cach nay HAY ---------------------
      console.log('777---username: ' + username);
      console.log("_isAdmin"+isAdmin)
      console.log("_token"+token)
      //console.log("json"+isAdmin)
      // let cat =new Object();
      // cat=action.payload;
      // cat.isAdmin;

      //console.log("admin là cc gì "+action.payload.isAdmin);
      //let b=JSON.parse(action.payload);

      // let cut_Str_Json=JSON.stringify(action.payload);
      //  cut_Str_Json.
      //console.log(cut_Str_Json.isAdmin)

      return {
        ...state,
        username:username,
        token: token,
        isLoading: false,
        isAdmin: isAdmin,
      };

    case "STATUS":
      console.log("vào reducer lỗi rồi" + action.payload);
      return {
        ...state,
        // user: action.payload,
        isLoading: false,
        isAdmin: isAdmin,
      };
    case "LOGOUT":
      //console.log("da vao reducer logout")

      return {
        ...state,
        token: null,
        isLoading: false,
        isAdmin:null,
       // username: null,
      };
    case "RETRIEVE_TOKEN":
      // console.log("da vao reduser lay lai token :" + action.payload);

      return {
        ...state,
        token: action.payload,
        isLoading: false,
        isAdmin: action.role,
      };
    // case "RETRIEVE_ROLE":
    //   // console.log("da vao reduser lay lai token :" + action.payload);

    //   return {
    //     ...state,
    //     isAdmin: action.payload,
    //     isLoading: false,
    //   };
    
    case "CHANGE_PASSWORD":
      return {
        ...state,
        user_pass: action.payload,
        isLoading: false,
      };
    case "CHANGE_NAME":
      return {
        ...state,
        user_pass: action.payload,
        isLoading: false,
        fullName:action.payload
      };
    
    case "ON_REGISTER":
      console.log("vào reducer lỗi rồi" + JSON.stringify(action.payload));
      var { isAdmin, token } = JSON.parse(JSON.stringify(action.payload)); /// cach nay HAY ---------------------
     
      return {
        ...state,
        token: token,
        isLoading: false,
        isAdmin: isAdmin,
      };

    default:
      return state;
  }
};
export { UserReducer };
