import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { getUser } from "../../features/userSlice";

export function UserProfile() {
  const user = useSelector(getUser);

  return (
    <div className="flex items-center gap-6">
      <div className="text-right">
        <p className="font-semibold text-xl text-white">
          {user.name ?? "default"}
        </p>
        <Link
          to="/profile"
          className="text-sm text-[#BFBFCC] hover:text-[#F1972C]"
        >
          Ver perfil
        </Link>
      </div>
      <img
        className="w-16 h-16 rounded-full ring-2 ring-[#F1972C]"
        src={user.photo ? user.photo : "https://github.com/gabriel-github.png"}
        alt="User"
      />
    </div>
  );
}
