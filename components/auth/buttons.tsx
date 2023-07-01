"use client";

import { useSession, signIn, signOut } from "next-auth/react";
import Image from "next/image";
import Link from "next/link";

export function SignInButton({ children }: { children: React.ReactNode }) {
  const { data: session, status } = useSession();
  console.log(session, status);

  if (status === "loading") {
    return <>...</>;
  }

  if (status === "authenticated") {
    return (
      <Link href={`/`}>
        <Image
          src={session.user?.image ?? "/images/avatar.png"}
          width={32}
          height={32}
          alt="Your Name"
        />
      </Link>
    );
  }

  return <button onClick={() => signIn()}>{children}</button>;
}

export function SignOutButton({ children }: { children: React.ReactNode }) {
  return <button onClick={() => signOut()}>{children}</button>;
}
