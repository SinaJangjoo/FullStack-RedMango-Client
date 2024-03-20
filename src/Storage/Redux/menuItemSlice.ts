import { createSlice } from "@reduxjs/toolkit";

//Now we have to think what will be the Slice that we want to manage?
//We want to manage an Array or List of menuItem

const initialState = {
  menuItem: [],
  search:""
};

export const menuItemSlice = createSlice({
  name: "MenuItem",
  initialState: initialState,

  // The "reducers" is responsible to managing the State
  reducers: {
    setMenuItem: (state, action) => {
        //when we invoke this particular Slice
        state.menuItem=action.payload;
    },
    setSearchItem: (state, action) => {
      //when we invoke this particular Slice
      state.search=action.payload;
  },
  },
});

export const {setMenuItem,setSearchItem} =menuItemSlice.actions;
export const menuItemReducer=menuItemSlice.reducer; 
