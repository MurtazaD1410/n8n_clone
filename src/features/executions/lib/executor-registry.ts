import { NodeType } from "@/generated/prisma";
import { NodeExecutor } from "../types";
import { httpRequestExecutor } from "@/features/executions/components/http-request/executor";
import { manualTriggerExecutor } from "@/features/triggers/components/manual-trigger/executor";

export const executorRegistry: Record<NodeType, NodeExecutor> = {
  [NodeType.MANUAL_TRIGGER]: manualTriggerExecutor,
  [NodeType.INITIAL]: () => Promise.resolve({}),
  [NodeType.HTTP_REQUEST]: httpRequestExecutor,
};

export const getExecutor = (type: NodeType): NodeExecutor => {
  const executor = executorRegistry[type];
  if (!executor) {
    throw new Error(`Executor for type ${type} not found`);
  }
  return executor;
};
