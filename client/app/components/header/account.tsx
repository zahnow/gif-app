"use client";

import { Avatar, AvatarGroup, Menu, Portal } from "@chakra-ui/react";
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
            <AvatarGroup>
              <Avatar.Root>
                <Avatar.Fallback name={session.data?.user.name} />
                <Avatar.Image />
              </Avatar.Root>
            </AvatarGroup>
          </Menu.Trigger>
          <Portal>
            <Menu.Positioner>
              <Menu.Content>
                <Menu.Item
                  value="profile"
                  onClick={() => router.push("/profile")}
                >
                  Profile
                </Menu.Item>
                <Menu.Item
                  value="settings"
                  onClick={() => router.push("/settings")}
                >
                  Settings
                </Menu.Item>
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
