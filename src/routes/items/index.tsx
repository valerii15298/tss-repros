import { createFileRoute, Link, useRouter } from "@tanstack/react-router";
import { addItem } from "../../store";

export const Route = createFileRoute("/items/")({
  component: RouteComponent,
  loader: async (c) => (await c.parentMatchPromise).loaderData,
});

function RouteComponent() {
  const items = Route.useLoaderData() ?? [];
  const router = useRouter();
  return (
    <div
      style={{
        display: "grid",
        gap: "1rem",
      }}
    >
      <Link to="/">Home</Link>
      <button
        onClick={async () => {
          await addItem(crypto.randomUUID());
          await router.invalidate();
        }}
      >
        Add Item
      </button>
      {items.map((id) => (
        <Link key={id} to="/items/$id" params={{ id }}>
          {id}
        </Link>
      ))}
    </div>
  );
}
