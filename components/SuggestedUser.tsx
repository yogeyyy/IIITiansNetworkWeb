import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";

export default function SuggestedUser() {
    return (
        <div className="w-full flex flex-row justify-between">
            <div className="flex gap-2">
            <Avatar>
            <AvatarImage src="https://ew.com/thmb/bChViLEl6X2GTl1XMqjN6HJOyyg=/1500x0/filters:no_upscale():max_bytes(150000):strip_icc()/Gen-V-092023-1-06619bc37d1a40a6b75c871fdb12d222.jpg" />
            <AvatarFallback>
              {/* {user?.firstName?.charAt(0)}
              {user?.lastName?.charAt(0)} */}
            </AvatarFallback>
          </Avatar>
            </div>
        </div>
    );
}