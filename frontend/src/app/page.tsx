import LoginForm from "@/components/loginForm";
import { Button } from "@/components/ui/button";
import { MoveRight } from "lucide-react";
import Link from "next/link";
import { Suspense } from "react";

export default function Home() {
  return (
    <main className="flex flex-col md:h-screen">
      <h1 className="text-2xl">Surgery Status Board</h1>
      <h2>Your Peace of Mind, Our Priority</h2>
      <p>
        We built the Surgery Status Board to ease the burden of uncertainty and
        allow you to focus on what truly matters: supporting your family. By
        providing clear, immediate information, we help reduce the stress and
        worry that often come with hospital waiting rooms. You can feel a sense
        of calm and confidence, knowing you&apos;re always connected to their
        progress.
      </p>
      <div className="relative mx-auto flex w-full max-w-[400px] flex-col space-y-2.5 p-4">
        <div className="flex-1 rounded-lg bg-gray-50 px-6 pb-4 pt-8">
          <Link href="/patient-status-display">
            <Button className="mt-4 w-full">
              Proceed as Guest
              <MoveRight className="ml-auto h-5 w-5 text-gray-50" />
            </Button>
          </Link>

          <div className="border-t border-gray-500 mt-8 mb-8 flex items-center justify-center">
            <p className="absolute bg-gray-50 p-2">or</p>
          </div>

          <Suspense>
            <LoginForm />
          </Suspense>
        </div>
      </div>
    </main>
  );
}
