import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import _ from "lodash";
export interface typeProps {
  data: Array<any>;
  name_search:string | null;
}
const initialState: typeProps = {
  data: [],
  name_search:null
};
const SortUp = (data: any): any => {
  const dataCustomer = _.sortBy(data, [
    function (o) {
      return o.km;
    },
  ]);
  return [...dataCustomer];
};

const FindPitchSlice = createSlice({
  name: "FindPitchs",
  initialState,
  reducers: {
    setDataFind: (state, action: PayloadAction<any>) => {
      console.log('99999999--',action.payload);
      state.data = SortUp (action.payload)
    },
    setNameSearch: (state, action: PayloadAction<any>) => {
      console.log('99999999--');
      state.name_search = action.payload;
    },
  },
});
export const { setDataFind,setNameSearch } = FindPitchSlice.actions;
export default FindPitchSlice.reducer;
