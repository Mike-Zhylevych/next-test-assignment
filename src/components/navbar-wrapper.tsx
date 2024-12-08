"use client";

import { useState } from "react";
import { Navbar, NavbarContent, NavbarMenuToggle } from "@nextui-org/navbar";

interface NavbarProps {
  children: React.ReactNode;
}

export default function NavbarWrapper({ children }: NavbarProps) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  return (
    <Navbar
      isBlurred
      isBordered
      isMenuOpen={isMenuOpen}
      onMenuOpenChange={setIsMenuOpen}
    >
      <NavbarContent className="sm:hidden" justify="start">
        <NavbarMenuToggle
          aria-label={isMenuOpen ? "Close menu" : "Open menu"}
        />
      </NavbarContent>
      {children}
    </Navbar>
  );
}
