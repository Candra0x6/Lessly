import { useState, useCallback } from 'react';
import { Principal } from '@dfinity/principal';
import { useStorageActor } from '@/utility/actors/websiteStorageActor';
import { Asset, AssetError, AssetType } from '@declarations/website_storage/website_storage.did';

export type Result<T, E> = { ok: T } | { err: E };

interface WebsiteContent {
  html: string;
  css: string;
  js?: string;
}

export function useWebsiteStorage() {
  const actor = useStorageActor();
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  /**
   * Store asset metadata
   * @param projectId - The project ID
   * @param filename - The filename
   * @param contentType - The content type (MIME type)
   * @param size - The size in bytes
   * @param versionId - The version ID
   * @param assetType - The asset type (html, css, javascript, etc.)
   * @param path - The file path
   * @returns Promise with the result
   */
  const storeAssetMetadata = useCallback(
    async (
      projectId: string,
      filename: string,
      contentType: string,
      size: number,
      versionId: string,
      assetType: AssetType,
      path: string
    ): Promise<Result<Asset, AssetError>> => {
      setLoading(true);
      setError(null);

      try {
        const result = await actor.storeAssetMetadata(
          projectId,
          filename,
          contentType,
          BigInt(size),
          versionId,
          assetType,
          path
        );
        return result;
      } catch (e) {
        console.error("Failed to store asset metadata:", e);
        setError("Failed to store asset metadata");
        return { err: { NotFound: null } };
      } finally {
        setLoading(false);
      }
    },
    [actor]
  );

  /**
   * Store a chunk of asset data
   * @param assetId - The asset ID
   * @param index - The chunk index
   * @param data - The chunk data as Blob
   * @returns Promise with the result
   */
  const storeAssetChunk = useCallback(
    async (assetId: string, index: number, data: Blob): Promise<Result<void, AssetError>> => {
      setLoading(true);
      setError(null);

      try {
        // Convert Blob to ArrayBuffer for IC compatibility
        const arrayBuffer = await data.arrayBuffer();
        const result = await actor.storeAssetChunk(
          assetId,
          BigInt(index),
          new Uint8Array(arrayBuffer)
        );
        // @ts-ignore
        return result;
      } catch (e) {
        console.error("Failed to store asset chunk:", e);
        setError("Failed to store asset chunk");
        return { err: { NotFound: null } };
      } finally {
        setLoading(false);
      }
    },
    [actor]
  );

  /**
   * Get asset metadata
   * @param assetId - The asset ID
   * @returns Promise with the result
   */
  const getAssetMetadata = useCallback(
    async (assetId: string): Promise<Result<Asset, AssetError>> => {
      setLoading(true);
      setError(null);

      try {
        const result = await actor.getAssetMetadata(assetId);
        return result;
      } catch (e) {
        console.error("Failed to get asset metadata:", e);
        setError("Failed to get asset metadata");
        return { err: { NotFound: null } };
      } finally {
        setLoading(false);
      }
    },
    [actor]
  );

  /**
   * Get a chunk of asset data
   * @param assetId - The asset ID
   * @param index - The chunk index
   * @returns Promise with the result
   */
  const getAssetChunk = useCallback(
    async (assetId: string, index: number): Promise<Result<Blob, AssetError>> => {
      setLoading(true);
      setError(null);

      try {
        const result = await actor.getAssetChunk(assetId, BigInt(index));

        if ('ok' in result) {
          // Convert ArrayBuffer to Blob
          // @ts-ignore
          const blob = new Blob([result.ok]);
          return { ok: blob };
        }

        return result;
      } catch (e) {
        console.error("Failed to get asset chunk:", e);
        setError("Failed to get asset chunk");
        return { err: { NotFound: null } };
      } finally {
        setLoading(false);
      }
    },
    [actor]
  );

  /**
   * Get all assets for a project
   * @param projectId - The project ID
   * @returns Promise with array of assets
   */
  const getProjectAssets = useCallback(
    async (projectId: string): Promise<Asset[]> => {
      setLoading(true);
      setError(null);

      try {
        const result = await actor.getProjectAssets(projectId);
        return result;
      } catch (e) {
        console.error("Failed to get project assets:", e);
        setError("Failed to get project assets");
        return [];
      } finally {
        setLoading(false);
      }
    },
    [actor]
  );

  /**
   * Get assets for a specific project version
   * @param projectId - The project ID
   * @param versionId - The version ID
   * @returns Promise with array of assets
   */
  const getVersionAssets = useCallback(
    async (projectId: string, versionId: string): Promise<Asset[]> => {
      setLoading(true);
      setError(null);

      try {
        const result = await actor.getVersionAssets(projectId, versionId);
        return result;
      } catch (e) {
        console.error("Failed to get version assets:", e);
        setError("Failed to get version assets");
        return [];
      } finally {
        setLoading(false);
      }
    },
    [actor]
  );

  /**
   * Delete an asset
   * @param assetId - The asset ID
   * @returns Promise with the result
   */
  const deleteAsset = useCallback(
    async (assetId: string): Promise<Result<void, AssetError>> => {
      setLoading(true);
      setError(null);

      try {
        const result = await actor.deleteAsset(assetId);
        // @ts-ignore
        return result;
      } catch (e) {
        console.error("Failed to delete asset:", e);
        setError("Failed to delete asset");
        return { err: { NotFound: null } };
      } finally {
        setLoading(false);
      }
    },
    [actor]
  );

  /**
   * Set project access permissions
   * @param projectId - The project ID
   * @param userIds - Array of user IDs (Principals)
   * @returns Promise with boolean success result
   */
  const setProjectAccess = useCallback(
    async (projectId: string, userIds: Principal[]): Promise<boolean> => {
      setLoading(true);
      setError(null);

      try {
        const result = await actor.setProjectAccess(projectId, userIds);
        return result;
      } catch (e) {
        console.error("Failed to set project access:", e);
        setError("Failed to set project access");
        return false;
      } finally {
        setLoading(false);
      }
    },
    [actor]
  );

  /**
   * Load website content for preview
   * @param projectId - The project ID
   * @returns Promise with website content (HTML, CSS, JS)
   */
  const loadWebsiteContent = useCallback(
    async (projectId: string): Promise<WebsiteContent | null> => {
      setLoading(true);
      setError(null);

      try {
        // Fetch all assets for the project
        const assets = await getProjectAssets(projectId);

        // Find HTML, CSS, JS assets by asset_type
        const htmlAsset = assets.find(a => "html" in a.asset_type);
        const cssAsset = assets.find(a => "css" in a.asset_type);
        const jsAsset = assets.find(a => "javascript" in a.asset_type);

        // Initialize content object
        const content: WebsiteContent = {
          html: '',
          css: '',
        };

        // Load HTML content
        if (htmlAsset) {
          try {
            // Get the first chunk (assuming HTML is small enough for one chunk)
            const htmlResult = await getAssetChunk(htmlAsset.id, 0);
            if ('ok' in htmlResult) {
              // Convert blob to text
              content.html = await htmlResult.ok.text();
            }
          } catch (e) {
            console.error("Error loading HTML content:", e);
          }
        }

        // Load CSS content
        if (cssAsset) {
          try {
            const cssResult = await getAssetChunk(cssAsset.id, 0);
            if ('ok' in cssResult) {
              content.css = await cssResult.ok.text();
            }
          } catch (e) {
            console.error("Error loading CSS content:", e);
          }
        }

        // Load JS content if needed
        if (jsAsset) {
          try {
            const jsResult = await getAssetChunk(jsAsset.id, 0);
            if ('ok' in jsResult) {
              content.js = await jsResult.ok.text();
            }
          } catch (e) {
            console.error("Error loading JS content:", e);
          }
        }

        return content;
      } catch (e) {
        console.error("Failed to load website content:", e);
        setError("Failed to load website content");
        return null;
      } finally {
        setLoading(false);
      }
    },
    [actor, getProjectAssets, getAssetChunk]
  );

  return {
    loading,
    error,
    storeAssetMetadata,
    storeAssetChunk,
    getAssetMetadata,
    getAssetChunk,
    getProjectAssets,
    getVersionAssets,
    deleteAsset,
    setProjectAccess,
    loadWebsiteContent,
  };
}