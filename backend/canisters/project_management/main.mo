import HashMap "mo:base/HashMap";
import Principal "mo:base/Principal";
import Text "mo:base/Text";
import Array "mo:base/Array";
import Time "mo:base/Time";
import Result "mo:base/Result";
import Iter "mo:base/Iter";
import Nat "mo:base/Nat";
import Types "../../types/lib";

/// Project Management canister handles creation and management of website projects
actor ProjectManagement {
  type Project = Types.Project;
  type ProjectId = Types.ProjectId;
  type UserId = Types.UserId;
  type ProjectVersion = Types.ProjectVersion;
  type VersionId = Types.VersionId;
  type ProjectError = Types.ProjectError;

  // Stable storage for projects
  private stable var projectEntries : [(ProjectId, Project)] = [];
  private var projects = HashMap.HashMap<ProjectId, Project>(0, Text.equal, Text.hash);

  // Stable storage for versions
  private stable var versionEntries : [(VersionId, ProjectVersion)] = [];
  private var versions = HashMap.HashMap<VersionId, ProjectVersion>(0, Text.equal, Text.hash);

  // System upgrade hooks for orthogonal persistence
  system func preupgrade() {
    projectEntries := Iter.toArray(projects.entries());
    versionEntries := Iter.toArray(versions.entries());
  };

  system func postupgrade() {
    projects := HashMap.fromIter<ProjectId, Project>(projectEntries.vals(), 0, Text.equal, Text.hash);
    versions := HashMap.fromIter<VersionId, ProjectVersion>(versionEntries.vals(), 0, Text.equal, Text.hash);
    projectEntries := [];
    versionEntries := [];
  };

  /// Create a new project
  /// Returns the new project record or an error
  public shared (msg) func createProject(name : Text, description : Text, template_id : ?Text) : async Result.Result<Project, ProjectError> {
    let caller = msg.caller;
    let now = Time.now();

    // Generate a simple project ID (would use UUID in production)
    let projectId = name # "-" # Principal.toText(caller);
    let versionId = "v1-" # projectId;

    // Create URL slug from name (simplified)
    let url_slug = Text.map(
      name,
      func(c : Char) : Char {
        if (c == ' ') { '-' } else { c };
      },
    );

    // Create new project
    let newProject : Project = {
      id = projectId;
      name = name;
      owner = caller;
      description = description;
      created_at = now;
      updated_at = now;
      published = false;
      url_slug = url_slug;
      collaborators = [];
      current_version = versionId;
      template_id = template_id;
    };

    // Create initial version
    let initialVersion : ProjectVersion = {
      id = versionId;
      project_id = projectId;
      created_at = now;
      created_by = caller;
      description = "Initial version";
    };

    projects.put(projectId, newProject);
    versions.put(versionId, initialVersion);

    return #ok(newProject);
  };

  /// Get project by ID - query function that doesn't modify state
  /// Returns the project record or an error
  public query func getProject(projectId : ProjectId) : async Result.Result<Project, ProjectError> {
    switch (projects.get(projectId)) {
      case (?project) { #ok(project) };
      case null { #err(#NotFound) };
    };
  };

  /// Get all projects for a user - query function that doesn't modify state
  /// Returns an array of projects owned by the specified user
  public query func getUserProjects(userId : UserId) : async [Project] {
    let userProjects = Array.filter<Project>(
      Iter.toArray(projects.vals()),
      func(p) { p.owner == userId },
    );
    return userProjects;
  };

  /// Update project metadata
  /// Returns the updated project record or an error
  public shared (msg) func updateProject(projectId : ProjectId, name : ?Text, description : ?Text) : async Result.Result<Project, ProjectError> {
    let caller = msg.caller;

    switch (projects.get(projectId)) {
      case (?project) {
        // Check if caller is owner or collaborator
        let isCollaborator = switch (Array.find<UserId>(project.collaborators, func(id) { id == caller })) {
          case (?_) { true };
          case null { false };
        };

        if (project.owner != caller and not isCollaborator) {
          return #err(#Unauthorized);
        };

        let updatedProject : Project = {
          id = project.id;
          name = switch (name) { case (?n) { n }; case null { project.name } };
          owner = project.owner;
          description = switch (description) {
            case (?d) { d };
            case null { project.description };
          };
          created_at = project.created_at;
          updated_at = Time.now();
          published = project.published;
          url_slug = project.url_slug;
          collaborators = project.collaborators;
          current_version = project.current_version;
          template_id = project.template_id;
        };

        projects.put(projectId, updatedProject);
        return #ok(updatedProject);
      };
      case null { #err(#NotFound) };
    };
  };

  /// Publish a project (make it public)
  /// Returns the updated project record or an error
  public shared (msg) func publishProject(projectId : ProjectId, publish : Bool) : async Result.Result<Project, ProjectError> {
    let caller = msg.caller;

    switch (projects.get(projectId)) {
      case (?project) {
        // Check if caller is owner
        if (project.owner != caller) {
          return #err(#Unauthorized);
        };

        let updatedProject : Project = {
          id = project.id;
          name = project.name;
          owner = project.owner;
          description = project.description;
          created_at = project.created_at;
          updated_at = Time.now();
          published = publish;
          url_slug = project.url_slug;
          collaborators = project.collaborators;
          current_version = project.current_version;
          template_id = project.template_id;
        };

        projects.put(projectId, updatedProject);
        return #ok(updatedProject);
      };
      case null { #err(#NotFound) };
    };
  };

  /// Create a new version of a project
  /// Returns the new version record or an error
  public shared (msg) func createVersion(projectId : ProjectId, description : Text) : async Result.Result<ProjectVersion, ProjectError> {
    let caller = msg.caller;

    switch (projects.get(projectId)) {
      case (?project) {
        // Check if caller is owner or collaborator
        let isCollaborator = switch (Array.find<UserId>(project.collaborators, func(id) { id == caller })) {
          case (?_) { true };
          case null { false };
        };

        if (project.owner != caller and not isCollaborator) {
          return #err(#Unauthorized);
        };

        let now = Time.now();
        let versionId = "v" # Nat.toText(versions.size() + 1) # "-" # projectId;

        let newVersion : ProjectVersion = {
          id = versionId;
          project_id = projectId;
          created_at = now;
          created_by = caller;
          description = description;
        };

        // Update the project's current version
        let updatedProject : Project = {
          id = project.id;
          name = project.name;
          owner = project.owner;
          description = project.description;
          created_at = project.created_at;
          updated_at = now;
          published = project.published;
          url_slug = project.url_slug;
          collaborators = project.collaborators;
          current_version = versionId;
          template_id = project.template_id;
        };

        versions.put(versionId, newVersion);
        projects.put(projectId, updatedProject);

        return #ok(newVersion);
      };
      case null { #err(#NotFound) };
    };
  };

  /// Get all versions of a project - query function that doesn't modify state
  /// Returns an array of project versions
  public query func getProjectVersions(projectId : ProjectId) : async Result.Result<[ProjectVersion], ProjectError> {
    switch (projects.get(projectId)) {
      case (?project) {
        let projectVersions = Array.filter<ProjectVersion>(
          Iter.toArray(versions.vals()),
          func(v) { v.project_id == projectId },
        );
        return #ok(projectVersions);
      };
      case null { #err(#NotFound) };
    };
  };
};
