import React, { useEffect, useState } from "react";
import Timer from "@/components/widget/Timer/Timer";
import { QuizContext } from "@/app/[categoryName]/layout";

// const NoSSR = dynamic(() => import('@/components/widget/Timer/Timer'), { ssr: false })

function NavBar() {
  return (
    <QuizContext.Consumer>
      {(context: any) => (
        <nav
          className={`h-[10%] w-full flex flex-col md:flex-row justify-between  items-stretch md:items-center bg-quiz-purple-15`}
        >
          <li className="float-left flex first:pt-0 last:pb-0">
            <img className="h-10 w-10 rounded-full bg-quiz-purple" alt="" src={"next.svg"} />
            <div className="ml-3 overflow-hidden">
              <p className="text-sm font-medium text-slate-900">Dhrama Pradhan</p>
              <p className="text-sm text-slate-500 truncate">dharma@prgmail.con</p>
            </div>
          </li>
          <Timer countMin={1} path={context?.clickedSave} />
        </nav>
      )}</QuizContext.Consumer>
  );
}

export default NavBar;
