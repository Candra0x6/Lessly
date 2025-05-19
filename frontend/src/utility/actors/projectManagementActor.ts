

// Example actor
import { canisterId, createActor } from "@declarations/project_management";
import { useAuth } from "../use-auth-client";

export function useProjectActor() {
  const { identity } = useAuth();
  const actor = createActor(canisterId, {
    agentOptions: {
      // @ts-ignore
      identity,
    },
  });

  return actor;
}


