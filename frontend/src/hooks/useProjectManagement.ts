import { useState, useCallback } from 'react';
import { Principal } from '@dfinity/principal';
import { useProjectActor } from '@/utility/actors/projectManagementActor';
import { Project, ProjectError, ProjectVersion } from '@declarations/project_management/project_management.did';



export type Result<T, E> = { ok: T } | { err: E };

export function useProjectManagement() {
  const actor = useProjectActor();
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  /**
   * Create a new project
   * @param name - The project name
   * @param description - The project description
   * @param template_id - Optional template ID
   * @returns Promise with the result
   */
  const createProject = useCallback(
    async (name: string, description: string, template_id?: string): Promise<Result<Project, ProjectError>> => {
      setLoading(true);
      setError(null);

      try {
        const result = await actor.createProject(name, description, template_id ? [template_id] : []);
        return result;
      } catch (e) {
        console.error("Failed to create project:", e);
        setError("Failed to create project");
        return { err: { NotFound: null } };
      } finally {
        setLoading(false);
      }
    },
    [actor]
  );

  /**
   * Get project by ID
   * @param projectId - The project ID
   * @returns Promise with the project or error
   */
  const getProject = useCallback(
    async (projectId: string): Promise<Result<Project, ProjectError>> => {
      setLoading(true);
      setError(null);

      try {
        const result = await actor.getProject(projectId);
        return result;
      } catch (e) {
        console.error("Failed to get project:", e);
        setError("Failed to get project details");
        return { err: { NotFound: null } };
      } finally {
        setLoading(false);
      }
    },
    [actor]
  );

  /**
   * Get all projects for a user
   * @param userId - The user ID (Principal)
   * @returns Promise with array of projects
   */
  const getUserProjects = useCallback(
    async (userId: Principal): Promise<Project[]> => {
      setLoading(true);
      setError(null);

      try {
        const result = await actor.getUserProjects(userId);
        return result;
      } catch (e) {
        console.error("Failed to get user projects:", e);
        setError("Failed to get user projects");
        return [];
      } finally {
        setLoading(false);
      }
    },
    [actor]
  );

  /**
   * Update project metadata
   * @param projectId - The project ID
   * @param name - Optional new name
   * @param description - Optional new description
   * @returns Promise with the result
   */
  const updateProject = useCallback(
    async (projectId: string, name?: string, description?: string): Promise<Result<Project, ProjectError>> => {
      setLoading(true);
      setError(null);

      try {
        const result = await actor.updateProject(projectId, name ? [name] : [], description ? [description] : []);
        return result;
      } catch (e) {
        console.error("Failed to update project:", e);
        setError("Failed to update project");
        return { err: { NotFound: null } };
      } finally {
        setLoading(false);
      }
    },
    [actor]
  );

  /**
   * Publish or unpublish a project
   * @param projectId - The project ID
   * @param publish - Whether to publish (true) or unpublish (false)
   * @returns Promise with the result
   */
  const publishProject = useCallback(
    async (projectId: string, publish: boolean): Promise<Result<Project, ProjectError>> => {
      setLoading(true);
      setError(null);

      try {
        const result = await actor.publishProject(projectId, publish);
        return result;
      } catch (e) {
        console.error("Failed to publish project:", e);
        setError("Failed to publish project");
        return { err: { NotFound: null } };
      } finally {
        setLoading(false);
      }
    },
    [actor]
  );

  /**
   * Create a new version of a project
   * @param projectId - The project ID
   * @param description - The version description
   * @returns Promise with the result
   */
  const createVersion = useCallback(
    async (projectId: string, description: string): Promise<Result<ProjectVersion, ProjectError>> => {
      setLoading(true);
      setError(null);

      try {
        const result = await actor.createVersion(projectId, description);
        return result;
      } catch (e) {
        console.error("Failed to create version:", e);
        setError("Failed to create version");
        return { err: { NotFound: null } };
      } finally {
        setLoading(false);
      }
    },
    [actor]
  );

  /**
   * Get all versions of a project
   * @param projectId - The project ID
   * @returns Promise with the result
   */
  const getProjectVersions = useCallback(
    async (projectId: string): Promise<Result<ProjectVersion[], ProjectError>> => {
      setLoading(true);
      setError(null);

      try {
        const result = await actor.getProjectVersions(projectId);
        return result;
      } catch (e) {
        console.error("Failed to get project versions:", e);
        setError("Failed to get project versions");
        return { err: { NotFound: null } };
      } finally {
        setLoading(false);
      }
    },
    [actor]
  );

  return {
    loading,
    error,
    createProject,
    getProject,
    getUserProjects,
    updateProject,
    publishProject,
    createVersion,
    getProjectVersions,
  };
}