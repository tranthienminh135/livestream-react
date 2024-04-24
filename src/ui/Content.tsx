import React, { memo } from "react";

const Content = ({ onInscrease }: any) => {
  console.log("re-render");

  return (
    <div>
      <h1>Day la content!!</h1>
      <button className="btn btn-primary" onClick={onInscrease}>
        Increase
      </button>
    </div>
  );
};
// ===
export default memo(Content);
