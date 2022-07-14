import { createSlice, nanoid, PayloadAction } from "@reduxjs/toolkit";
import { UserInfo } from "../pages/Profile";
import { RootState } from "../store";

export interface User {
  id: string;
  name: string;
  photo: string;
  gainPerMonth: number;
  workHoursPerDay: number;
  workDaysPerWeek: number;
  weeksFreePerYear: number;
  priceHour: number;
}

interface InitialState {
  user: User;
}

const initialState: InitialState = {
  user: {
    id: "",
    name: "",
    photo: "",
    gainPerMonth: 0,
    workHoursPerDay: 0,
    workDaysPerWeek: 0,
    weeksFreePerYear: 0,
    priceHour: 0,
  },
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setUser: (state, action: PayloadAction<UserInfo>) => {
      const id = nanoid();

      const user: User = {
        id,
        name: action.payload.name,
        photo: action.payload.photo,
        gainPerMonth: Number(action.payload.gainPerMonth),
        weeksFreePerYear: Number(action.payload.weeksFreePerYear),
        workDaysPerWeek: Number(action.payload.workDaysPerWeek),
        workHoursPerDay: Number(action.payload.workHoursPerDay),
        priceHour: Number(action.payload.priceHour),
      };

      state.user = user;
    },
    editUser: (state, action: PayloadAction<User>) => {
      state.user = action.payload;
    },
  },
});

export const getUser = (state: RootState): User => state.user.user;

export const { editUser, setUser } = userSlice.actions;

export default userSlice.reducer;
