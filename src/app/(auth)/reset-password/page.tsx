import { Suspense } from "react";
import { authIsNotRequired } from "@/lib/auth-utils";
import { ResetPasswordForm } from "./reset-password-form";

export default async function ResetPasswordPage() {
  await authIsNotRequired();

  return (
    <Suspense fallback={<div>Loading...</div>}>
      <ResetPasswordForm />
    </Suspense>
  );
}
