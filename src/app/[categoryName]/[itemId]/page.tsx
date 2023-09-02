"use client";
import React, { useContext, useEffect, useMemo, useState } from "react";
import { singleQuestion } from "@/components/service/Type";
import { QuizContext } from "../layout";
import SkeletonNormalLoader from "@/components/widget/loader/SkeletonNormalLoader";
import { AppDispatch } from "@/components/redux/store";
import { useDispatch } from "react-redux";
import { setSelectedOptions } from "@/components/redux/slices/EditSummarySlice";
import { useRouter } from "next/navigation";


// we are using memo to prevent unnecessary re render
function Page({ params }: { params: { categoryName: string, itemId: number } }) {
  const { questionData } = useContext(QuizContext);
  const paramsItemId = useMemo(() => +params?.itemId, [params?.itemId]);
  const paramCategoryName = useMemo(() => params?.categoryName, [params?.categoryName]);
  const [selectedQue, setSelectedQue] = useState<singleQuestion | null>(null);
  const [options, setOptions] = useState<string[] | null>([]);
  const [active, setActive] = useState<Number>(-1);
  const [loading, setLoading] = useState<Boolean>(true);

  /* Redux set value */
  const dispatch: AppDispatch = useDispatch();
  const { push } = useRouter();

  useEffect(() => {
    console.log(`paramCategoryName: ${paramCategoryName}`);
    const selected = questionData?.find(
      ({ itemId }: { itemId: number }) => paramsItemId === itemId
    );
    setSelectedQue(selected ?? null);
    setOptions(selected?.incorrect_answers ?? []);
    setActive(selected?.incorrect_answers?.findIndex(
      (option: any) => option === selected?.selectedOption
    ));
    setTimeout(() => {
      setLoading((prev) => !prev)
    }, 1000);
  }, [paramsItemId]);


  const setActioveList = (itemId: number, opt: String, index: number) => {
    const temp: {
      itemId: number;
      opt: String;
    } = { itemId, opt }
    dispatch(setSelectedOptions(temp));
    setActive((_prev) => index);
  }

  const handleClickDotBtn = (itemId: number, type: string) => {
    itemId = type == "prev" ? --itemId : ++itemId;

    const temp: {
      itemId: number,
      opt: any
    } = {
      itemId,
      opt: null
    }
    console.log(itemId);
    dispatch(setSelectedOptions(temp));
    push(`/${paramCategoryName}/${itemId}`);
  }

  return (
    <QuizContext.Consumer>
      {(context: any) => (
        <article className={`w-full h-full flex flex-col ${!loading && "justify-between"} bg-quiz-valentine-red font-serif`}>
          {
            loading ? <SkeletonNormalLoader count={2} /> :
              <>
                {selectedQue ?
                  <>
                    <section className="flex flex-col gap-2 text-base">
                      <div className="max-h-fit flex flex-row items-start text-justify gap-2 p-4 border-4">
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
                          Please choose one of the following answers:
                        </p>
                        {/* options */}
                        {options?.length ? (
                          <ul className="flex flex-col gap-1 font-medium">
                            {options?.map((item, index) => (
                              <li
                                key={index}
                                className={`flex items-center text-gray-600 dark:text-gray-200 justify-between py-3  border-gray-100 dark:border-gray-800 ${active == index
                                  ? "bg-quiz-flax"
                                  : "bg-transparent border-b-2"
                                  }`}
                                onClick={() => setActioveList(selectedQue?.itemId, item, index)}
                                dangerouslySetInnerHTML={{
                                  __html: item,
                                }}
                              ></li>
                            ))}
                          </ul>
                        ) : null}
                      </div>
                    </section>
                    <section className="w-full flex flex-col sm:flex-row justify-around gap-2 items-center text-sm md:text-xl flex-wrap">
                      <button
                        className={`flex gap-2 items-center justify-center bg-quiz-mint hover:bg-quiz-mint-15 focus:outline-none focus:ring focus:ring-violet-300 active:bg-quiz-navy px-5 py-2 leading-5 rounded-full font-semibold text-white w-[calc(100%-10px)] sm:w-[40%] h-12 disabled:bg-quiz-grey disabled:text-quiz-grey-15 `}
                        disabled={paramsItemId <= 1 ? true : false}
                        onClick={() => handleClickDotBtn(paramsItemId, "prev")}
                      >
                        <span className="hidden md:block font-extrabold">{"<"}</span>Prev
                      </button>
                      <button
                        className="flex gap-2 items-center justify-center bg-quiz-pink hover:bg-quiz-pink-15 focus:outline-none focus:ring focus:ring-violet-300 active:bg-quiz-navy px-5 py-2 leading-5 rounded-full font-semibold text-white w-[calc(100%-10px)] sm:w-[40%] h-12 disabled:bg-quiz-grey disabled:text-quiz-grey-15"
                        disabled={paramsItemId < context?.noOfQue ? false : true}
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
      )}
    </QuizContext.Consumer>
  );
}

export default React.memo(Page);
// export default Page;
