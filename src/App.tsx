import { useCallback, useState } from "react";
import Content from "./ui/Content";

function App() {
  const [count, setCount] = useState(0);

  const handleIncrease = useCallback(() => {
    setCount((prevCount) => prevCount + 1);
  }, []);

  return (
    <div className="container">
      <Content onInscrease={handleIncrease} />
      <h1>Count: {count}</h1>
    </div>
  );
}

export default App;
