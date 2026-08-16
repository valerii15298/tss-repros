import { queryOptions, useSuspenseQuery } from "@tanstack/react-query";
import { createFileRoute } from "@tanstack/react-router";
import { Suspense } from "react";

async function loader() {
  await new Promise((resolve) => setTimeout(resolve, 10 * Math.random()));
  return new Array(9).fill("W".repeat(1024**2))
}

const opts1 = queryOptions({ queryKey: ["data1"], queryFn: loader });
const opts2 = queryOptions({ queryKey: ["data2"], queryFn: loader });

export const Route = createFileRoute("/")({
  loader,
  component: Index,
});

function Index() {

  return (
    <>
      <Suspense fallback={<div>Loading...</div>}>
        <Data1 />
        <Data2 />
      </Suspense>
    </>
  );
}

function Data1() {
  const q1 = useSuspenseQuery(opts1);
  return <div>Data1: {q1.data.length}</div>
}

function Data2() {
  const q2 = useSuspenseQuery(opts2);
  return <div>Data1: {q2.data.length}</div>
}