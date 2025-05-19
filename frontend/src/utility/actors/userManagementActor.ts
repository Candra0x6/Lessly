

// Example actor
import { canisterId, createActor } from "@declarations/user";
import { useAuth } from "../use-auth-client";

export function useUserActor() {
  const { identity } = useAuth();
  const actor = createActor(canisterId, {
    agentOptions: {
      // @ts-ignore
      identity,
    },
  });

  return actor;
}


