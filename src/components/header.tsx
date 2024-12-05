import { Navbar, NavbarContent, NavbarItem } from "@nextui-org/navbar";
import ThemeSwitcher from "@/components/theme-switcher";
import HeaderAuth from "@/components/header-auth";

export default function Header() {
  return (
    <Navbar className="mb-6" isBlurred isBordered>
      <NavbarContent justify="end">
        <HeaderAuth />
        <NavbarItem>
          <ThemeSwitcher />
        </NavbarItem>
      </NavbarContent>
    </Navbar>
  );
}
