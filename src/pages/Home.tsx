import { DisplayInfos } from "../components/home/DisplayInfos";
import { DisplayJobs } from "../components/home/DisplayJobs";
import { HeaderHome } from "../components/home/HeaderHome";
import { useSelector } from "react-redux";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { getUser } from "../features/userSlice";

export function Home() {
  const user = useSelector(getUser);

  const navigate = useNavigate();

  useEffect(() => {
    if (!user.id) {
      navigate("/profile");
    }
  }, []);
  return (
    <div className="flex flex-col items-center before:bg-[#41414C] before:w-full before:h-[280px] before:content before:top-0 before:absolute before:-z-20">
      <div className="max-w-[1120px] w-full">
        <HeaderHome />
        <DisplayInfos />
        <DisplayJobs />
      </div>
    </div>
  );
}
