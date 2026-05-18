"use client";

import Image from "next/image";
import { Post } from "@repo/trpc/schemas";
import { getImageUrl } from "@/lib/image";
import { Heart, MessageCircle } from "lucide-react";

interface PostsGridProps {
  posts: Post[];
  onPostClick: (post: Post) => void;
}

export default function PostsGrid({ posts, onPostClick }: PostsGridProps) {
  return (
    <div className="grid grid-cols-3 gap-1">
      {posts.map((post) => (
        <div
          key={post.id}
          className="aspect-square relative group cursor-pointer"
          onClick={() => onPostClick(post)}
        >
          <Image
            src={getImageUrl(post.image)}
            alt="Post"
            fill
            className="object-cover"
          />
          <div className="absolute inset-0 bg-black/0 group-hover:bg-black/40 transition-colors flex items-center justify-center">
            <div className="opacity-0 group-hover:opacity-100 transition-opacity flex items-center gap-6 text-white">
              <div className="flex items-center gap-1">
                <Heart className="w-6 h-6 fill-white" />
                <span className="font-semibold text-lg">{post.likes}</span>
              </div>
              <div className="flex items-center gap-1">
                <MessageCircle className="w-6 h-6 fill-white" />
                <span className="font-semibold text-lg">{post.comments}</span>
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
