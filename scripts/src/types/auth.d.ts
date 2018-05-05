interface ICredentials {
    installed: IInstalled;
}

interface IInstalled {
    client_id: string;
    project_id: string;
    auth_uri: string;
    token_uri: string;
    auth_provider: string;
    client_secret: string;
    redirect_uris: string[];
}
