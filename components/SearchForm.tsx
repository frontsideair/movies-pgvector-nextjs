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
        header input, select {
          width: 100%;
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
