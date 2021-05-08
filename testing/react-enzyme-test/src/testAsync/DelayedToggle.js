import React, { useState } from "react";

function DelayedToggle() {
  const [toggle, setToggle] = useState(false);

  const onToggle = () => {
    setTimeout(() => {
      setToggle((toggle) => !toggle);
    }, 1000);
  };
  return (
    <div>
      <button onClick={onToggle}>Toggle</button>
      <div>
        state : <span>{toggle ? "ON" : "OFF"}</span>
      </div>
      {toggle && <div>Boom!!</div>}
    </div>
  );
}

export default DelayedToggle;
