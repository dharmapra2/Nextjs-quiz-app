import React from "react";
import Timer from "../Timer/Timer";
import { Timer2 } from "../Timer/Timer2";

function NavBar() {
  return (
    <nav
      className={`h-[10%] w-full flex flex-row justify-between items-center bg-purple-700`}
    >
      <h3>USer Email:- dp@ghj.com </h3>
      <Timer2 countMin={1} />
    </nav>
  );
}

export default NavBar;
