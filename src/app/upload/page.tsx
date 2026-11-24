"use client";
import Upload from "@/components/upload/Upload";
import {MsalAuthenticationTemplate } from "@azure/msal-react";
import {InteractionType } from "@azure/msal-browser";
import { loginRequest } from "../../utils/authConfig";
import { AuthError } from "@/components/login/AuthError";
import { AuthLoading } from "@/components/login/AuthLoading";
import { useClient } from "@/utils/useClient";

export default function TaxAlertPage() {
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
      <Upload />
    // </MsalAuthenticationTemplate>
    :
    null
  );
}
