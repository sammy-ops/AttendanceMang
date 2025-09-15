import { useEffect } from "react";

function Hello() {
  useEffect(() => {
    console.log("Component mounted!");
  }, []);
  return <h2>Hello</h2>;
}
export default Hello;