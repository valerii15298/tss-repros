import { createIsomorphicFn } from "@tanstack/react-start";

const getStorage = createIsomorphicFn()
  .client(() => localStorage)
  .server(
    () =>
      ({
        getItem: () => null,
        setItem: () => {},
      }) as unknown as Storage,
  );

const sleep = (ms: number) => new Promise((res) => setTimeout(res, ms));
const key = "store";
export async function getItems() {
  await sleep(500);
  return JSON.parse(getStorage().getItem(key) || "[]") as string[];
}

export async function addItem(item: string) {
  const items = await getItems();
  items.push(item);
  getStorage().setItem(key, JSON.stringify(items));
}

export async function deleteItem(item: string) {
  const items = await getItems();
  const newItems = items.filter((i) => i !== item);
  getStorage().setItem(key, JSON.stringify(newItems));
}
