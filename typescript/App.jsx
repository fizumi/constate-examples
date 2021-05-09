import * as React from "react";

const Context = React.createContext({});

function useCounter({ initialCount = 0 } = {}) {
  const [count, setCount] = React.useState(initialCount);
  const increment = React.useCallback(() => setCount((c) => c + 1), []);
  return { count, increment };
}

const CounterProvider = ({ children, initialCount }) => {
  const value = useCounter({ initialCount });
  return <Context.Provider value={value}>{children}</Context.Provider>;
};

const useCount = () => {
  const value = React.useContext(Context);
  return value.count;
};

const useIncrement = () => {
  const value = React.useContext(Context);
  return value.increment;
};

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
