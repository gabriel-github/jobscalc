import { WarningOctagon } from "phosphor-react";
import logoImg from "../../assets/logo.svg";
import { UserProfile } from "./UserProfile";

export function HeaderHome() {
  return (
    <header className="w-full pt-6 pb-4 flex items-center justify-between border-b border-b-[#4F4F5B]">
      <img className="w-[208px] h-12" src={logoImg} alt="logo" />

      <UserProfile />
    </header>
  );
}
