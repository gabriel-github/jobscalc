import { EditOrAddJob } from "../components/EditOrAddJob";
import { Header } from "../components/Header";

export function AddJob() {
  return (
    <div className="flex flex-col items-center">
      <Header title="Adicionar novo job" backRoute="/" />

      <div className="max-w-[1120px] w-full flex mt-16 gap-32">
        <EditOrAddJob />
      </div>
    </div>
  );
}
