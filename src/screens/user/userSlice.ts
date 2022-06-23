import {processColor, ProcessedColorValue} from 'react-native';
import {createAsyncThunk, createSlice, PayloadAction} from '@reduxjs/toolkit';
export interface typeProps {
    fullName: string;
    phoneNumber: string;
    username:string;
    requestCableData:Array<any>;
    countCable:number;

    token: null| string;
    isAdmin: null|string;


    customerDetailData:Array<any>;
    numberBooking: number;
  }
const initialState:typeProps={
    fullName:'',
    phoneNumber:'',
    username:'',
    requestCableData:[],
    countCable:0,

    customerDetailData:[],
    numberBooking:0,

    token:null,
    isAdmin:''
    
}

const userSlice=createSlice({
    name:"userInformation",
    initialState,
    reducers:{
        setFullName:(state, action:PayloadAction<string>) =>{
            state.fullName=action.payload;
        },
        setPhoneNumber:(state, action:PayloadAction<string>) =>{
            state.phoneNumber=action.payload;
        },
        changeUserName:(state, action:PayloadAction<string>) =>{
            state.username=action.payload;
        },
        setRequestCableData:(state, action:PayloadAction<any>) =>{
            state.requestCableData=action.payload;
        },
        setCountCable:(state, action:PayloadAction<number>) =>{
            state.countCable=action.payload;
        },
        setCustomerDetailData:(state, action:PayloadAction<any>) =>{
            state.customerDetailData=action.payload;
        },
        setNumberBooking:(state, action:PayloadAction<number>) =>{
            state.numberBooking=action.payload;
        },
        setToken:(state, action:PayloadAction<string| null>) =>{
            state.token=action.payload;
        },
        setIsAdmin:(state, action:PayloadAction<string| null>) =>{
            state.isAdmin=action.payload;
        },

    }
})
export const{ setToken,setIsAdmin,setFullName,setNumberBooking,setPhoneNumber,changeUserName,setRequestCableData,setCountCable,setCustomerDetailData}=userSlice.actions;
export default userSlice.reducer;