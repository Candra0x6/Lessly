import Types "../../types/lib";
import HashMap "mo:base/HashMap";
import Principal "mo:base/Principal";
import Time "mo:base/Time";
import Result "mo:base/Result";
import Iter "mo:base/Iter";

/// UserManagement canister handles user authentication and subscription management
actor UserManagement {
  type User = Types.User;
  type UserId = Types.UserId;
  type AuthError = Types.AuthError;

  // Stable storage for users
  private stable var userEntries : [(UserId, User)] = [];
  private var users = HashMap.HashMap<UserId, User>(0, Principal.equal, Principal.hash);

  // System upgrade hooks for orthogonal persistence
  system func preupgrade() {
    userEntries := Iter.toArray(users.entries());
  };

  system func postupgrade() {
    users := HashMap.fromIter<UserId, User>(userEntries.vals(), 0, Principal.equal, Principal.hash);
    userEntries := [];
  };

  /// Create a new user
  /// Returns the new user record or an error message
  public shared (msg) func createUser(username : Text, email : Text) : async Result.Result<User, Text> {
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
          principal = caller;
        };

        users.put(caller, newUser);
        return #ok(newUser);
      };
    };
  };

  /// Get user profile - query function that doesn't modify state
  /// Returns the user profile or an auth error
  public query func getUser(userId : UserId) : async Result.Result<User, AuthError> {
    switch (users.get(userId)) {
      case (?user) {
        return #ok(user);
      };
      case null {
        return #err(#UserNotFound);
      };
    };
  };

  public shared (_msg) func getUserByPrincipal(principal : Principal) : async ?User {
    return users.get(principal);
  };

  /// Update user's subscription tier
  /// Returns the updated user record or an auth error
  public shared (msg) func updateSubscription(tier : Types.SubscriptionTier) : async Result.Result<User, AuthError> {
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
          principal = user.principal;
        };

        users.put(caller, updatedUser);
        return #ok(updatedUser);
      };
      case null {
        return #err(#UserNotFound);
      };
    };
  };
};
