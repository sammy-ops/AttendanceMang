import { useRef } from "react";

function ClickCounter() {
  const count = useRef(0);

  return (
    <button onClick={() => { count.current++; console.log(count.current); }}>
      Click Me
    </button>
  );
}
export default ClickCounter;