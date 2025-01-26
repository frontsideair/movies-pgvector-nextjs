import { distanceFunctions, type Query } from "@/lib/shared";

export function SearchForm({ q, limit, distance }: Query) {
  return (
    <search>
      <style>{`
        header form {
          display: flex;
          align-items: flex-end;
          gap: 0.5rem;
        }
        header input, select {
          width: 100%;
        }
      `}</style>
      <form>
        <label>
          <div>Search query</div>
          <input type="search" name="q" defaultValue={q} />
        </label>
        <label>
          <div>Number of results</div>
          <select name="limit" defaultValue={limit}>
            <option value="10">10</option>
            <option value="20">20</option>
            <option value="50">50</option>
          </select>
        </label>
        <label>
          <div>Distance function</div>
          <select name="distance" defaultValue={distance}>
            {distanceFunctions.map((df) => (
              <option key={df.name} value={df.name}>
                {df.description}
              </option>
            ))}
          </select>
        </label>
        <button type="submit">Search</button>
      </form>
    </search>
  );
}
