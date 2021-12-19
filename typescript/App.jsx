import * as React from "react";
import { Provider, atom, useAtom } from "jotai";
import { useUpdateAtom } from "jotai/utils";

const countAtom = atom(0);

function useIncrement() {
  const setCount = useUpdateAtom(countAtom);
  return () => setCount((c) => c + 1);
  // return React.useCallback(() => setCount((c) => c + 1), []); // メモ化不要
}

function IncrementButton() {
  console.log("render IncrementButton");
  const increment = useIncrement();
  return <button onClick={increment}>+</button>;
}

function Count() {
  console.log("render Count");
  const [count] = useAtom(countAtom);
  return <span>{count}</span>;
}

function App() {
  return (
    <Provider initialValues={[[countAtom, 10]]}>
      <Count />
      <IncrementButton />
    </Provider>
  );
}

export default App;
