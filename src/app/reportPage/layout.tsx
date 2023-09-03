"use client";
import NavBar from "@/components/widget/NavBar";
import React, { createContext, useMemo } from "react";
import { RootState } from "@/components/redux/store";
import { singleQuestion } from "@/components/service/Type";
import { useSelector } from "react-redux";
import dynamic from "next/dynamic";
import SkeletonNormalLoader from "@/components/widget/loader/SkeletonNormalLoader";
import SkeletonSingleLineLoader from "@/components/widget/loader/SkeletonSingleLineLoader";
import { usePathname, useRouter } from "next/navigation";

export const ReportContext = createContext<{
  questionData: singleQuestion[] | any[];
  noOfQue: number;
  clickedSave: String
}>({ questionData: [], noOfQue: 0, clickedSave: "" });

const ServerComponent = dynamic(() => import('@/components/widget/TopNavigation'), {
  ssr: false, loading: () => <div className="flex items-center w-full h-full">
    <SkeletonNormalLoader count={1} className="hidden sm:block" />
    <SkeletonSingleLineLoader className="block sm:hidden" />
  </div>,
})

function QuizLayout({ children, params }: { children: React.ReactNode, params: { itemId: number } }) {
  const isClient = typeof window !== "undefined";
  const pathname = usePathname()
  const router = useRouter();

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

    if (redirectPath == "yes" && pathname?.split("/")?.includes("quizPage")) {
      router.forward();
      return;
    } else if (noOfQue <= 0) {
      router.replace("/");
    }
  }

  const calculateScore = () => {
    const data = questionData?.filter(item => item?.selectedOption === item?.correct_answer)?.length;
    return `${data}/${noOfQue}`;
  }

  return (
    <ReportContext.Provider value={{ questionData, noOfQue, clickedSave }}>
      <main
        className="flex w-full h-full flex-col justify-between gap-0 sm:gap-2 overflow-hidden"
        style={{ fontFamily: "ProximaNova" }}
      >
        <NavBar>
          <div className={`float-right text-red-500 font-bold`} suppressHydrationWarning>Score: {calculateScore()}</div>
        </NavBar>
        <div className="flex flex-col md:flex-row gap-2 w-full h-[calc(100%-60px)] sm:h-[calc(100%-10%)]">
          <section className={`w-full h-[70px] md:h-full md:max-w-[350px] overflow-auto py-1 sm:p-2 sideBar`}>
            <ServerComponent questionData={questionData} clickedSave={clickedSave} readOnly={false} />
          </section>
          <div className="w-full h-full overflow-auto">
            {children}
          </div>
        </div>
      </main>
    </ReportContext.Provider>
  );
}

export default QuizLayout;
