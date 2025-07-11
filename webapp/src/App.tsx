import { useState } from "react";

function App() {
  const [crash, setCrash] = useState(false);

  if (crash) throw new Error("Intentionally crashed");

  return (
    <>
      <h1>Madnessify</h1>
      <button type="button" onClick={() => setCrash(true)}>
        Break
      </button>
    </>
  );
}

export default App;
