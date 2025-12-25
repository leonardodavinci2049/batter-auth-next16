import { authIsNotRequired } from "@/lib/auth-utils";
import { OtpCodeForm } from "./otp-code-form";

export default async function TwoFactorCodePage() {
  await authIsNotRequired();

  return <OtpCodeForm />;
}
