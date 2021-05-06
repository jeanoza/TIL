import React, { useState } from "react";

function HookCounter() {
  const [number, setNumber] = useState(0);
  const handlePlus = () => {
    setNumber((prev) => prev + 1);
  };
  const handleMinus = () => {
    setNumber((prev) => prev - 1);
  };

  return (
    <div>
      <h2>{number}</h2>
      <button onClick={handlePlus}>+1</button>
      <button onClick={handleMinus}>-1</button>
    </div>
  );
}

export default HookCounter;
