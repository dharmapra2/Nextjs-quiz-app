import React from "react";

function TopNavigation({ className }: { className: string }) {
  const length = 65;
  // This function is used to save the embryo data on mouse over
  const handleMouseOver = (id: Number) => {
    console.log(id);
  };
  return (
    <section className={className}>
      <div className="w-auto grid grid-rows-1 md:grid-cols-3 grid-flow-col md:grid-flow-row gap-2 bg-white m-3">
        {Array.from({ length }, (_, index) => index + 1)?.map((data, i) => (
          <div
            className={`h-9 w-9 rounded-full flex justify-center items-center m-1 cursor-pointer`}
            key={i}
            onMouseOver={() => handleMouseOver(i + 1)}
            style={{
              backgroundColor: "black",
              color: "white",
              pointerEvents: "none",
            }}
          >
            {i + 1}
          </div>
        ))}
      </div>
    </section>
  );
}

export default TopNavigation;
