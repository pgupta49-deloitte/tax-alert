"use client"
import DownloadStatus from "@/components/download-status/DownloadStatus";
import { MsalAuthenticationTemplate } from "@azure/msal-react";
import { InteractionType } from "@azure/msal-browser";
import { loginRequest } from "../../utils/authConfig";
import { AuthError } from "@/components/login/AuthError";
import { AuthLoading } from "@/components/login/AuthLoading";
import { useClient } from "@/utils/useClient";

export default function HomePage() {
  const isClient = useClient(false);
  const authRequest = {
    ...loginRequest
  };
  return (isClient ?
    // <MsalAuthenticationTemplate
    //   interactionType={InteractionType.Redirect}
    //   authenticationRequest={authRequest}
    //   errorComponent={AuthError}
    //   loadingComponent={AuthLoading}
    // >
      <main>
        <DownloadStatus />
      </main>
    // </MsalAuthenticationTemplate>
    : null
  );
}
