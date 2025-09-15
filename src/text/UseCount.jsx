import { useState } from "react";

function UseCount() {
  const [count, setCount] = useState(0); // initial value = 0

  return (
    <button onClick={() => setCount(count + 1)}>
      Count: {count}
    </button>
  );
}

export default UseCount;
