import { requireAuth } from "@/lib/auth-utils";
import { caller } from "@/trpc/server";

const Page = async () => {
  await requireAuth();

  const data = await caller.getUsers();

  return (
    <div className="flex items-center justify-center min-h-screen min-w-screen">
      protected
      {JSON.stringify(data)}
    </div>
  );
};

export default Page;
