"use client";

import { Button, Menu, Portal } from "@chakra-ui/react";
import { authClient } from "@/components/auth/auth-client";
import { useRouter } from "next/navigation";
import Link from "next/link";

export default function Account() {
  const session = authClient.useSession();
  const router = useRouter();

  function handleLogout() {
    authClient.signOut();
    router.push("/");
  }

  return (
    <>
      {session.data ? (
        <Menu.Root>
          <Menu.Trigger asChild>
            <Button variant="outline" colorPalette={"orange"}>
              {session.data.user.email || "Account"}
            </Button>
          </Menu.Trigger>
          <Portal>
            <Menu.Positioner>
              <Menu.Content>
                <Menu.Item value="logout" onClick={handleLogout}>
                  Logout
                </Menu.Item>
              </Menu.Content>
            </Menu.Positioner>
          </Portal>
        </Menu.Root>
      ) : (
        <Link href="/login">Login</Link>
      )}
    </>
  );
}
