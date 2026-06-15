import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/test/")({
  component: RouteComponent,
});

function RouteComponent() {
  if (true as boolean) throw new Error("test error");
  return <div>Hello "/test"!</div>;
}
