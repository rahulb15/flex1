import { useState,useContext,createContext } from "react";

const CountContext = createContext(null);

export function CountProvider(props) {
  const [count, setCount] = useState(20);
console.log("count",count)
  const incrementCount = () => {
    setCount((prevCount) => prevCount + 1);
  };

  const decrementCount = () => {
    setCount((prevCount) => prevCount - 1);
  };

  const resetCount = () => {
    setCount(0);
  };

  const value = {
    count,
    incrementCount,
    decrementCount,
    resetCount,
  };

  return (
    <CountContext.Provider value={value}>
      {props.children}
    </CountContext.Provider>
  );
}

export function useCount() {
  const context = useContext(CountContext);
  if (!context) {
    throw new Error("useCount must be used within a CountProvider");
  }
  return context;
}

