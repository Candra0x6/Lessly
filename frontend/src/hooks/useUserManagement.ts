import { useState, useCallback } from 'react';
import { Principal } from '@dfinity/principal';
import { useUserActor } from '@/utility/actors/userManagementActor';
import { AuthError, SubscriptionTier, User } from '@declarations/user/user.did';


export type Result<T, E> = { ok: T } | { err: E };

export function useUserManagement() {
  const actor = useUserActor();
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  /**
   * Create a new user
   * @param username - The user's username
   * @returns Promise with the result
   */
  const createUser = useCallback(
    async (username: string): Promise<Result<User, string>> => {
      setLoading(true);
      setError(null);

      try {
        const result = await actor.createUser(username);
        return result;
      } catch (e) {
        console.error("Failed to create user:", e);
        setError("Failed to create user");
        return { err: "Failed to create user" };
      } finally {
        setLoading(false);
      }
    },
    [actor]
  );

  /**
   * Get user by ID
   * @param userId - The user ID (Principal)
   * @returns Promise with the user or error
   */
  const getUser = useCallback(
    async (userId: Principal): Promise<Result<User, AuthError>> => {
      setLoading(true);
      setError(null);

      try {
        const result = await actor.getUser(userId);
        return result;
      } catch (e) {
        console.error("Failed to get user:", e);
        setError("Failed to get user details");
        return { err: { UserNotFound: null } };
      } finally {
        setLoading(false);
      }
    },
    [actor]
  );

  /**
   * Get user by Principal
   * @param principal - The user principal
   * @returns Promise with the user or null
   */
  const getUserByPrincipal = useCallback(
    async (principal: Principal): Promise<User | null | undefined> => {
      setLoading(true);
      setError(null);

      try {
        const result = await actor.getUserByPrincipal(principal);
        return result.length > 0 ? result[0] : null;
      } catch (e) {
        console.error("Failed to get user by principal:", e);
        setError("Failed to get user by principal");
        return null;
      } finally {
        setLoading(false);
      }
    },
    [actor]
  );

  /**
   * Update user's subscription tier
   * @param tier - The new subscription tier
   * @returns Promise with the result
   */
  const updateSubscription = useCallback(
    async (tier: SubscriptionTier): Promise<Result<User, AuthError>> => {
      setLoading(true);
      setError(null);

      try {
        const result = await actor.updateSubscription(tier);
        return result;
      } catch (e) {
        console.error("Failed to update subscription:", e);
        setError("Failed to update subscription");
        return { err: { UserNotFound: null } };
      } finally {
        setLoading(false);
      }
    },
    [actor]
  );

  return {
    loading,
    error,
    createUser,
    getUser,
    getUserByPrincipal,
    updateSubscription,
  };
}