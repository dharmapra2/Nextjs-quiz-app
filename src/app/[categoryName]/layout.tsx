"use client";
import NavBar from "@/components/widget/NavBar";
import React, { createContext, useMemo } from "react";
import { RootState } from "@/components/redux/store";
import { singleQuestion } from "@/components/service/Type";
import { useSelector } from "react-redux";
import dynamic from "next/dynamic";
import SkeletonNormalLoader from "@/components/widget/loader/SkeletonNormalLoader";
import SkeletonSingleLineLoader from "@/components/widget/loader/SkeletonSingleLineLoader";
import { useRouter, useParams, usePathname } from "next/navigation";

export const QuizContext = createContext<{
  questionData: singleQuestion[] | any[];
  noOfQue: number;
  clickedSave: String
}>({ questionData: [], noOfQue: 0, clickedSave: "" });

const ServerComponent = dynamic(() => import('@/components/widget/TopNavigation'), {
  ssr: false, loading: () => <div className="">
    <SkeletonNormalLoader count={1} className="hidden sm:block" />
    <SkeletonSingleLineLoader className="block sm:hidden" />
  </div>,
})

function QuizLayout({ children, params }: { children: React.ReactNode, params: { categoryName: string, itemId: number } }) {
  const isClient = typeof window !== "undefined";
  const { push } = useRouter();

  const { categoryName } = params;

  // if (["quizPage", "reportPage"].includes(categoryName) == false) {
  //   push('/404');
  //   return null;
  // }

  // Initialize questionData and noOfQue with default values
  let questionData: singleQuestion[] | any[] = [];
  let noOfQue = 0;
  let clickedSave = "quizPage";

  // Use useSelector only on the client side
  if (isClient) {
    const { questionData: clientQuestionData, clickedSave: redirectPath }: { questionData: singleQuestion[] | any[], clickedSave: String } = useSelector((state: RootState) => state.question);
    questionData = clientQuestionData;
    clickedSave = useMemo(() => redirectPath == "yes" ? "reportPage" : "quizPage", [redirectPath]);
    noOfQue = useMemo(() => questionData.length, [questionData]);
  }

  return (
    <QuizContext.Provider value={{ questionData, noOfQue, clickedSave }}>
      <main
        className="relative flex w-full h-full flex-col justify-between gap-2 overflow-hidden"
        style={{ fontFamily: "ProximaNova" }}
      >
        <NavBar />
        <div className="flex flex-col md:flex-row gap-2 w-full h-[calc(100%-10%)]">
          <section className={`w-full h-[10%] md:h-full md:max-w-[350px] bg-white overflow-auto p-0 sm:p-2`}>
            <ServerComponent />
          </section>
          <div className="w-full h-full bg-yellow-900 overflow-auto p-2 bg-quiz-plum">
            {children}
          </div>
        </div>
      </main>
    </QuizContext.Provider>
  );
}

export default QuizLayout;
