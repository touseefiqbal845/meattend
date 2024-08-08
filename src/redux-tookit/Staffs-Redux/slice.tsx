// thunks/discountThunks.ts
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { RootState, } from '../../store';

import { fetchCreateStaffUser,fetchGetStaffUsers} from './api';

interface DiscountState {
  staffList: string[];
}

const initialState: DiscountState = {
  staffList: [],
};

export interface StaffData {
  company_id: number;
  first_name: string;
  last_name: string;
  email_address: string;
  password: string;
  role: string;
  role_id:number;
  profile_image: string;
}

interface User {
  id: number;
  company_id: number;
  first_name: string;
  last_name: string;
  email_address: string;
  profile_image: string | null;
  role_id: number;
  is_active: number;
  password: string;
  change_password: number;
  created_at: string;
  updated_at: string;
}


export const createStaffUser = createAsyncThunk<
  string[], 
  StaffData,
  { rejectValue: string } 
>(
  "staff/createStaffUser",
  async (staffData, thunkAPI) => {
    try {
      await fetchCreateStaffUser(staffData);
      
      return ['success']; 
    } catch (error) {
      return thunkAPI.rejectWithValue('Error message'); 
    }
  }
);


export const getStaffUsers = createAsyncThunk<User[], void, { rejectValue: string }>(
  "staff/getStaffUsers",
  async (_, thunkAPI) => {
    try {
      const data: User[] = await fetchGetStaffUsers(); 
      return data;
    } catch (error) {
      return thunkAPI.rejectWithValue("Failed to get Staff Users.");
    }
  }
);



const staffSlice = createSlice({
  name: 'staff',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    // builder.addCase(fetchCreateStaffUser.fulfilled, (state, action) => {
    //   state.staffList = action.payload;
    // });
  },
});


export const SelectStaffList = (state: RootState) => state.staff.staffList;



export default staffSlice.reducer;