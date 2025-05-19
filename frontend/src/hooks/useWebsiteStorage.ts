import { useState } from 'react';
import { useAuth } from '@/utility/use-auth-client';
import { canisterId as websiteStorageCanisterId } from '@declarations/website_storage';
import { idlFactory as websiteStorageIdlFactory } from '@declarations/website_storage';
import { Actor, HttpAgent } from '@dfinity/agent';

interface WebsiteContent {
  html: string;
  css: string;
  js?: string;
  assets?: Array<{
    id: string;
    url: string;
    type: string;
  }>;
}

export const useWebsiteStorage = () => {
  const { identity, isAuthenticated } = useAuth();
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const createWebsiteStorageActor = async () => {
    if (!identity || !isAuthenticated) {
      throw new Error('User is not authenticated');
    }

    const agent = new HttpAgent({
      identity,
      host: process.env.DFX_NETWORK === 'ic'
        ? 'https://ic0.app'
        : 'http://localhost:4943',
    });

    // Only fetch root key in development
    if (process.env.DFX_NETWORK !== 'ic') {
      await agent.fetchRootKey();
    }

    const actor = Actor.createActor(websiteStorageIdlFactory, {
      agent,
      canisterId: websiteStorageCanisterId,
    });

    return actor;
  };

  const saveWebsiteContent = async (projectId: string, content: WebsiteContent) => {
    setIsLoading(true);
    setError(null);

    try {
      const actor: any = await createWebsiteStorageActor();

      // Assuming the canister has a method to save website content
      await actor.saveWebsiteContent({
        projectId,
        html: content.html,
        css: content.css,
        js: content.js || '',
        assets: content.assets || [],
      });

      return true;
    } catch (err: any) {
      console.error('Error saving website content:', err);
      setError(err.message || 'Failed to save website content');
      return false;
    } finally {
      setIsLoading(false);
    }
  };

  const loadWebsiteContent = async (projectId: string): Promise<WebsiteContent | null> => {
    setIsLoading(true);
    setError(null);

    try {
      const actor: any = await createWebsiteStorageActor();

      // Assuming the canister has a method to get website content
      const result = await actor.getWebsiteContent(projectId);

      if (!result) {
        return null;
      }

      return {
        html: result.html,
        css: result.css,
        js: result.js,
        assets: result.assets,
      };
    } catch (err: any) {
      console.error('Error loading website content:', err);
      setError(err.message || 'Failed to load website content');
      return null;
    } finally {
      setIsLoading(false);
    }
  };

  return {
    saveWebsiteContent,
    loadWebsiteContent,
    isLoading,
    error,
  };
};