import { useState } from "react";
import "./Welcome.css";

function Counter() {
  const [count, setCount] = useState(0);
  const increment = () => {
    setCount(count + 1);
  }
  return (
    <div className="counter-section">
      <h1>Counter: {count}</h1>
      <button onClick={increment}>Increment</button>
    </div>
  )
}

export default Counter;