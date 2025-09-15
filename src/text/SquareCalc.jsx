import { useState, useMemo } from "react";

function SquareCalc() {
  const [num, setNum] = useState(0);
  const squared = useMemo(() => num * num, [num]);

  return (
    <div>
      <input type="number" onChange={e => setNum(Number(e.target.value))} />
      <p>Square: {squared}</p>
    </div>
  );
}
export default SquareCalc;