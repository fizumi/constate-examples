import * as React from "react";

const CountContext = React.createContext({});
const IncrementContext = React.createContext({});

function useCounter({ initialCount = 0 } = {}) {
  const [count, setCount] = React.useState(initialCount);
  const increment = React.useCallback(() => setCount((c) => c + 1), []);
  return { count, increment };
}

const CounterProvider = ({ children, initialCount }) => {
  const { count, increment } = useCounter({ initialCount });
  return (
    <CountContext.Provider value={count}>
      <IncrementContext.Provider value={increment}>
        {children}
      </IncrementContext.Provider>
    </CountContext.Provider>
  );
};

const useCount = () => {
  return React.useContext(CountContext);
};

const useIncrement = () => {
  return React.useContext(IncrementContext);
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
