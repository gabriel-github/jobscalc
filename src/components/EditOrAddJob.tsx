import { Input } from "./form/Input";
import moneyInactive from "../assets/money_inactive.svg";
import moneyActive from "../assets/money_active.svg";

import { TrashSimple } from "phosphor-react";
import { ChangeEvent, FormEvent, useEffect, useState } from "react";
import { addJob, editJob, getJobById, Job } from "../features/jobsSlice";
import { nanoid } from "@reduxjs/toolkit";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { RootState } from "../store";
import { getUser } from "../features/userSlice";
import { useNavigate } from "react-router-dom";

interface EditOrAddJobProps {
  id?: string;
}

export interface JobForm {
  name: string;
  hoursJob: number;
  hoursFocusJob: number;
}

type stateOptions = "name" | "hoursFocusJob" | "hoursJob";

export function EditOrAddJob({ id }: EditOrAddJobProps) {
  const [job, setJob] = useState<JobForm>({
    name: "",
    hoursFocusJob: 0,
    hoursJob: 0,
  });

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const user = useSelector(getUser);
  const storedJob = useSelector((state: RootState) => getJobById(state, id));

  const onChangeValueState = (
    e: ChangeEvent<HTMLInputElement>,
    keyState: stateOptions
  ) => {
    setJob((oldJob) => ({
      ...oldJob,
      [keyState]: e.target.value,
    }));
  };

  const canSubmit = [job.name, job.hoursFocusJob, job.hoursJob].every(Boolean);

  const jobValue = job.hoursJob * user.priceHour;

  const clearState = () => {
    setJob({
      name: "",
      hoursFocusJob: 0,
      hoursJob: 0,
    });
  };

  const handleSubmit = () => {
    if (canSubmit) {
      if (!id) {
        const newJob: Job = {
          ...job,
          id: nanoid(),
          status: 1,
          userId: user.id,
          hoursFocus: job.hoursFocusJob,
        };

        dispatch(addJob(newJob));
      } else {
        const jobUpdated: Job = {
          id,
          name: job.name,
          hoursFocus: job.hoursFocusJob,
          hoursJob: job.hoursJob,
          status: 1,
          userId: user.id,
        };
        dispatch(editJob(jobUpdated));
      }

      navigate("/");
    }
  };

  useEffect(() => {
    if (storedJob) {
      setJob({
        name: storedJob.name,
        hoursFocusJob: storedJob.hoursFocus,
        hoursJob: storedJob.hoursJob,
      });
    }
  }, [storedJob]);

  return (
    <div className="flex gap-32">
      <div className="w-full max-w-[641px]">
        <div className="pb-4 border-b-2 border-b-[#E1E3E5]">
          <h3 className="text-4xl text-[#5A5A66] font-semibold">
            Dados do job
          </h3>
        </div>
        <div className="pt-8">
          <Input
            id="name_job"
            full
            label="Nome do Job"
            value={job.name}
            onChange={(e) => onChangeValueState(e, "name")}
          />
          <div className="pt-8 flex gap-6">
            <Input
              type="number"
              id="hours"
              label="Quantas horas"
              value={job.hoursJob}
              onChange={(e) => onChangeValueState(e, "hoursJob")}
            />
            <Input
              type="number"
              id="focus_per_day"
              label="por dia vai dedicar ao Job?"
              value={job.hoursFocusJob}
              onChange={(e) => onChangeValueState(e, "hoursFocusJob")}
            />
          </div>
        </div>
      </div>

      <div className="w-[352px] h-[330px] flex flex-col items-center justify-center bg-white border border-[#E1E3E5] rounded">
        <img
          className="w-28 h-16"
          src={id ? moneyActive : moneyInactive}
          alt="money"
        />

        <div className="mt-16 flex flex-col items-center">
          <p className="text-xl text-[#5A5A66] w-64 text-center">
            O valor do projeto ficou em{" "}
            <span className="font-semibold">
              {new Intl.NumberFormat("pt-BR", {
                style: "currency",
                currency: "BRL",
              }).format(jobValue)}
            </span>
          </p>

          <div className="flex items-center mt-6 gap-4">
            <button
              className="uppercase font-semibold text-white rounded py-3 px-12 bg-[#36B236]"
              onClick={handleSubmit}
            >
              salvar
            </button>
            <button
              className="p-3 border hover:bg-[#E1E3E5] border-[#E1E3E5] rounded"
              onClick={clearState}
            >
              <TrashSimple size={24} color="#787880" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
