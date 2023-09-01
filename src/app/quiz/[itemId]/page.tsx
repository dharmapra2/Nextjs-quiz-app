"use client";
import React, { useEffect, useMemo, useState } from "react";
import { responseData } from "@/components/service/Data/category";
import { singleQuestion } from "@/components/service/Type";

// we are using memo to prevent unnecessary re render
function Page({ params }: { params: { itemId: string } }) {
  const itemId = useMemo(() => params?.itemId, [params?.itemId]);
  const noOfQue = useMemo(() => responseData.length, [responseData]);
  const [selectedQue, setSelectedQue] = useState<singleQuestion | null>(null);
  const [options, setOptions] = useState<string[] | null>(null);

  useEffect(() => {
    const selected = responseData.find((_, index) => +itemId === index + 1);
    let mergeOptions:String[] = selected?.incorrect_answers ?? [];
    mergeOptions.push(selectedQue?.correct_answer);
    console.log(`selectedc`, selected);
    return () => {
      setSelectedQue(selected || null);
      console.log(`mergeOptions ${mergeOptions}`);
    };
  }, [itemId]);

  return (
    <article className="h-full flex flex-col bg-red-500">
      <aside className="flex flex-row">
        <h3>i</h3>
        <p>
          Question No.{itemId} of {noOfQue}
        </p>
      </aside>
      <section>
        <div className="questionbox-border h-20 p-4 border-4">
          Q. {selectedQue?.question}
        </div>
        <form className="form">
          <p className="instruction">
            Please choose one of the following answers:
          </p>
          {/* options */}
          <ul className="list-group">
            <li className="list-group-item active" aria-current="true">
              An active item
            </li>
            <li className="list-group-item">A second item</li>
            <li className="list-group-item">A third item</li>
            <li className="list-group-item">A fourth item</li>
            <li className="list-group-item">And a fifth one</li>
          </ul>
          <div className="btn-group">
            <button className="btn">
              <span>{"< "}</span>prev
            </button>
            <button className="btn">
              next <span>{" >"}</span>
            </button>
          </div>
        </form>
      </section>
    </article>
  );
}

export default React.memo(Page);
