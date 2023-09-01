import React from "react";

// we are using memo to prevent unnecessary re render
function Page({ params }: { params: { itemId: string } }) {
  return (
    <article className="h-full flex flex-col bg-red-500">
      <aside className="flex flex-row">
        <h3>i</h3>
        <p>Question No.{params.itemId} of 5</p>
      </aside>
      <section>
        <div className="questionbox-border h-20 p-4 border-4">
          Q. Adolf Hitler was tried at the Nuremberg trials.
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
