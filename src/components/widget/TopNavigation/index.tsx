import React from "react";
import { QuizContext } from "@/app/[categoryName]/layout";
import Dots from "@/components/widget/SideBar/Dots";

function TopNavigation() {
  return (
    <QuizContext.Consumer>
      {(context: any) => (
        <div className="w-full grid grid-rows-1 md:grid-cols-3 grid-flow-col md:grid-flow-row gap-2">
          {context?.questionData?.map((items: { itemId: number }) => (
            <Dots items={items} key={items?.itemId} urlPath={context?.clickedSave} />
          ))}
        </div>
      )}
    </QuizContext.Consumer>
  );
}

export default TopNavigation;