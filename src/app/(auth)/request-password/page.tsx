import { authIsNotRequired } from "@/lib/auth-utils";
import { RequestPasswordForm } from "./request-password-form";

export default async function RequestPasswordPage() {
  await authIsNotRequired();

  return <RequestPasswordForm />;
}
