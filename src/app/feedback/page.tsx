"use client";
import Feedback from "@/components/feedback/Feedback";
import { MsalAuthenticationTemplate } from "@azure/msal-react";
import { InteractionType } from "@azure/msal-browser";
import { loginRequest } from "../../utils/authConfig";
import { AuthError } from "@/components/login/AuthError";
import { AuthLoading } from "@/components/login/AuthLoading";
import { useClient } from "@/utils/useClient";

export default function UploadTaxPage() {
  const authRequest = {
    ...loginRequest
  };
  const isClient = useClient(false);
  return (isClient?
    // <MsalAuthenticationTemplate
    //   interactionType={InteractionType.Redirect}
    //   authenticationRequest={authRequest}
    //   errorComponent={AuthError}
    //   loadingComponent={AuthLoading}
    // >
      <main>
        <Feedback />
      </main>
    // </MsalAuthenticationTemplate>
    :
    null
  );
}
