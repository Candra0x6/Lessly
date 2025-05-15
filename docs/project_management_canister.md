# Project Management Canister

## Purpose
The Project Management Canister handles the creation, updating, and management of website projects, including their metadata, version history, and settings.

## Key Features
- Project creation and deletion
- Metadata management
- Version history tracking
- Collaboration settings
- Project templates

## Data Structures

```motoko
// Types.mo
module {
  public type UserId = Principal;
  public type ProjectId = Text;
  public type VersionId = Text;
  
  public type Project = {
    id: ProjectId;
    name: Text;
    owner: UserId;
    description: Text;
    created_at: Int;
    updated_at: Int;
    published: Bool;
    url_slug: Text;
    collaborators: [UserId];
    current_version: VersionId;
    template_id: ?Text;
  };
  
  public type ProjectVersion = {
    id: VersionId;
    project_id: ProjectId;
    created_at: Int;
    created_by: UserId;
    description: Text;
  };
  
  public type ProjectError = {
    #NotFound;
    #Unauthorized;
    #AlreadyExists;
    #InvalidInput;
  };
}
```

## Main Actor (Simplified)

```motoko
// Main.mo
import Types "Types";
import HashMap "mo:base/HashMap";
import Principal "mo:base/Principal";
import Text "mo:base/Text";
import Array "mo:base/Array";
import Time "mo:base/Time";
import Result "mo:base/Result";
import Iter "mo:base/Iter";

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
  
  // Create a new project
  public shared(msg) func createProject(name: Text, description: Text, template_id: ?Text) : async Result.Result<Project, ProjectError> {
    let caller = msg.caller;
    let now = Time.now();
    
    // Generate a simple project ID (would use UUID in production)
    let projectId = name # "-" # Principal.toText(caller);
    let versionId = "v1-" # projectId;
    
    // Create URL slug from name (simplified)
    let url_slug = Text.map(name, func (c : Char) : Char {
      if (c == ' ') { '-' } else { c }
    });
    
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
  
  // Get project by ID
  public query func getProject(projectId: ProjectId) : async Result.Result<Project, ProjectError> {
    switch (projects.get(projectId)) {
      case (?project) { #ok(project) };
      case null { #err(#NotFound) };
    };
  };
  
  // Update project metadata
  public shared(msg) func updateProject(projectId: ProjectId, name: ?Text, description: ?Text) : async Result.Result<Project, ProjectError> {
    let caller = msg.caller;
    
    switch (projects.get(projectId)) {
      case (?project) {
        // Check if caller is owner or collaborator
        if (project.owner != caller and not Array.find<UserId>(project.collaborators, func(id) { id == caller })) {
          return #err(#Unauthorized);
        };
        
        let updatedProject : Project = {
          id = project.id;
          name = switch(name) { case (?n) { n }; case null { project.name } };
          owner = project.owner;
          description = switch(description) { case (?d) { d }; case null { project.description } };
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
  
  // Publish a project (make it public)
  public shared(msg) func publishProject(projectId: ProjectId, publish: Bool) : async Result.Result<Project, ProjectError> {
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
}
```

## API Interface

| Method | Type | Description |
|--------|------|-------------|
| `createProject` | Update | Creates a new website project |
| `getProject` | Query | Retrieves a project by ID |
| `updateProject` | Update | Updates project metadata |
| `publishProject` | Update | Toggles the published state of a project |

## Integration Points
- Interacts with User Management Canister for authorization
- Interacts with Website Storage Canister for asset management
- Interacts with Website Renderer Canister for publishing websites 