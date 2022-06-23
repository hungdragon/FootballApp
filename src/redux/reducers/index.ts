import { combineReducers } from 'redux';
import FootballSlice from 'src/screens/football/Booking-Football/FootballSlice';
import cableSlice from 'src/screens/football/cable/cableSlice';
import FindPitchSlice from 'src/screens/football/FindPitchSlice';
import userSlice from 'src/screens/user/userSlice';
import { UserReducer } from './userReducer';

const rootReducer:any = combineReducers({
    userReducer: UserReducer,
    //shoppingReducer: ShoppingReducer
    userState: userSlice,
    footbalState:FootballSlice,
    findPitchState:FindPitchSlice,
    cableState:cableSlice
})

export type ApplicationState = ReturnType<typeof rootReducer>
export { rootReducer}