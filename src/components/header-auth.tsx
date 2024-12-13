"use client";

import { Avatar } from "@nextui-org/avatar";
import { useSession, signOut } from "next-auth/react";
import { usePathname } from "next/navigation";

import {
  Dropdown,
  DropdownTrigger,
  DropdownMenu,
  DropdownItem,
} from "@nextui-org/dropdown";
import {
  NavbarContent,
  NavbarItem,
  NavbarMenu,
  NavbarMenuItem,
} from "@nextui-org/navbar";
import ThemeSwitcher from "@/components/theme-switcher";
import { Link } from "@nextui-org/link";

// Object describes menu items for authenticated and unauthenticated users
const menuItems = [
  {
    name: "Home",
    href: "/",
    isUserAuth: false,
  },
  {
    name: "Sign In",
    href: "/sign-in",
    isUserAuth: false,
  },
  {
    name: "Sign Up",
    href: "/sign-up",
    isUserAuth: false,
  },
  {
    name: "Home",
    href: "/",
    isUserAuth: true,
  },
  {
    name: "Dashboard",
    href: "/dashboard",
    isUserAuth: true,
  },
  {
    name: "Transactions",
    href: "/transactions",
    isUserAuth: true,
  },
];

export default function HeaderAuth() {
  const session = useSession();
  const currentRoute = usePathname();

  return (
    <>
      <NavbarContent className="hidden sm:flex gap-4" justify="center">
        {menuItems
          .filter(({ isUserAuth }) => isUserAuth === !!session?.data?.user)
          .map(({ name, href }, i) => (
            <NavbarMenuItem key={`${name}-${i}`}>
              <Link
                className="w-full"
                href={href}
                underline={currentRoute === href ? "always" : "hover"}
              >
                {name}
              </Link>
            </NavbarMenuItem>
          ))}
      </NavbarContent>
      <NavbarContent justify="end">
        <NavbarItem>
          <ThemeSwitcher />
        </NavbarItem>
        {session?.data?.user && (
          <Dropdown>
            <DropdownTrigger>
              <Avatar
                isBordered
                as="button"
                src={session.data.user.image || ""}
              />
            </DropdownTrigger>
            <DropdownMenu
              aria-label="Static Actions"
              disabledKeys={["profile"]}
            >
              <DropdownItem
                key="profile"
                isReadOnly
                className="h-14 gap-2 opacity-100"
                textValue="Profile"
              >
                <div>{session.data.user.name}</div>
                <div className="text-xs">{session.data.user.email}</div>
              </DropdownItem>
              <DropdownItem
                key="sign-out"
                className="text-danger"
                color="danger"
                onPress={() => signOut()}
              >
                Sign Out
              </DropdownItem>
            </DropdownMenu>
          </Dropdown>
        )}
      </NavbarContent>
      <NavbarMenu>
        {menuItems
          .filter(({ isUserAuth }) => isUserAuth === !!session.data?.user)
          .map(({ name, href }, i) => (
            <NavbarMenuItem key={`${name}-${i}`}>
              <Link
                className="w-full"
                color="primary"
                href={href}
                size="lg"
                underline={currentRoute === href ? "always" : "hover"}
              >
                {name}
              </Link>
            </NavbarMenuItem>
          ))}
        {!!session.data?.user && (
          <NavbarMenuItem>
            <button
              className="text-danger hover:underline underline-offset-4"
              type="submit"
              onClick={() => signOut()}
            >
              Sign Out
            </button>
          </NavbarMenuItem>
        )}
      </NavbarMenu>
    </>
  );
}
