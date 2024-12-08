import { Button } from "@nextui-org/button";
import { Avatar } from "@nextui-org/avatar";
import { Popover, PopoverTrigger, PopoverContent } from "@nextui-org/popover";

import * as actions from "@/actions";

interface HeaderAuthProps {
  image?: string | null;
}

export default function HeaderAuth({ image }: HeaderAuthProps) {
  return (
    <Popover placement="left">
      <PopoverTrigger>
        <Avatar src={image || ""} />
      </PopoverTrigger>
      <PopoverContent>
        <div className="p-4">
          <form action={actions.signOut}>
            <Button type="submit">Sign Out</Button>
          </form>
        </div>
      </PopoverContent>
    </Popover>
  );
}
