import React from "react";
import Dots from "@/components/widget/SideBar/Dots";

function TopNavigation({ questionData, clickedSave }: { questionData: any, clickedSave: String }) {
  return (
    <div className="w-full grid grid-rows-1 md:grid-cols-3 grid-flow-col md:grid-flow-row gap-2">
      {questionData?.map((items: { itemId: number }) => (
        <Dots items={items} key={items?.itemId} urlPath={clickedSave} />
      ))}
    </div>
  );
}

export default TopNavigation;