import React from "react";

function JumbotronRes({ children }) {
  return (
    <div
      style={{ width: "100%", textAlign: "center" }}
      className="jumbotron"
    >
      { children }
    </div>
  );
}

export default JumbotronRes;
