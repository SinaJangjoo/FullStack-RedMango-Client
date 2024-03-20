import { createSlice } from "@reduxjs/toolkit";
import { userModel } from "../../Interfaces";

//Now we have to think what will be the Slice that we want to manage?
//We want to manage an Array or List of menuItem

export const emptyUserState : userModel = {
  fullName: "",
  id: "",
  email: "",
  role: "",
};

export const userAuthSlice = createSlice({
  name: "userAuth",
  initialState: emptyUserState,

  // The "reducers" is responsible to managing the State
  reducers: {
    setLoggedInUser: (state, action) => {
      //when we invoke this particular Slice
      state.fullName = action.payload.fullName;
      state.id = action.payload.id;
      state.email = action.payload.email;
      state.role = action.payload.role;
    },
  },
});

export const { setLoggedInUser } = userAuthSlice.actions;
export const userAuthReducer = userAuthSlice.reducer;
