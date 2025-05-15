import Types "Types";
import HashMap "mo:base/HashMap";
import Principal "mo:base/Principal";
import Time "mo:base/Time";
import Result "mo:base/Result";
import Error "mo:base/Error";

actor UserManagement {
  type User = Types.User;
  type UserId = Types.UserId;
  type Session = Types.Session;
  type AuthError = Types.AuthError;
  
  // Stable storage for users
  private stable var userEntries : [(UserId, User)] = [];
  private var users = HashMap.HashMap<UserId, User>(0, Principal.equal, Principal.hash);
  
  // Stable storage for sessions
  private stable var sessionEntries : [(UserId, Session)] = [];
  private var sessions = HashMap.HashMap<UserId, Session>(0, Principal.equal, Principal.hash);
  
  // System upgrade hooks for orthogonal persistence
  system func preupgrade() {
    userEntries := Iter.toArray(users.entries());
    sessionEntries := Iter.toArray(sessions.entries());
  };
  
  system func postupgrade() {
    users := HashMap.fromIter<UserId, User>(userEntries.vals(), 0, Principal.equal, Principal.hash);
    sessions := HashMap.fromIter<UserId, Session>(sessionEntries.vals(), 0, Principal.equal, Principal.hash);
    userEntries := [];
    sessionEntries := [];
  };
  
  // Create a new user
  public shared(msg) func createUser(username: Text, email: Text) : async Result.Result<User, Text> {
    let caller = msg.caller;
    
    // Check if user already exists
    switch (users.get(caller)) {
      case (?existing) {
        return #err("User already exists");
      };
      case null {
        let now = Time.now();
        let newUser : User = {
          id = caller;
          username = username;
          email = email;
          created_at = now;
          updated_at = now;
          subscription_tier = #free;
        };
        
        users.put(caller, newUser);
        return #ok(newUser);
      };
    };
  };
  
  // Get user profile
  public query func getUser(userId: UserId) : async Result.Result<User, AuthError> {
    switch (users.get(userId)) {
      case (?user) {
        return #ok(user);
      };
      case null {
        return #err(#UserNotFound);
      };
    };
  };
  
  // Authenticate user and create session
  public shared(msg) func login() : async Result.Result<Session, AuthError> {
    let caller = msg.caller;
    
    switch (users.get(caller)) {
      case (?user) {
        // Create a new session (24 hour expiry)
        let expiry = Time.now() + (24 * 60 * 60 * 1000000000);
        let session : Session = {
          user_id = caller;
          expires_at = expiry;
        };
        
        sessions.put(caller, session);
        return #ok(session);
      };
      case null {
        return #err(#UserNotFound);
      };
    };
  };
  
  // Check if a session is valid
  public query func validateSession(userId: UserId) : async Bool {
    switch (sessions.get(userId)) {
      case (?session) {
        return session.expires_at > Time.now();
      };
      case null {
        return false;
      };
    };
  };
  
  // Update user's subscription tier
  public shared(msg) func updateSubscription(tier: Types.SubscriptionTier) : async Result.Result<User, AuthError> {
    let caller = msg.caller;
    
    switch (users.get(caller)) {
      case (?user) {
        let updatedUser = {
          id = user.id;
          username = user.username;
          email = user.email;
          created_at = user.created_at;
          updated_at = Time.now();
          subscription_tier = tier;
        };
        
        users.put(caller, updatedUser);
        return #ok(updatedUser);
      };
      case null {
        return #err(#UserNotFound);
      };
    };
  };
}