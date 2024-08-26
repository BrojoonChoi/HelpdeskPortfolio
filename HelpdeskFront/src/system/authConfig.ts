import { msalInstance } from "../main";

export const msalConfig = {
    auth: {
        clientId: "10ed4288-4261-47bc-a5db-0011b1a41756",
        authority: "https://login.microsoftonline.com/fa1f8dba-bfb9-4711-aca9-ad924e518b88",
        redirectUri: "http://localhost:5173/dashboard",
    },
    cache: {
        cacheLocation: "sessionStorage", // 또는 "localStorage"
        storeAuthStateInCookie: false,
    }
};

export const loginRequest = {
    scopes: ["User.Read"]
};

export const tokenRequest = {
    scopes: ["api://10ed4288-4261-47bc-a5db-0011b1a41756/user_impersonation"]
};