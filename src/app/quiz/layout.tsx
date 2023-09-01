"use client";
import NavBar from "@/components/widget/NavBar";
import TopNavigation from "@/components/widget/TopNavigation";
import React, { createContext, useState } from "react";

const style = {
  container: `grid grid-cols-6 grid-rows-8 gap-4 bg-green-500`,
  main: `h-screen w-full overflow-y-auto pb-4 mobile-sm:pb-4 pt-4 px-[7px] mobile-sm:px-[12px] tablet-lg:px-[12px] tablet-xl:px-[23px] tablet:px-0 tablet:pb-4 tablet:pt-0 tablet-lg:pt-0`,
  sideList: `col-span-2 row-span-7 row-start-2`,
};

function QuizLayout({ children }: { children: React.ReactNode }) {
  return (
    <main
      className="flex w-full h-full flex-col justify-between gap-2 overflow-hidden"
      style={{ fontFamily: "ProximaNova" }}
    >
      <NavBar />
      <div className="flex  flex-col md:flex-row w-full h-[calc(100%-36px)]">
        <TopNavigation
          className={`w-full md:w-[350px] bg-stone-500 overflow-auto`}
        />
        <div className="w-full h-full bg-yellow-900">{children}</div>
      </div>
    </main>
  );
}

export default QuizLayout;
