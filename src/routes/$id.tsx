import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/$id")({
  params: {
    parse: (p) => ({ id: Number(p.id) }),
    stringify: (p) => ({ id: String(p.id) }),
  },
  server: {
    handlers: {
      GET({ params }) {
        // params type: { id: number; } but in runtime actually { id: string; }
        console.log(typeof params.id)
        return Response.json(params);
      },
    },
  },
});
