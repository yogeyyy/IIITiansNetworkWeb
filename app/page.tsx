import PostForm from "@/components/PostForm";
import Image from "next/image";

export default function Home() {
  return (
    <div className="flex flex-col items-center w-full pt-10">
      <section className="w-full">
        {/* Post form */}
        <PostForm />
      </section>

      <section>{/* Post feed */}</section>
    </div>
  );
}
