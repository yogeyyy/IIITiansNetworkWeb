"use client";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { useUser } from "@clerk/nextjs";
import { Button } from "./ui/button";
import { ImageIcon, XIcon } from "lucide-react";
import { useRef, useState } from "react";
import { ImagetoBase64 } from "@/lib/utils";
import createPostAction from "@/actions/createPostAction";
import { Console, error } from "console";
import { toast } from "sonner";

export default function PostForm() {
  //fetching the logged in user information
  const { user } = useUser();

  //reference to the input fields
  const ref = useRef<HTMLFormElement | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  //states
  const [preview, setPreview] = useState<string | null>(null);
  const [addImage, setAddImage] = useState<boolean>(false);

  //handle image change
  const handleImageChange = async (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    if (!event.target.files?.length) {
      return;
    }

    const file = await ImagetoBase64(event.target.files[0] as File);

    if (file) {
      setPreview(file as string);
    }
  };

  //handle post action
  const handlePostAction = async (formData: FormData) => {
    const formDataCopy = formData;
    ref.current?.reset();

    const postContent = formDataCopy.get("postInput") as string;
    const postImage = preview as string;

    if (!postContent.trim()) {
      throw new Error("Post content is required");
    }

    const data = {
      postContent: postContent,
      postImage: postImage,
    };

    setPreview(null);

    try {
      await createPostAction(data);
    } catch (error) {
      console.log("Error Creating post:", error);
    }
  };

  return (
    <div className="w-full rounded-xl">
      <form
        ref={ref}
        onSubmit={(event) => {
          event.preventDefault();
          //Handle form submission
          const formData = new FormData(ref.current as HTMLFormElement);
          const promise = handlePostAction(formData);
          //Toast
          toast.promise(promise, {
            loading: "Posting...",
            success: "Posted!",
            error: "Failed to post",
          });
        }}
        className="w-full p-6 rounded-[1.5rem] backdrop-filter backdrop-blur-xl formBg bg-opacity-15"
      >
        <div className="flex items-center space-x-2 justify-between">
          <Avatar>
            <AvatarImage src={user?.imageUrl} />
            <AvatarFallback>
              {user?.firstName?.charAt(0)}
              {user?.lastName?.charAt(0)}
            </AvatarFallback>
          </Avatar>

          <input
            ref={fileInputRef}
            type="file"
            name="postImage"
            accept="image/*"
            onChange={handleImageChange}
            hidden
          />

          <input
            type="text"
            name="postInput"
            placeholder="Share an update"
            className="w-full flex-1 rounded-full outline-none px-5 py-2 placeholder-white placeholder-opacity-70 text-white bg-[white] bg-opacity-10 focus:bg-opacity-20 transition-colors duration-500 ease-in-out shadow-md shadow-[#7E6F64]"
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                e.preventDefault();
                // Optionally, you can also blur the input field to remove focus
                // e.currentTarget.blur();
              }
            }}
            autoComplete="off"
          />
        </div>

        {/* Preview Conditional check */}
        {preview && (
          <div className="relative mt-4">
            <img
              src={preview}
              alt="preview"
              className="w-full object-cover rounded-[1.5rem]"
            />
          </div>
        )}

        <div className="flex justify-between mt-4 gap-2">
          <div className="flex gap-2">
            <Button
              type="button"
              variant={"ghost"}
              onClick={() => fileInputRef.current?.click()}
              className={`text-white rounded-full hover:bg-white hover:bg-opacity-20 hover:text-white hover:shadow-md shadow-[#7E6F64] transition-colors duration-500 ease-in-out`}
            >
              <ImageIcon className="mr-2" size={16} color="currentColor" />{" "}
              {preview ? "Change" : "Add"} Image
            </Button>

            {/* Add remove preview button */}
            {preview && (
              <Button
                variant={"ghost"}
                type="button"
                onClick={() => setPreview(null)}
                className={`text-white rounded-full bg-transparent hover:bg-white hover:bg-opacity-20 hover:text-white hover:shadow-md shadow-[#7E6F64] transition duration-500 ease-in-out`}
              >
                <XIcon className="mr-2" size={16} color="currentColor" /> Remove
                Image
              </Button>
            )}
          </div>

          <div>
            <Button
              type="submit"
              className="rounded-full px-6 bg-[#47372F] bg-opacity-30 hover:bg-[#47372F] hover:bg-opacity-50 focus:bg-[#47372F] focus:bg-opacity-50 transition-colors duration-500 ease-in-out hover:shadow-md shadow-[#7E6F64]"
            >
              <p className="font-semibold">Post</p>
            </Button>
          </div>
        </div>
      </form>
    </div>
  );
}

// src="https://github.com/shadcn.png"
