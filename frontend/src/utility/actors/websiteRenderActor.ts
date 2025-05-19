

// Example actor
import { canisterId, createActor } from "@declarations/website_render";
import { useAuth } from "../use-auth-client";

export function useRenderActor() {
  const { identity } = useAuth();
  const actor = createActor(canisterId, {
    agentOptions: {
      // @ts-ignore
      identity,
    },
  });

  return actor;
}


