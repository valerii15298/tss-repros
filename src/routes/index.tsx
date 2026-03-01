import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/")({
  component: Index,
  loader: () => Promise.reject(new Error("Ooooops")),
});

function Index() {
  Route.useLoaderData();
  return <div>Index</div>;
}
