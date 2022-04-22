import { PublicClientApplication } from "@azure/msal-browser"
import { msalConfig } from "src/config/index"

export const msalInstance = new PublicClientApplication(msalConfig)
