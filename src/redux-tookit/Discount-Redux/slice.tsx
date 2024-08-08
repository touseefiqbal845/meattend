// thunks/discountThunks.ts
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { RootState } from "../../store";

import { fetchAllDiscountList } from "./api";

interface DiscountState {
  discountList: Discount[];  
}

interface Discount {
  id: number;
  name: string;
  discount_code: string;
  start_date: string;
  end_date: string;
}
   
export const fetchDiscountList = createAsyncThunk<
  Discount[], 
  void,
  { rejectValue: string }
>("discount/fetchDiscountList", async (_, thunkAPI) => {
  try {
    const data: Discount[] = await fetchAllDiscountList(); 
    return data;
  } catch (error) {
    return thunkAPI.rejectWithValue("Failed to fetch discount list.");
  }
});

const initialState: DiscountState = {
  discountList: [],
};

const discountSlice = createSlice({
  name: "discount",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchDiscountList.fulfilled, (state, action) => {
      state.discountList = action.payload;
    });
  },
});

export const SelectDiscountList = (state: RootState) =>
  state.discount.discountList;

export default discountSlice.reducer;
