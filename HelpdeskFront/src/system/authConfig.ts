import { msalInstance } from "../main";

export const msalConfig = {
    auth: {
        clientId: "",
        authority: "https://login.microsoftonline.com/",
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
    scopes: ["api:///user_impersonation"]
};
