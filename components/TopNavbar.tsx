import { SignedIn, SignedOut, SignInButton, UserButton } from "@clerk/nextjs"
import Image from "next/image"
import Link from "next/link"
import { Button } from "./ui/button"

const TopNavbar = () => {
    return (
        <nav className="flex justify-center w-full h-24">
            <div className="flex items-center justify-between w-3/4 py-6">
                {/* left brand */}
                <div className="flex justify-start items-center gap-2 w-1/3">
                    <Image src="/brand.png" alt="logo" width={40} height={40} className="rounded-full" />
                    <h1 className="text-xl font-bold text-[#110C09] tracking-tight">iiitiansnetwork</h1>
                </div>

                {/* nav links */}
                <div className="flex justify-center gap-10 w-1/3">
                    <Link href={"/"}><p className="font-bold text-[#110C09] text-md">About Us</p></Link>
                    <Link href={"/recruitments"}><p className="font-bold text-[#110C09] text-md">Recruitments</p></Link>
                    <Link href={"/recruitments"}><p className="font-bold text-[#110C09] text-md">Explore</p></Link>
                </div>

                {/* profile icon */}
                <div className="flex justify-end w-1/3">
                    <SignedIn>
                        <UserButton
                            appearance={{
                                elements: {
                                    rootBox:
                                        "w-10 h-10 rounded-full shadow-md hover:shadow-lg transition-shadow",
                                    avatarBox: "w-10 h-10",
                                },
                            }}
                        />
                    </SignedIn>
                    <SignedOut>
                        <Button variant={"outline"} className="w-48 rounded-full text-olivegreen border-olivegreen hover:text-olivegreen hover:bg-mossgreen" asChild>
                            <SignInButton />
                        </Button>
                    </SignedOut>
                </div>
            </div>
        </nav>
    )
}

export default TopNavbar