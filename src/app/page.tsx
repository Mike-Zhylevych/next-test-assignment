import { Link } from "@nextui-org/link";

export default function Home() {
  return (
    <div className="flex items-center justify-center w-full">
      <div className="justify-center">
        <div>A-SAFE Digital test assignment, to start please</div>
        <div className="flex justify-center mt-2">
          <Link href="/sign-in">Sign In</Link>
          <div className="mx-2">OR</div>
          <Link href="/sign-up">Sign Up</Link>
        </div>
      </div>
    </div>
  );
}
