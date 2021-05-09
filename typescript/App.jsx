import * as React from "react";
import constate from "constate";

function useCounter({ initialCount = 0 } = {}) {
  const [count, setCount] = React.useState(initialCount);
  const increment = React.useCallback(() => setCount((c) => c + 1), []);
  return { count, increment };
}

const [CounterProvider, useCount, useIncrement] = constate(
  useCounter,
  (value) => value.count,
  (value) => value.increment
);

function IncrementButton() {
  console.log("render IncrementButton");
  const increment = useIncrement();
  return <button onClick={increment}>+</button>;
}

function Count() {
  console.log("render Count");
  const count = useCount();
  return <span>{count}</span>;
}

function App() {
  return (
    <CounterProvider initialCount={10}>
      <Count />
      <IncrementButton />
    </CounterProvider>
  );
}

export default App;
