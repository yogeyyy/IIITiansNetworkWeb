import { SignedIn, SignedOut, SignInButton, UserButton } from "@clerk/nextjs";
import { currentUser } from "@clerk/nextjs/server";
import Image from "next/image";
import { Button } from "./ui/button";

export default async function UserInformation() {

    const user = await currentUser();

    return (
        <div>
            <SignedIn>
          <div className="flex">
            <Image
              className="rounded-full border-2"
              src={
                "https://jpcdn.it/img/small/45acb9046ef8003ea690688787ef6640.png"
              }
              alt="logo"
              width={80}
              height={80}
            />
            {/* <Image
              className="rounded-full relative -left-3 border-2"
              //   src={
              //     "https://jpcdn.it/img/small/a335ebc1607895562213214bc57bd756.png"
              //   }
              src={"/dp.png"}
              alt="logo"
              width={80}
              height={80}
            /> */}
            <UserButton
              appearance={{
                elements: {
                  rootBox:
                    "w-20 h-20 rounded-full relative -left-3 border-2 border-white shadow-md hover:shadow-lg transition-shadow",
                  avatarBox: "w-20 h-20",
                },
              }}
            />
          </div>
          <div className="flex flex-col items-center">
            <h2 className="text-lg font-bold text-[#110C09] tracking-tight">
              Yogit Nainani
            </h2>
            <p className="text-sm text-[#585C5F] font-medium">@yogitnainani</p>
          </div>
        </SignedIn>
        <SignedOut>
          <Button asChild>
            <SignInButton />
          </Button>
        </SignedOut>
        </div>
    );
}