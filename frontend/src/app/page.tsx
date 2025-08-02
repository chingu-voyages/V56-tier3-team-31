import { SocketIo } from "@/components";
import LoginForm from "@/components/loginForm";
import { Button } from "@/components/ui/button";
import { MoveRight } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { Suspense } from "react";

export default function Home() {
  return (
    <main className="flex flex-col md:h-screen">
      <div className="bg-gray-50 py-6">
        <div className="container">
          <h1 className="text-3xl my-4">Surgery Status Board</h1>
          <h2 className="text-xl my-4">Your Peace of Mind, Our Priority</h2>
          <p className="mt-8 mb-4">
            We built the Surgery Status Board to ease the burden of uncertainty
            and allow you to focus on what truly matters: supporting your
            family. By providing clear, immediate information, we help reduce
            the stress and worry that often come with hospital waiting rooms.
            You can feel a sense of calm and confidence, knowing you&apos;re
            always connected to their progress.
          </p>
        </div>
      </div>

      <div className="relative mx-auto flex w-full max-w-[800px] flex-col space-y-2.5 p-4 lg:flex-row">
        <Image
          src="/eyecatch.jpg"
          alt=""
          width={320}
          height={480}
          className="rounded-lg rounded-tr-none rounded-br-none mx-auto m-4 max-w-[640px] hidden lg:block"
          aria-hidden
        />
        <div className="flex-1 rounded-lg rounded-tl-none rounded-bl-none bg-gray-50 px-6 pb-4 pt-8 lg:h-[480px] lg:my-4 lg:flex items-center">
          <div className="max-w-[400px] mx-auto flex-1">
            <Link href="/patient-status-display">
              <Button className="mt-4 w-full">
                Proceed as Guest
                <MoveRight className="ml-auto h-5 w-5 text-gray-50" />
              </Button>
            </Link>

            <div className="border-t border-gray-500 mt-12 mb-12 flex items-center justify-center">
              <p className="absolute bg-gray-50 p-2">or</p>
            </div>

            <Suspense>
              <LoginForm />
            </Suspense>
          </div>
        </div>
      </div>
      <SocketIo />
    </main>
  );
}
