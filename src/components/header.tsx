import { Navbar, NavbarContent, NavbarItem } from "@nextui-org/navbar";
import ThemeSwitcher from "@/components/theme-switcher";

export default function Header() {
  return (
    <Navbar className="mb-6" isBlurred isBordered>
      <NavbarContent justify="end">
        <NavbarItem>
          <ThemeSwitcher />
        </NavbarItem>
      </NavbarContent>
    </Navbar>
  );
}
