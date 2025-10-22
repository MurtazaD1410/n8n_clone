import { requireAuth } from "@/lib/auth-utils";
import React from "react";

interface Props {
  params: Promise<{
    workflowId: string;
  }>;
}

const page = async ({ params }: Props) => {
  await requireAuth();

  const { workflowId } = await params;
  console.log(workflowId);

  return <div>workflow id: {workflowId}</div>;
};

export default page;
