import React from "react";
import CustomTimer from "@/components/widget/Timer/Timer";
import Image from "next/image";

function NavBar() {
  return (
    <nav
      className={`h-[10%] w-full flex flex-col md:flex-row justify-between  items-stretch md:items-center bg-quiz-purple-15`}
    >
      <li className="float-left flex first:pt-0 last:pb-0">
        <Image className="h-10 w-10 rounded-full bg-quiz-purple" alt="" src={""} />
        <div className="ml-3 overflow-hidden">
          <p className="text-sm font-medium text-slate-900">Dhrama Pradhan</p>
          <p className="text-sm text-slate-500 truncate">dharma@prgmail.con</p>
        </div>
      </li>
      <CustomTimer countMin={1} />
    </nav>
  );
}

export default NavBar;
