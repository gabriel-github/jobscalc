import { useParams, useSearchParams } from "react-router-dom";
import { EditOrAddJob } from "../components/EditOrAddJob";
import { Header } from "../components/Header";

export function EditJob() {
  const { id } = useParams();

  return (
    <div className="flex flex-col items-center">
      <Header title="Editar job" backRoute="/" />

      <div className="max-w-[1120px] w-full flex mt-16 gap-32">
        <EditOrAddJob id={id} />
      </div>
    </div>
  );
}
