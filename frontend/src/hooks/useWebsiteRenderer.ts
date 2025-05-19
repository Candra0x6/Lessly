import { useState, useCallback } from 'react';
import { Principal } from '@dfinity/principal';
import { useRenderActor } from '@/utility/actors/websiteRenderActor';
import { Domain, HttpRequest, HttpResponse, StreamingCallbackResponse, StreamingCallbackResponse__1, StreamingCallbackToken } from '@declarations/website_render/website_render.did';



export type Result<T, E> = { ok: T } | { err: E };

export function useWebsiteRenderer() {
  const actor = useRenderActor();
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  /**
   * Link a custom domain to a project
   * @param domain_name - The domain name
   * @param project_id - The project ID
   * @returns Promise with the result
   */
  const linkDomain = useCallback(
    async (domain_name: string, project_id: string): Promise<Result<Domain, string>> => {
      setLoading(true);
      setError(null);

      try {
        const result = await actor.linkDomain(domain_name, project_id);
        return result;
      } catch (e) {
        console.error("Failed to link domain:", e);
        setError("Failed to link domain");
        return { err: "Failed to link domain" };
      } finally {
        setLoading(false);
      }
    },
    [actor]
  );

  /**
   * Handle HTTP request
   * @param request - The HTTP request
   * @returns Promise with the HTTP response
   */
  const httpRequest = useCallback(
    async (request: HttpRequest): Promise<HttpResponse> => {
      setLoading(true);
      setError(null);

      try {
        const result = await actor.http_request(request);
        return result;
      } catch (e) {
        console.error("Failed to process HTTP request:", e);
        setError("Failed to process HTTP request");

        // Return a basic error response
        return {
          status_code: 500,
          headers: [["Content-Type", "text/plain"]],
          body: new TextEncoder().encode("Internal server error"),
          streaming_strategy: []
        };
      } finally {
        setLoading(false);
      }
    },
    [actor]
  );

  /**
   * Handle streaming callback for large assets
   * @param token - The streaming callback token
   * @returns Promise with the streaming callback response
   */
  const httpStreamingCallback = useCallback(
    async (token: StreamingCallbackToken): Promise<StreamingCallbackResponse__1> => {
      setLoading(true);
      setError(null);

      try {
        const result = await actor.http_streaming_callback(token);
        return result;
      } catch (e) {
        console.error("Failed to process streaming callback:", e);
        setError("Failed to process streaming callback");

        // Return a basic error response
        return {
          body: new Uint8Array(0),
          token: []
        };
      } finally {
        setLoading(false);
      }
    },
    [actor]
  );

  /**
   * Get all domains linked to a project
   * @param project_id - The project ID
   * @returns Promise with array of domains
   */
  const getProjectDomains = useCallback(
    async (project_id: string): Promise<Domain[]> => {
      setLoading(true);
      setError(null);

      try {
        const result = await actor.getProjectDomains(project_id);
        return result;
      } catch (e) {
        console.error("Failed to get project domains:", e);
        setError("Failed to get project domains");
        return [];
      } finally {
        setLoading(false);
      }
    },
    [actor]
  );

  return {
    loading,
    error,
    linkDomain,
    httpRequest,
    httpStreamingCallback,
    getProjectDomains,
  };
}