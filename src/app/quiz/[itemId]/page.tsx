"use client";
import React, { useEffect, useMemo, useState } from "react";
import { responseData } from "@/components/service/Data/category";
import { singleQuestion } from "@/components/service/Type";
import Link from "next/link";
import { useRouter } from "next/router";


// we are using memo to prevent unnecessary re render
function Page({ params }: { params: { itemId: string } }) {
  const { pathname, push } = useRouter();

  const itemId = useMemo(() => params?.itemId, [params?.itemId]);
  const noOfQue = useMemo(() => responseData.length, [responseData]);
  const [selectedQue, setSelectedQue] = useState<singleQuestion | null>(null);
  const [options, setOptions] = useState<string[] | null>([]);
  const [active, setActive] = useState<Number>(-1);

  useEffect(() => {
    const selected = responseData.find(
      (_, index) => +params.itemId === index + 1
    );

    if (selected) {
      const mergeOptions: string[] = [
        ...selected.incorrect_answers,
        selected.correct_answer,
      ];
      setSelectedQue(selected);
      setOptions(mergeOptions);
    } else {
      setSelectedQue(null);
      setOptions([]);
    }
  }, [itemId]);

  return (
    <article className="w-full h-full flex flex-col justify-between bg-quiz-valentine-red font-serif">
      <section className="flex flex-col gap-2 text-base">
        <div className="max-h-fit flex flex-row items-start text-justify gap-2 p-4 border-4">
          <strong className="float-left font-bold ">{`Q(${itemId}).`}</strong>
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
                  onClick={() => setActive((_prev) => index)}
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
        <button className="flex gap-2 items-center justify-center bg-quiz-mint hover:bg-quiz-mint-15 focus:outline-none focus:ring focus:ring-violet-300 active:bg-quiz-navy px-5 py-2 leading-5 rounded-full font-semibold text-white w-[calc(100%-10px)] sm:w-[40%] h-12" aria-disabled={+itemId <= 0} href={`/quiz/${+itemId - 1}`}>
          <span className="hidden md:block font-extrabold">{"<"}</span>Prev
        </button>
        <button className="flex gap-2 items-center justify-center bg-quiz-pink hover:bg-quiz-pink-15 focus:outline-none focus:ring focus:ring-violet-300 active:bg-quiz-navy px-5 py-2 leading-5 rounded-full font-semibold text-white w-[calc(100%-10px)] sm:w-[40%] h-12" aria-disabled={+itemId >= noOfQue} href={`/quiz/${+itemId + 1}`}>
          Next<span className="hidden md:block font-extrabold">{">"}</span>
        </button>
      </section>
    </article>
  );
}

export default React.memo(Page);
