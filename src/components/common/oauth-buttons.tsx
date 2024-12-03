import { Button } from "@nextui-org/button";
import { Divider } from "@nextui-org/divider";

import { Github, Google } from "@/app/icons";

export function OauthButtons() {
  return (
    <>
      <div className="flex items-center gap-4 py-2">
        <Divider className="flex-1" />
        <p className="shrink-0 text-tiny text-default-500">OR</p>
        <Divider className="flex-1" />
      </div>
      <div className="flex flex-col gap-2">
        <Button startContent={<Google />} variant="bordered">
          Continue with Google
        </Button>
        <Button startContent={<Github />} variant="bordered">
          Continue with Github
        </Button>
      </div>
    </>
  );
}
