import Principal "mo:base/Principal";
module {
    public type UserId = Principal;
    public type ProjectId = Text;
    public type VersionId = Text;

    public type Project = {
        id : ProjectId;
        name : Text;
        owner : UserId;
        description : Text;
        created_at : Int;
        updated_at : Int;
        published : Bool;
        url_slug : Text;
        collaborators : [UserId];
        current_version : VersionId;
        template_id : ?Text;
    };

    public type ProjectVersion = {
        id : VersionId;
        project_id : ProjectId;
        created_at : Int;
        created_by : UserId;
        description : Text;
    };

    public type ProjectError = {
        #NotFound;
        #Unauthorized;
        #AlreadyExists;
        #InvalidInput;
    };

    //  User management types
    public type User = {
        id : UserId;
        username : Text;
        email : Text;
        principal : Principal;
        created_at : Int;
        updated_at : Int;
        subscription_tier : SubscriptionTier;
    };

    public type SubscriptionTier = {
        #free;
        #premium;
        #business;
    };

    public type Session = {
        user_id : UserId;
        expires_at : Int;
    };

    public type AuthError = {
        #UserNotFound;
        #Unauthorized;
        #SessionExpired;
    };

    //   Website rendering types
    public type AssetId = Text;

    public type HttpRequest = {
        method : Text;
        url : Text;
        headers : [(Text, Text)];
        body : Blob;
    };

    public type HttpResponse = {
        status_code : Nat16;
        headers : [(Text, Text)];
        body : Blob;
        streaming_strategy : ?StreamingStrategy;
    };

    public type StreamingCallbackToken = {
        asset_id : AssetId;
        chunk_index : Nat;
        project_id : ProjectId;
    };

    public type StreamingStrategy = {
        #Callback : {
            callback : shared (StreamingCallbackToken) -> async (StreamingCallbackResponse);
            token : StreamingCallbackToken;
        };
    };

    public type StreamingCallbackResponse = {
        body : Blob;
        token : ?StreamingCallbackToken;
    };

    public type Domain = {
        name : Text;
        project_id : ProjectId;
        created_at : Int;
    };

    public type RenderError = {
        #ProjectNotFound;
        #AssetNotFound;
        #NotPublished;
    };

    public type AssetType = {
        #html;
        #css;
        #javascript;
        #image;
        #font;
        #other;
    };

    public type Asset = {
        id : AssetId;
        project_id : ProjectId;
        filename : Text;
        content_type : Text;
        size : Nat;
        created_at : Int;
        updated_at : Int;
        version_id : VersionId;
        asset_type : AssetType;
        path : Text;
    };

    public type Chunk = {
        asset_id : AssetId;
        index : Nat;
        data : Blob;
    };

    public type StoreAssetResult = {
        asset_id : AssetId;
        success : Bool;
    };

    public type AssetError = {
        #NotFound;
        #Unauthorized;
        #InvalidInput;
        #StorageFull;
    };
};
