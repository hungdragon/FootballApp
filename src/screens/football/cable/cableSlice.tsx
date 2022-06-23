
import {createAsyncThunk, createSlice, PayloadAction} from '@reduxjs/toolkit';

export interface typeProps {
   
    listCable: Array<any>;
    idCableItem:string;
    status:string;
    contact:string;
    phone:string;
    pricePitch:string;
    timeSlot:string,
    location:string,

    signal: string | number;
}
const initialState:typeProps={
    listCable:[],
    idCableItem:'',
    status:"",

    contact:'',
    phone:'',
    pricePitch:'',
    timeSlot:'',
    location:'',

    signal:0

    
}

const CableSlice=createSlice({
    name:"Cable-State",
    initialState,
    reducers:{
       
        setListCable:(state,action:PayloadAction<any>)=>{
            state.listCable=action.payload
        },
        setIdCableItem:(state,action:PayloadAction<string>)=>{
            state.idCableItem=action.payload
        },
        setStatus:(state,action:PayloadAction<string>)=>{
            state.status=action.payload
        },
        setContact:(state,action:PayloadAction<string>)=>{
            state.contact=action.payload
        },
        setPhone:(state,action:PayloadAction<string>)=>{
            state.phone=action.payload
        },
        setPricePitch:(state,action:PayloadAction<string>)=>{
            state.pricePitch=action.payload
        },
        setTimeSlot:(state,action:PayloadAction<string>)=>{
            state.timeSlot=action.payload
        },
        setLocation:(state,action:PayloadAction<string>)=>{
            state.location=action.payload
        },
        setSignal:(state,action:PayloadAction<number>)=>{
            state.signal=action.payload
        },
    }
})
export const{setLocation,setSignal,setListCable,setIdCableItem,setStatus,setContact,setPhone,setPricePitch,setTimeSlot}=CableSlice.actions;
export default CableSlice.reducer;