import { PencilSimpleLine, TrashSimple } from "phosphor-react";
import { useState } from "react";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { Link, useSearchParams } from "react-router-dom";
import { deleteJob, Job, Status } from "../../../features/jobsSlice";
import { getUser } from "../../../features/userSlice";
import { MyDialog } from "../../Dialog";

interface DisplayJobCardProps extends Job {
  index: number;
}

export function DisplayJobCard({
  id,
  name,
  status,
  index,
  hoursJob,
}: DisplayJobCardProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [jobSelected, setJobSelected] = useState("");

  const user = useSelector(getUser);

  const dispatch = useDispatch();

  function onDeleteJob() {
    dispatch(deleteJob(jobSelected));
    setIsOpen(false);
  }

  function onClose() {
    setIsOpen(false);
  }

  function handleDeleteJob(jobId: string) {
    setJobSelected(jobId);
    setIsOpen(true);
  }

  return (
    <>
      <MyDialog isOpen={isOpen} onClose={onClose} onDeleteJob={onDeleteJob} />
      <div className="w-full flex items-center justify-between py-6 px-8 bg-[#FCFDFF] border border-[#E1E3E5] rounded group hover:bg-gradient-to-r  from-[#F1972C1d] to-[#FCFDFF] border-l-4 border-l-transparent hover:border-l-4 hover:border-l-[#F1972C]">
        <p className="font-semibold text-[#BFBFCC] group-hover:text-[#F1972C]">
          {index}
        </p>
        <p className="text-left text-2xl font-semibold text-[#5A5A66]">
          {name}
        </p>

        <div>
          <p className="uppercase font-semibold text-[12px] text-[#BFBFCC]">
            Prazo
          </p>
          <p className="font-medium text-[#787880]">
            {(hoursJob / user.workHoursPerDay).toFixed(0)} dias para entrega
          </p>
        </div>

        <div>
          <p className="uppercase font-semibold text-[12px] text-[#BFBFCC]">
            Valor
          </p>
          <p className="font-medium text-[#787880]">
            {new Intl.NumberFormat("pt-BR", {
              style: "currency",
              currency: "BRL",
            }).format(user.priceHour * hoursJob)}
          </p>
        </div>

        <p
          className={`${
            status === 0
              ? "bg-[#FAECEB] text-[#EB3B35]"
              : "bg-[#E8F8E8] text-[#36B236]"
          } py-2 px-6 rounded-full font-medium text-sm`}
        >
          {Status[status]}
        </p>

        <div className="flex gap-2">
          <Link
            to={`/edit/${id}`}
            className="p-2 border bg-white hover:bg-[#E1E3E5] border-[#E1E3E5] rounded"
          >
            <PencilSimpleLine size={24} color="#787880" />
          </Link>
          <button
            className="p-2 border bg-white hover:bg-[#E1E3E5] border-[#E1E3E5] rounded"
            onClick={() => handleDeleteJob(id)}
          >
            <TrashSimple size={24} color="#787880" />
          </button>
        </div>
      </div>
    </>
  );
}
