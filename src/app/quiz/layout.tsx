"use client";
import NavBar from "@/components/widget/NavBar";
import TopNavigation from "@/components/widget/TopNavigation";
import React, { createContext, useContext, useMemo, useState } from "react";
import { RootState } from "@/components/redux/store";
import { singleQuestion } from "@/components/service/Type";
import { useSelector } from "react-redux";

const style = {
  container: `grid grid-cols-6 grid-rows-8 gap-4 bg-green-500`,
  main: `h-screen w-full overflow-y-auto pb-4 mobile-sm:pb-4 pt-4 px-[7px] mobile-sm:px-[12px] tablet-lg:px-[12px] tablet-xl:px-[23px] tablet:px-0 tablet:pb-4 tablet:pt-0 tablet-lg:pt-0`,
  sideList: `col-span-2 row-span-7 row-start-2`,
};
export const QuizContext = createContext<{
  questionData: singleQuestion[] | any[];
  noOfQue: number;
  msg: String
}>({ questionData: [], noOfQue: 0, msg: "" });

function QuizLayout({ children }: { children: React.ReactNode }) {
  const isClient = typeof window !== "undefined";

  // Initialize questionData and noOfQue with default values
  let questionData: singleQuestion[] | any[] = [];
  let noOfQue = 0;
  let msg = "fghjk";

  // Use useSelector only on the client side
  if (isClient) {
    const { questionData: clientQuestionData }: { questionData: singleQuestion[] | any[] } = useSelector((state: RootState) => state.question);
    questionData = clientQuestionData;
    noOfQue = useMemo(() => questionData.length, [questionData]);
  }

  return (
    <QuizContext.Provider value={{ questionData, noOfQue, msg }}>
      <main
        className="flex w-full h-full flex-col justify-between gap-2 overflow-hidden"
        style={{ fontFamily: "ProximaNova" }}
      >
        <NavBar />
        <div className="flex flex-col md:flex-row gap-2 w-full h-[calc(100%-10%)]">
          <TopNavigation
            className={`w-full h-[15%] md:h-full md:max-w-[350px] bg-white overflow-auto p-2`}
          />
          <div className="w-full h-full bg-yellow-900 overflow-auto p-2 bg-quiz-plum">
            {children}
          </div>
        </div>
      </main>
    </QuizContext.Provider>
  );
}

export default QuizLayout;
