import light_boy from "@/app/favicon.ico"
import Image from "next/image";
function NavBar({ children }: { children: React.ReactNode }) {
  return (
    <nav
      className={`h-[60px] sm:h-[80px] w-full flex flex-row md:flex-row justify-between items-center`}
    >
      <li className="float-left flex first:pt-0 last:pb-0">
        <Image className="h-10 w-10 rounded-full bg-quiz-purple" alt="" src={light_boy} />
        <div className="ml-3 overflow-hidden">
          <p className="text-sm font-medium text-slate-900">Dhrama Pradhan</p>
          <p className="text-sm text-slate-500 truncate">dharma@prgmail.con</p>
        </div>
      </li>
      {children}
    </nav>
  );
}

export default NavBar;
