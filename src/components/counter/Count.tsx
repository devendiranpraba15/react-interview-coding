"use client"

import React, { useState } from "react";
interface CounterProps {
  type?: string;
}

type CountState = number;

type CounterAction = "increment" | "decrement";

// type ButtonClick = React.MouseEvent<HTMLButtonElement>;
// JSX.Element
const Counter: React.FC<CounterProps> = () => {
  const [count, setCount] = useState<CountState>(0);

  const handleChangeCount = (
    type: CounterAction
    // event?: ButtonClick
  ): void => {
    setCount((prev): number =>
      type === "increment" ? prev + 1 : prev > 0 ? prev - 1 : 0
    );
  };

  return (
    <>
      <p>{count}</p>
      <button onClick={() => handleChangeCount("increment")}>Increment</button>
      <button onClick={() => handleChangeCount("decrement")}>Decrement</button>
    </>
  );
};

export default Counter;
