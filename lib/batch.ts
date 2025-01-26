import type { Parser } from "csv-parse/.";

export async function* batch(iterable: Parser, batchSize: number) {
  let items: any[] = [];
  for await (const item of iterable) {
    items.push(item);
    if (items.length >= batchSize) {
      yield items;
      items = [];
    }
  }
  if (items.length !== 0) {
    yield items;
  }
}
