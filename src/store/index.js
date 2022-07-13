import { createSlice, configureStore } from "@reduxjs/toolkit";

const account = {
  id: "",
  isLoggedIn: false,
  owner: "",
  userName: "",
  pin: "",
  movements: [],
  movementsDates: [],
};

const accountSlice = createSlice({
  name: "acc",
  initialState: account,
  reducers: {
    replaceData(state, action) {
      // state.movements = action.payload.movements;
      // state.movementsDates = action.payload.movementsDate;
      state.id = action.payload.id;
      state.isLoggedIn = action.payload.isLoggedIn;
      state.owner = action.payload.owner;
      state.userName = action.payload.userName;
      state.pin = action.payload.pin;
      state.movements = action.payload.movements;
      state.movementsDates = action.payload.movementsDates;
    },
    transfer(state, action) {
      state.movements.push(-action.payload.amount);
      state.movementsDates.push(action.payload.date);
    },
    requestLoan(state, action) {
      state.movements.push(action.payload.amount);
      state.movementsDates.push(action.payload.date);
    },
    closeAcc(state) {
      state.isLoggedIn = false;
    },
    login(state, action) {
      state.isLoggedIn = true;
    },
  },
});

const store = configureStore({ reducer: accountSlice.reducer });

export const accActions = accountSlice.actions;
export default store;
