import { createFileRoute, useRouter } from "@tanstack/react-router";
import { deleteItem } from "../../store";
import { useActionState } from "react";

function raise(e: Error): never {
  throw e;
}

export const Route = createFileRoute("/items/$id")({
  component: RouteComponent,
  loader: async (c) =>
    (await c.parentMatchPromise).loaderData?.find((p) => p === c.params.id) ??
    raise(new Error("Item Not Found")),
});

function RouteComponent() {
  const item = Route.useLoaderData();

  const [, action] = useActionState(() => {}, null);

  return (
    <form action={action}>
      Item: {item}
      <FormButtons item={item} />
    </form>
  );
}

function FormButtons({ item }: { item: string }) {
  const router = useRouter();
  const navigate = Route.useNavigate();
  return (
    <button
      formAction={async () => {
        await deleteItem(item);
        // !! When sync is false - no crash, but stale data is shown and /items route is not rerendered
        await router.invalidate({ sync: true });
        await navigate({ to: "/items" });
      }}
    >
      Delete
    </button>
  );
}
