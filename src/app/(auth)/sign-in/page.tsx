import { authIsNotRequired } from "@/lib/auth-utils";
import { SignInForm } from "./sign-in";

export default async function SignInPage() {
  await authIsNotRequired();

  return <SignInForm />;
}
