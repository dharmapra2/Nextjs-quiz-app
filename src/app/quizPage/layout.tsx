"use client";
import NavBar from "@/components/widget/NavBar";
import React, { useMemo } from "react";
import { RootState } from "@/components/redux/store";
import { singleQuestion } from "@/components/service/Type";
import { useSelector } from "react-redux";
import dynamic from "next/dynamic";
import SkeletonNormalLoader from "@/components/widget/loader/SkeletonNormalLoader";
import SkeletonSingleLineLoader from "@/components/widget/loader/SkeletonSingleLineLoader";
import Timer from "@/components/widget/Timer/Timer";
import { usePathname, useRouter } from "next/navigation";


const ServerComponent = dynamic(() => import('@/components/widget/TopNavigation'), {
  ssr: false, loading: () => <div className="">
    <SkeletonNormalLoader count={1} className="hidden sm:block" />
    <SkeletonSingleLineLoader className="block sm:hidden" />
  </div>,
})

function QuizLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname()
  const router = useRouter();
  const isClient = typeof window !== "undefined";


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

    if (redirectPath != "yes" && pathname?.split("/")?.includes("reportPage")) {
      router.back();
    } else if (noOfQue <= 0) {
      router.replace("/");
    }
  }

  return (
    <main
      className="flex w-full h-full flex-col justify-between gap-0 sm:gap-2 overflow-hidden"
      style={{ fontFamily: "ProximaNova" }}
    >
      <NavBar>
        <Timer countMin={30} />
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
  );
}

export default QuizLayout;
