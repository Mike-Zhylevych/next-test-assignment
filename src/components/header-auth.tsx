import { auth } from "@/auth";
import { Button } from "@nextui-org/button";
import { Avatar } from "@nextui-org/avatar";
import { Popover, PopoverTrigger, PopoverContent } from "@nextui-org/popover";
import * as actions from "@/actions";

export default async function HeaderAuth() {
  const session = await auth();
  if (!session) return null;
  return (
    <Popover placement="left">
      <PopoverTrigger>
        <Avatar src={session?.user?.image || ""} />
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
