import { LogLevel,ProtocolMode } from "@azure/msal-browser";
export const msalConfig = {
    auth: {
        clientId: "b56e4bf8-aa54-4691-86c5-d2c39aabe8e8",
        authority: "https://login.microsoftonline.com/36da45f1-dd2c-4d1f-af13-5abe46b99921/saml2",
        knownAuthorities: [],
        cloudDiscoveryMetadata: "",
        redirectUri: "https://taxalertswizarddev.azurewebsites.net/",
        postLogoutRedirectUri: "https://login.microsoftonline.com/36da45f1-dd2c-4d1f-af13-5abe46b99921/saml2",
        navigateToLoginRequestUrl: true,
        // clientCapabilities: ["CP1"],
    },
    cache: {
        cacheLocation: "sessionStorage",
        temporaryCacheLocation: "sessionStorage",
        storeAuthStateInCookie: false,
        secureCookies: false,
        claimsBasedCachingEnabled: true,
    },
    system: {
        loggerOptions: {
            loggerCallback: (
                level: LogLevel,
                message: string,
                containsPii: boolean
            ): void => {
                if (containsPii) {
                    return;
                }
                switch (level) {
                    case LogLevel.Error:
                        console.error(message);
                        return;
                    case LogLevel.Info:
                        console.info(message);
                        return;
                    case LogLevel.Verbose:
                        console.debug(message);
                        return;
                    case LogLevel.Warning:
                        console.warn(message);
                        return;
                }
            },
            piiLoggingEnabled: false,
        },
        windowHashTimeout: 60000,
        iframeHashTimeout: 6000,
        loadFrameTimeout: 0,
        asyncPopups: false,
    },
    telemetry: {
        application: {
            appName: "IN Tax Alerts Wizard PROD",
            appVersion: "1.0.0",
        },
    },
};


/**
 * Scopes you add here will be prompted for user consent during sign-in.
 * By default, MSAL.js will add OIDC scopes (openid, profile, email) to any login request.
 * For more information about OIDC scopes, visit: 
 * https://docs.microsoft.com/en-us/azure/active-directory/develop/v2-permissions-and-consent#openid-connect-scopes
 */
export const loginRequest = {
    scopes: ["User.Read"]
};

/**
 * Add here the scopes to request when obtaining an access token for MS Graph API. For more information, see:
 * https://github.com/AzureAD/microsoft-authentication-library-for-js/blob/dev/lib/msal-browser/docs/resources-and-scopes.md
 */
export const graphConfig = {
    graphMeEndpoint: "https://graph.microsoft.com/v1.0/me",
};