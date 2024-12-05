"use client";

import { Button } from "@nextui-org/button";
import { Divider } from "@nextui-org/divider";

import { Github, Google } from "@/app/icons";
import * as actions from "@/actions";

export function OauthButtons() {
  return (
    <>
      <div className="flex items-center gap-4 py-2">
        <Divider className="flex-1" />
        <p className="shrink-0 text-tiny text-default-500">OR</p>
        <Divider className="flex-1" />
      </div>
      <div className="flex flex-col gap-2">
        <form action={actions.googleSignIn}>
          <Button
            type="submit"
            startContent={<Google />}
            variant="bordered"
            className="w-full"
          >
            Continue with Google
          </Button>
        </form>
        <form action={actions.githubSignIn}>
          <Button
            type="submit"
            startContent={<Github />}
            variant="bordered"
            className="w-full"
          >
            Continue with Github
          </Button>
        </form>
      </div>
    </>
  );
}
