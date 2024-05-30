import { SignedIn, SignedOut, SignInButton, UserButton } from "@clerk/nextjs";
import {
  BellIcon,
  HeartIcon,
  HomeIcon,
  MessageCircleMoreIcon,
  SearchIcon,
  SettingsIcon,
  User,
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { Button } from "./ui/button";
import UserInformation from "./UserInformation";

export default function Navbar() {
  return (
    <div className="flex flex-col items-center">
        <UserInformation />

      {/* <div className="flex-1">
        <form className="flex items-center space-x-1 bg-[#7D6F64] bg-opacity-20 p-2 rounded-xl flex-1 mx-2 max-w-80">
          <SearchIcon className="h-4 text-[#7D6F64]" />
          <input    
            type="text"
            placeholder="Search"
            className="bg-transparent flex-1 outline-none text-[#7D6F64] placeholder-[#7D6F64]"
          />
        </form>
      </div> */}

      <div className="flex flex-col w-2/3 gap-2">
        <div className="rounded-xl bg-[#33251C] px-5 py-3">
          <Link href={"/"} className="flex gap-2 items-center">
            <HomeIcon strokeWidth={2.5} size={18} color="white" />
            <p className="font-bold text-white text-md">Home</p>
          </Link>
        </div>

        <div className="rounded-xl px-5 py-3">
          <Link href={"/"} className="flex gap-2 items-center">
            <BellIcon strokeWidth={2.5} size={18} color="black" />
            <p className="font-bold text-black text-md">Notifications</p>
          </Link>
        </div>

        <div className="rounded-xl px-5 py-3">
          <Link href={"/"} className="flex gap-2 items-center">
            <HeartIcon strokeWidth={2.5} size={18} color="black" />
            <p className="font-bold text-black text-md">Activity</p>
          </Link>
        </div>

        <div className="rounded-xl px-5 py-3">
          <Link href={"/"} className="flex gap-2 items-center">
            <MessageCircleMoreIcon strokeWidth={2.5} size={18} color="black" />
            <p className="font-bold text-black text-md">Messages</p>
          </Link>
        </div>

        <div className="rounded-xl px-5 py-3">
          <Link href={"/"} className="flex gap-2 items-center">
            <SettingsIcon strokeWidth={2.5} size={18} color="black" />
            <p className="font-bold text-black text-md">Settings</p>
          </Link>
        </div>
      </div>

      <div></div>
    </div>
  );
}
