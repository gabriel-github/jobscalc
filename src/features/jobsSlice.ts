import { Action, createSlice, nanoid, PayloadAction } from "@reduxjs/toolkit";
import { JobForm } from "../components/EditOrAddJob";
import { UserInfo } from "../pages/Profile";
import { RootState } from "../store";

export enum Status {
  "Em andamento" = 1,
  "Encerrado" = 0,
}

export interface Job {
  id: string;
  name: string;
  status: 0 | 1;
  hoursFocus: number;
  hoursJob: number;
  userId: string;
}

interface InitialState {
  jobs: Job[];
}

const initialState: InitialState = {
  jobs: [],
};

const jobsSlice = createSlice({
  name: "jobs",
  initialState,
  reducers: {
    deleteJob: (state, action: PayloadAction<string>) => {
      const jobsUpdated = state.jobs.filter((job) => job.id !== action.payload);

      state.jobs = jobsUpdated;
    },
    addJob: (state, action: PayloadAction<Job>) => {
      state.jobs.push(action.payload);
    },
    editJob: (state, action: PayloadAction<Job>) => {
      state.jobs = state.jobs.map((job) => {
        if (job.id === action.payload.id) {
          return action.payload;
        }

        return job;
      });
    },
  },
});

export const allJobs = (state: RootState) => state.jobs;

export const getJobById = (state: RootState, id: string | undefined) =>
  state.jobs.jobs.find((job) => job.id === id);

export const { deleteJob, editJob, addJob } = jobsSlice.actions;

export default jobsSlice.reducer;
