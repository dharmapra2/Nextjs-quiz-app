import React from "react";
import Link from "next/link";

function TopNavigation({ className }: { className: string }) {
  const length = 65;
  // This function is used to save the embryo data on mouse over
  const handleMouseOver = (id: Number) => {
    console.log(id);
  };
  return (
    <section className={className}>
      <div className="w-full h-full grid grid-rows-1 md:grid-cols-3 grid-flow-col md:grid-flow-row gap-2">
        {Array.from({ length }, (_, index) => index + 1)?.map((_data, i) => (
          <Link
            passHref={true}
            className={`h-9 w-h-9 rounded-full flex justify-center items-center m-1 cursor-pointer`}
            key={i}
            style={{
              backgroundColor: "black",
              color: "white",
            }}
            href={`/quiz/${i + 1}`}
          >
            {i + 1}
          </Link>
        ))}
      </div>
    </section>
  );
}

export default TopNavigation;
