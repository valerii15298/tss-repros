import {
  createFileRoute,
  Link,
  Outlet,
  useRouter,
} from "@tanstack/react-router";
import { useTransition } from "react";

export const Route = createFileRoute("/test")({ component: Index });

function Index() {
  Route.useLoaderData();
  const router = useRouter();
  const [pending, startTransition] = useTransition();
  return (
    <div>
      Index
      <button
        style={{ margin: "8px" }}
        disabled={pending}
        onClick={() => startTransition(() => router.invalidate())} // this crashes
        // onClick={() => router.invalidate()} // this works
      >
        invalidate
      </button>
      <Link to="/">Go to Root</Link>
      <Outlet />
    </div>
  );
}
