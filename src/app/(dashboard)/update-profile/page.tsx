import { redirect } from "next/navigation";
import { updateProfile } from "@/app/actions/user";

import { authIsRequired } from "@/lib/auth-utils";
//import { UpdateProfile } from "./components/update-profile";
import { ChangePasswordForm } from "./components/change-password";
//import { ToggleOtpForm } from "./components/toggle-otp-form";

export default async function UpdateProfilePage() {
  await authIsRequired();
  const user = await updateProfile();

  if (!user) redirect("/sign-in");

  return (
    <div className="w-full p-6 shadow-lg mx-auto max-w-7xl min-h-dvh rounded-2xl h-full flex gap-6 justify-center items-start">
{/*       <UpdateProfile
        email={user.email}
        name={user.name ?? ""}
        image={user.image ?? ""}
      /> */}
      <ChangePasswordForm />

      {/* <ToggleOtpForm twoFactorEnabled={user.twoFactorEnabled} /> */}
    </div>
  );
}
