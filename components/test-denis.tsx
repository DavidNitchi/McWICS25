"use client";

import { useState } from "react";

export default function DenisTest() {
  const [testText, setTestText] = useState();

  return (
    <div>
      <button
        onClick={async () => {
          const response = await fetch("/api/hello");
          const data = await response.json();
          setTestText(data.message);
        }}
      >
        test test
      </button>
      <div>{testText}</div>
    </div>
  );
}
