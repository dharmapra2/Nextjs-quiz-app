"use client";
import React, { useEffect, useMemo, useState } from "react";
import { singleQuestion } from "@/components/service/Type";
import SkeletonNormalLoader from "@/components/widget/loader/SkeletonNormalLoader";
import { AppDispatch, RootState } from "@/components/redux/store";
import { useDispatch, useSelector } from "react-redux";
import { clickSave } from "@/components/redux/slices/EditSummarySlice";
import { useRouter } from "next/navigation";
import { clearFromLocalStorage } from "@/components/Utility/Utility";


// we are using memo to prevent unnecessary re render
function Page({ params }: { params: { categoryName: string, itemId: number } }) {
  const { questionData }: { questionData: singleQuestion[] | any[], clickedSave: String } = useSelector((state: RootState) => state.question);
  const noOfQue = useMemo(() => questionData.length, [questionData]); const paramsItemId = useMemo(() => +params?.itemId, [params?.itemId]);
  const [selectedQue, setSelectedQue] = useState<singleQuestion | null>(null);
  const [options, setOptions] = useState<string[] | null>([]);
  const [active, setActive] = useState<Number[]>([-1, -1]);
  const [loading, setLoading] = useState<Boolean>(true);

  /* Redux set value */
  const dispatch: AppDispatch = useDispatch();
  const { push } = useRouter();

  useEffect(() => {
    const selected = questionData?.find(
      ({ itemId }: { itemId: number }) => paramsItemId === itemId
    );
    setSelectedQue(selected ?? null);
    setOptions(selected?.incorrect_answers ?? []);
    setActive([selected?.incorrect_answers?.findIndex(
      (option: any) => option === selected?.selectedOption
    ), selected?.incorrect_answers?.findIndex(
      (option: any) => option === selected?.correct_answer
    )]);
    setTimeout(() => {
      setLoading((prev) => !prev)
    }, 1000);
  }, [paramsItemId]);

  const handleClickDotBtn = (itemId: number, type: string) => {
    itemId = type == "prev" ? --itemId : ++itemId;

    push(`/reportPage/${itemId}`);
  }

  const handleRestBtn = () => {
    dispatch(clickSave());
    clearFromLocalStorage("quizStore");
    clearFromLocalStorage("accessToken");
    clearFromLocalStorage("userDetails");
    push(`/`);
  }

  return (
    <article className={`w-full h-fit md:h-full flex flex-col ${!loading && "justify-between"} font-serif p-3 pageBg`}>
      {
        loading ? <SkeletonNormalLoader count={2} /> :
          <>
            {selectedQue ?
              <>
                <section className="flex flex-col gap-2 text-base">
                  <div className="max-h-fit flex flex-row items-start text-justify gap-2 p-4 border-4 question">
                    <strong className="float-left font-bold ">{`Q(${paramsItemId}).`}</strong>
                    <p
                      className="font-semibold pt-[2px]"
                      dangerouslySetInnerHTML={{
                        __html: selectedQue?.question,
                      }}
                    ></p>
                  </div>
                  <div className="h-fit flex flex-col gap-2 p-3 text-justify">
                    <p className="font-normal">
                      You choosed answers and correct answer are:
                    </p>
                    {/* options */}
                    {options?.length ? (
                      <ul className="flex flex-col gap-1 font-medium">
                        {options?.map((item, index) => (
                          <li
                            key={index}
                            className={`flex items-center text-gray-600 dark:text-gray-200 justify-between py-3  border-gray-100 dark:border-gray-800 ${active[1] == index
                              ? "correct"
                              : active[0] == index
                                ? "wrong"
                                : "bg-transparent border-b-2"
                              }`}
                            dangerouslySetInnerHTML={{
                              __html: item + `${active[1] == index ? "  ( Correct Ans. )  " : active[0] == index ? "  ( Wrong Ans. )  " : ""}`,
                            }}
                          ></li>
                        ))}
                      </ul>
                    ) : null}
                  </div>
                </section>
                <section className="w-full flex flex-col sm:flex-row justify-around gap-2 items-center text-sm md:text-xl flex-wrap">
                  <button
                    className={`flex gap-2 items-center justify-center focus:outline-none focus:ring focus:ring-violet-300 px-5 py-2 leading-5 rounded-full font-semibold text-white w-[calc(100%-10px)] sm:w-[30%] h-12 disabled:bg-quiz-grey disabled:text-quiz-grey-15 `}
                    disabled={paramsItemId <= 1 ? true : false}
                    onClick={() => handleClickDotBtn(paramsItemId, "prev")}
                  >
                    <span className="hidden md:block font-extrabold">{"<"}</span>Prev
                  </button>
                  <button
                    className={`flex gap-2 items-center justify-center focus:outline-none focus:ring focus:ring-violet-300 px-5 py-2 leading-5 rounded-full font-semibold text-white w-[calc(100%-10px)] sm:w-[30%] h-12 disabled:bg-quiz-grey disabled:text-quiz-grey-15 `}
                    onClick={() => handleRestBtn()}
                  >
                    Retake
                  </button>
                  <button
                    className="flex gap-2 items-center justify-center focus:outline-none focus:ring focus:ring-violet-300 px-5 py-2 leading-5 rounded-full font-semibold text-white w-[calc(100%-10px)] sm:w-[30%] h-12 disabled:bg-quiz-grey disabled:text-quiz-grey-15"
                    disabled={paramsItemId < noOfQue ? false : true}
                    onClick={() => handleClickDotBtn(paramsItemId, "next")}
                  >
                    Next <span className="hidden md:block font-extrabold">{">"}</span>
                  </button>
                </section>
              </> : <h4 className="self-center my-[3%] font-medium text-2xl font-serif">No question is found !</h4>
            }
          </>
      }
    </article>
  );
}

export default React.memo(Page);
