import React from "react";

function Square({ grid, handleClick }) {
  return (
    <div className="board">
      {grid.map((item, index) => {
        if (item === "") {
          return (
            <div
              key={index}
              className="square"
              onClick={() => handleClick(index)}
            >
              {item}
            </div>
          );
        } else {
          return (
            <div key={index} className="square clicked">
              {item}
            </div>
          );
        }
      })}
    </div>
  );
}

export default Square;
