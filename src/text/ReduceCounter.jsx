import { useReducer } from "react";

function reducer(state, action) {
  if (action.type === "inc") return { count: state.count + 1 };
  if (action.type === "dec") return { count: state.count - 1 };
  return state;
}

function ReducerCounter() {
  const [state, dispatch] = useReducer(reducer, { count: 0 });
  return (
    <div>
      <p>{state.count}</p>
      <button onClick={() => dispatch({ type: "inc" })}>+</button>
      <button onClick={() => dispatch({ type: "dec" })}>-</button>
    </div>
  );
}
export default ReducerCounter;