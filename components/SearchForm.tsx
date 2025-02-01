import { distanceFunctions, type Query } from "@/lib/shared";
import Form from "next/form";
import { SubmitButton } from "./SubmitButton";

export function SearchForm({ q, limit, distance }: Query) {
  return (
    <search>
      <style href="search-form" precedence="default">{`
        header form {
          display: flex;
          align-items: flex-end;
          gap: 0.5rem;
        }
        header label {
          display: flex;
          flex-direction: column;
          gap: 0.25rem;
        }
        header input, select {
          width: 100%;
        }
        header input, select, button {
          appearance: none;
          padding: 0.5rem;
          border: 1px solid var(--border-color);
          border-radius: 0.25rem;
          font-size: 1rem;
          line-height: 1.5;
        }
        header select {
          background: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='none' stroke='currentColor' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'%3E%3Cpolyline points='6 9 12 15 18 9'%3E%3C/polyline%3E%3C/svg%3E") no-repeat right 0.5rem center/1.5em;
        }
      `}</style>
      <Form action="/">
        <label>
          <div>Search query</div>
          <input type="search" name="q" defaultValue={q} key={q} />
        </label>
        <label>
          <div>Number of results</div>
          <select name="limit" defaultValue={limit} key={limit}>
            <option value="10">10</option>
            <option value="20">20</option>
            <option value="50">50</option>
          </select>
        </label>
        <label>
          <div>Distance function</div>
          <select name="distance" defaultValue={distance} key={distance}>
            {distanceFunctions.map((df) => (
              <option key={df.name} value={df.name}>
                {df.description}
              </option>
            ))}
          </select>
        </label>
        <SubmitButton />
      </Form>
    </search>
  );
}
