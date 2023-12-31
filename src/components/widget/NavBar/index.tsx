import light_boy from "@/app/favicon.ico"
import { loadFromLocalStorage } from "@/components/Utility/Utility";
import Image from "next/image";
import { useEffect, useState } from "react";
function NavBar({ children }: { children: React.ReactNode }) {
  const [context, setContext] = useState({
    userName: "",
    userEmail: ""
  });
  useEffect(() => {
    const data = loadFromLocalStorage("userDetails");
    if (data) {
      setContext(data);
    }
  }, [])

  return (
    <nav
      className={`h-[60px] sm:h-[80px] w-full flex flex-row md:flex-row justify-between items-center flex-wrap`}
    >
      <li className="float-left flex first:pt-0 last:pb-0">
        <Image className="h-10 w-10 rounded-full bg-quiz-purple" alt="" src={light_boy} />
        <div className="ml-3">
          <p className="text-sm font-medium text-slate-900">{context?.userName ?? "User Name"}</p>
          <p className="text-sm text-slate-500 truncate">{context?.userEmail ?? "User Email"}</p>
        </div>
      </li>
      {children}
    </nav>
  );
}

export default NavBar;
