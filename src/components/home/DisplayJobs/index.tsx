import { PencilSimpleLine, TrashSimple } from "phosphor-react";
import { useSelector } from "react-redux";
import { allJobs } from "../../../features/jobsSlice";
import { DisplayJobCard } from "./DisplayJobCard";

export function DisplayJobs() {
  const { jobs } = useSelector(allJobs);
  return (
    <div className="w-full flex flex-col items-center gap-2">
      {jobs.map((job, index) => (
        <DisplayJobCard key={job.id} {...job} index={index + 1} />
      ))}
    </div>
  );
}
