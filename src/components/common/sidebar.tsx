"use client";
import { useState } from "react";
import { Button } from "@nextui-org/button";
import { Link } from "@nextui-org/link";

export function SideBar() {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <aside className="h-full">
      <div
        className={`h-full p-8 bg-default-100 border-r border-divider overflow-hidden transition-width ${
          isOpen ? "w-64" : "w-0"
        }`}
      >
        <nav className=" flex flex-col">
          <Button
            isIconOnly
            color="default"
            variant="faded"
            aria-label="Take a photo"
            onClick={() => setIsOpen(!isOpen)}
          ></Button>
          <ul>
            <li>
              <Link href="/dashboard/transactions">Transactions</Link>
            </li>
            <li>
              <Link href="/dashboard">Dashboard</Link>
            </li>
          </ul>
        </nav>
      </div>
    </aside>
  );
}
