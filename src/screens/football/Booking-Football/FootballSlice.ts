import {processColor, ProcessedColorValue} from 'react-native';
import {createAsyncThunk, createSlice, PayloadAction} from '@reduxjs/toolkit';


export interface typeProps {
    namePitch: string;
    timeBooking:string;
    dayPitch:string;
    id:string;
    code:string;
    comment:string;
 //   codeDayNow:string;
    data:Array<any>;
    totalCustomer:string;
    timeSlot:string;
    priceFootball:string;

    productServiceData:any;
    cocaData:any;
    bayUpData:any;
    reviveData:any;
    marData:any;

    statusPayment:string;

    codeNamePitch: string;
  }
const initialState:typeProps={
    namePitch:'',
    timeBooking:'',
    dayPitch:'',
    comment:'',
    timeSlot:'',
    priceFootball:'',
    
    id:'',
    code:'',
 ///   codeDayNow:'',
    data:[],
    totalCustomer:'',
    productServiceData:[],
    
    cocaData:[],
    bayUpData:[],
    reviveData:[],
    marData:[],

    statusPayment:'',
    codeNamePitch:''
    
}

const FootballSlice=createSlice({
    name:"Football-Information",
    initialState,
    reducers:{
        setNamePitch:(state, action:PayloadAction<string>) =>{
            state.namePitch=action.payload;
        },
        setTimeBooking:(state, action:PayloadAction<string>) =>{
            console.log('l--',action.payload);
            state.timeBooking=action.payload;
        },
        setCode:(state, action:PayloadAction<string>) =>{
            state.code=action.payload;
        },
        // setCodeDayNow:(state, action:PayloadAction<string>) =>{
        //     state.codeDayNow=action.payload;
        // },
        setData:(state, action:PayloadAction<any>) =>{
            state.data=action.payload;
        },
        setId:(state, action:PayloadAction<string>) =>{
            state.id=action.payload;
        },
        setDay:(state, action:PayloadAction<string>)=>{
            console.log('xuong day r');
            state.dayPitch=action.payload;
        },
        setProductServiceData:(state,action:PayloadAction<any>)=>{
            state.productServiceData=action.payload
        },

        setCocaData:(state,action:PayloadAction<any>)=>{
            state.cocaData=action.payload
        },
        setBayUpData:(state,action:PayloadAction<any>)=>{
            state.bayUpData=action.payload
        },
        setReviveData:(state,action:PayloadAction<any>)=>{
            state.reviveData=action.payload
        },
        setMarData:(state,action:PayloadAction<any>)=>{
            state.marData=action.payload
        },
        setStatusPayment:(state, action:PayloadAction<string>) =>{
            state.statusPayment=action.payload;
        },
        setTotalCustomer:(state, action:PayloadAction<string>) =>{
            state.totalCustomer=action.payload;
        },
        setComment:(state, action:PayloadAction<string>) =>{
            state.comment=action.payload;
        },
        setTimeSlot:(state, action:PayloadAction<string>) =>{
            state.timeSlot=action.payload;
        },
        setPriceFootball:(state, action:PayloadAction<string>) =>{
            state.priceFootball=action.payload;
        },
        setCodeNamePitch:(state, action:PayloadAction<string>) =>{
            state.codeNamePitch=action.payload;
        },
    }
})
export const{setNamePitch,setTimeBooking ,setTimeSlot,setPriceFootball,setCodeNamePitch
    ,setCode,setData,setId,setTotalCustomer,setComment,setDay,setProductServiceData,setCocaData,setBayUpData,setReviveData,setMarData,setStatusPayment}=FootballSlice.actions;
export default FootballSlice.reducer;