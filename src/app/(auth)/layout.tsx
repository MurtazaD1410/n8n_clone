import { Authlayout } from "@/features/auth/components/auth-layout";
import React from "react";

const layout = ({ children }: { children: React.ReactNode }) => {
  return <Authlayout>{children}</Authlayout>;
};

export default layout;
