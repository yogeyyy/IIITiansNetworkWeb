"use client";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { useUser } from "@clerk/nextjs";
import { Button } from "./ui/button";
import { ImageIcon, XIcon } from "lucide-react";
import { useRef, useState } from "react";
import { ImagetoBase64 } from "@/lib/utils";
import createPostAction from "@/actions/createPostAction";
import { Console } from "console";

export default function PostForm() {
  //fetching the logged in user information
  const { user } = useUser();

  //reference to the input fields
  const ref = useRef<HTMLFormElement>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  //states
  const [preview, setPreview] = useState<string | null>(null);

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
    <div className="w-full mb-2 rounded-xl">
      <form
        ref={ref}
        action={(formData) => {
          //Handle form submission
          handlePostAction(formData);
          //Toast
        }}
        className="w-full px-4 py-4 rounded-[1rem] backdrop-filter backdrop-blur-xl bg-[#B89C87] bg-opacity-15"
      >
        <div className="flex items-center space-x-2">
          <Avatar>
            <AvatarImage src={user?.imageUrl} />
            <AvatarFallback>
              {user?.firstName?.charAt(0)}
              {user?.lastName?.charAt(0)}
            </AvatarFallback>
          </Avatar>

          <input
            type="text"
            name="postInput"
            placeholder="Share an update"
            className="flex-1 rounded-full outline-none px-5 py-2"
          />

          <input
            ref={fileInputRef}
            type="file"
            name="postImage"
            accept="image/*"
            onChange={handleImageChange}
            hidden
          />
          <button type="submit" hidden>
            Post
          </button>
        </div>

        {/* Preview Conditional check */}
        {preview && (
          <div className="relative mt-3">
            <img src={preview} alt="preview" className="w-full object-cover" />
          </div>
        )}

        <div className="flex justify-end mt-2 gap-2">
          <Button type="button" onClick={() => fileInputRef.current?.click()}>
            <ImageIcon className="mr-2" size={16} color="currentColor" />{" "}
            {preview ? "Change" : "Add"} Image
          </Button>

          {/* Add remove preview button */}
          {preview && (
            <Button
              variant={"outline"}
              type="button"
              onClick={() => setPreview(null)}
            >
              <XIcon className="mr-2" size={16} color="currentColor" /> Remove
              Image
            </Button>
          )}
        </div>
      </form>
    </div>
  );
}

// src="https://github.com/shadcn.png"
