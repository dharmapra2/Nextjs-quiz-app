import { useRouter } from "next/navigation";
import React from "react";

function Dots({ items }: { items: any }) {

    const { push } = useRouter();

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
            onClick={() => push(`/quiz/${items?.itemId}`)}
            suppressHydrationWarning
        >
            {items?.itemId}
        </div>
    )
}

export default React.memo(Dots);