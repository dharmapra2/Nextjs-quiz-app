import React from "react";

// we are using memo to prevent unnecessary re render
function Page({ params }: { params: { itemId: string } }) {
  return (
    <section className="row-span-6 col-span-5 bg-red-500">
      My Post: {params.itemId}
    </section>
  );
}

export default React.memo(Page);
