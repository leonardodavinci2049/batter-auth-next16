import { headers } from "next/headers";
import { redirect } from "next/navigation";
import { auth } from "./auth";

export const authSession = async () => {
  const session = await auth.api.getSession({ headers: await headers() });

  if (!session) {
    throw new Error("Unauthorized: No valid session found");
  }

  return session;
};

export const authIsRequired = async () => {
  const session = await auth.api.getSession({ headers: await headers() });

  if (!session) {
    redirect("/sign-in");
  }

  return session;
};

export const authIsNotRequired = async () => {
  try {
    const session = await auth.api.getSession({ headers: await headers() });

    if (session) {
      redirect("/");
    }
  } catch {
    // No session found, which is expected for public pages
    return;
  }
};
