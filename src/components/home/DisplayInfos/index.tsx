import { Plus } from "phosphor-react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { allJobs } from "../../../features/jobsSlice";
import { DisplayCard } from "./DisplayCard";

export function DisplayInfos() {
  const { jobs } = useSelector(allJobs);

  const jobsClosed = jobs.filter((job) => job.status === 0);
  const jobsInProgress = jobs.filter((job) => job.status === 1);

  return (
    <div className="pt-8 pb-10 flex justify-between">
      <div className="flex gap-10">
        <DisplayCard quantity={jobs.length} status="Projetos ao total" />
        <DisplayCard quantity={jobsInProgress.length} status="Em andamento" />
        <DisplayCard quantity={jobsClosed.length} status="Encerrados" />
      </div>

      <Link
        to="/add"
        className="flex items-center gap-8 uppercase text-white font-bold bg-[#F1972C] hover:bg-[#FA9C2D] p-3 rounded"
      >
        <div className="p-1 bg-orange-300 rounded">
          <Plus size={24} color="#FFFFFF" />
        </div>
        <p className="pr-8">adicionar Novo Job</p>
      </Link>
    </div>
  );
}
