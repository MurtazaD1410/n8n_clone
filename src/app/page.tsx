"use client";

import { useTRPC } from "@/trpc/client";
import { useQuery, useQueryClient } from "@tanstack/react-query";

const Page = () => {
  const trpc = useTRPC();
  const { data: users } = useQuery(trpc.getUsers.queryOptions());
  return (
    <div className="">
      <pre>{JSON.stringify(users, null, 2)}</pre>
    </div>
  );
};

export default Page;
