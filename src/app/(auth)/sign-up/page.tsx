import { authIsNotRequired } from "@/lib/auth-utils";
import { SignUpForm } from "./sign-up";

export default async function SignInPage() {
  await authIsNotRequired();

  return <SignUpForm />;
}
