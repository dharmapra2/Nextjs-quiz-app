import React from "react";
import CustomTimer from "@/components/widget/Timer/Timer";

function NavBar() {
  return (
    <nav
      className={`h-[10%] w-full flex flex-row justify-between items-center bg-purple-700`}
    >
      <h3>USer Email:- dp@ghj.com </h3>
      <CustomTimer countMin={1} />
    </nav>
  );
}

export default NavBar;
