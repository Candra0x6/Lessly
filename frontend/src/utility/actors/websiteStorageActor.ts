

// Example actor
import { canisterId, createActor } from "@declarations/website_storage";
import { useAuth } from "../use-auth-client";

export function useStorageActor() {
  const { identity } = useAuth();
  const actor = createActor(canisterId, {
    agentOptions: {
      // @ts-ignore
      identity,
    },
  });

  return actor;
}


