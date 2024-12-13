"use client";

import { Avatar } from "@nextui-org/avatar";

import {
  Dropdown,
  DropdownTrigger,
  DropdownMenu,
  DropdownItem,
} from "@nextui-org/dropdown";

import * as actions from "@/actions";

interface HeaderAuthProps {
  user: {
    image?: string | null;
    email?: string | null;
    name?: string | null;
  };
}

export default function HeaderAuth({ user }: HeaderAuthProps) {
  return (
    <Dropdown>
      <DropdownTrigger>
        <Avatar isBordered as="button" src={user.image || ""} />
      </DropdownTrigger>
      <DropdownMenu aria-label="Static Actions" disabledKeys={["profile"]}>
        <DropdownItem
          key="profile"
          isReadOnly
          className="h-14 gap-2 opacity-100"
          textValue="Profile"
        >
          <div>{user.name}</div>
          <div className="text-xs">{user.email}</div>
        </DropdownItem>
        <DropdownItem
          key="sign-out"
          className="text-danger"
          color="danger"
          onPress={async () => actions.signOut()}
        >
          Sign Out
        </DropdownItem>
      </DropdownMenu>
    </Dropdown>
  );
}
