import { useState } from "react";

function InputBox() {
  const [text, setText] = useState("");
  return (
    <div>
      <input value={text} onChange={e => setText(e.target.value)} />
      <p>You typed: {text}</p>
    </div>
  );
}
export default InputBox;