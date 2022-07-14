import { ArrowLeft } from "phosphor-react";
import { Link } from "react-router-dom";

interface HeaderProps {
  title: string;
  backRoute: string;
}

export function Header({ title, backRoute }: HeaderProps) {
  return (
    <div className="w-full bg-[#41414C]">
      <div className="max-w-[1120px] w-full my-0 mx-auto py-8 flex items-center">
        <Link to={backRoute} className="mr-auto">
          <ArrowLeft size={24} color="#BFBFCC" />
        </Link>
        <h1 className="mr-auto text-[#BFBFCC] font-semibold">{title}</h1>
      </div>
    </div>
  );
}
