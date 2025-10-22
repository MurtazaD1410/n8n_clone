import { requireAuth } from "@/lib/auth-utils";
import React from "react";

interface Props {
  params: Promise<{
    executionId: string;
  }>;
}

const page = async ({ params }: Props) => {
  await requireAuth();

  const { executionId } = await params;
  console.log(executionId);

  return <div>execution id: {executionId}</div>;
};

export default page;
