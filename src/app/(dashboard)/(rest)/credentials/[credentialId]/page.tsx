import { requireAuth } from "@/lib/auth-utils";
import React from "react";

interface Props {
  params: Promise<{
    credentialId: string;
  }>;
}

const page = async ({ params }: Props) => {
  await requireAuth();

  const { credentialId } = await params;
  console.log(credentialId);

  return <div>credential id: {credentialId}</div>;
};

export default page;
