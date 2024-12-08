import { auth } from "@/auth";
import {
  NavbarContent,
  NavbarItem,
  NavbarMenu,
  NavbarMenuItem,
} from "@nextui-org/navbar";
import { Link } from "@nextui-org/link";
import ThemeSwitcher from "@/components/theme-switcher";
import HeaderAuth from "@/components/header-auth";
import NavbarWrapper from "./navbar-wrapper";
import * as actions from "@/actions";
import { getCurrentRoute } from "@/utils";

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

export default async function Header() {
  const currentRoute = await getCurrentRoute();
  const session = await auth();
  return (
    <NavbarWrapper>
      <NavbarContent className="hidden sm:flex gap-4" justify="center">
        {menuItems
          .filter(({ isUserAuth }) => isUserAuth === !!session?.user)
          .map(({ name, href }, i) => (
            <NavbarMenuItem key={`${name}-${i}`}>
              <Link
                className="w-full"
                href={href}
                underline={currentRoute.pathname === href ? "always" : "hover"}
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
        {session?.user && (
          <NavbarItem className="hidden sm:flex">
            <HeaderAuth image={session?.user?.image} />
          </NavbarItem>
        )}
      </NavbarContent>
      <NavbarMenu>
        {menuItems
          .filter(({ isUserAuth }) => isUserAuth === !!session?.user)
          .map(({ name, href }, i) => (
            <NavbarMenuItem key={`${name}-${i}`}>
              <Link
                className="w-full"
                color="primary"
                href={href}
                size="lg"
                underline={currentRoute.pathname === href ? "always" : "hover"}
              >
                {name}
              </Link>
            </NavbarMenuItem>
          ))}
        {!!session?.user && (
          <NavbarMenuItem>
            <form action={actions.signOut}>
              <button
                className="text-danger hover:underline underline-offset-4"
                type="submit"
              >
                Sign Out
              </button>
            </form>
          </NavbarMenuItem>
        )}
      </NavbarMenu>
    </NavbarWrapper>
  );
}
