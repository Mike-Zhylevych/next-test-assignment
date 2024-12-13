import HeaderAuth from "@/components/header-auth";
import NavbarWrapper from "./navbar-wrapper";

export default async function Header() {
  return (
    <NavbarWrapper>
      <HeaderAuth />
    </NavbarWrapper>
  );
}
