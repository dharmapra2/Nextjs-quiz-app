import { setSelectedOptions } from "@/components/redux/slices/EditSummarySlice";
import { AppDispatch } from "@/components/redux/store";
import { useRouter } from "next/navigation";
import React from "react";
import { useDispatch } from "react-redux";

function Dots({ items, ...props }: { items: any }) {
    const { push } = useRouter();
    const dispatch: AppDispatch = useDispatch();

    const handleClickDotBtn = (itemId: number) => {
        const temp: {
            itemId: number,
            opt: any
        } = {
            itemId,
            opt: null
        }
        dispatch(setSelectedOptions(temp));
        push(`/quiz/${items?.itemId}`);
    }


    const backgroundColor = items?.visibility?.attempted
        ? "bg-quiz-forest"
        : items?.visibility?.visited
            ? "bg-quiz-golden"
            : "bg-quiz-black";
    const color = items?.visibility?.attempted
        ? "text-quiz-white"
        : items?.visibility?.visited
            ? "text-quiz-black"
            : "text-quiz-white";
    return (
        <div
            className={`h-[36px] w-[36px] rounded-full flex justify-center items-center m-1 cursor-pointer ${backgroundColor} ${color}`}
            key={items?.itemId}
            onClick={() => handleClickDotBtn(items?.itemId)}
            suppressHydrationWarning
            {...props}
        >
            {items?.itemId}
        </div>
    )
}

export default React.memo(Dots);