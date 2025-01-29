"use client";

import { useFormStatus } from "react-dom";

export function SubmitButton() {
  const { pending } = useFormStatus();
  return (
    <button type="submit" aria-busy={pending}>
      <style href="submit-button" precedence="default">{`
        button[type="submit"][aria-busy="true"] {
          opacity: 0.5;
        }
      `}</style>
      Search{pending ? "..." : ""}
    </button>
  );
}
