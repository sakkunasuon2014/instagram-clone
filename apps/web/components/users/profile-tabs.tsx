"use client";

import { Post } from "@repo/trpc/schemas";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../ui/tabs";
import PostsGrid from "./posts-grid";
import EmptyState from "./empty-state";
import { Camera } from "lucide-react";

interface ProfileTabsProps {
  userPosts: Post[];
  savedPosts?: Post[];
  isOwnProfile: boolean;
  name: string;
  onPostClick: (post: Post) => void;
}

export function ProfileTabs({
  userPosts,
  savedPosts,
  isOwnProfile,
  onPostClick,
}: ProfileTabsProps) {
  return (
    <Tabs defaultValue="posts">
      <TabsList className="w-full justify-center">
        <TabsTrigger value="posts" className="px-8">
          Posts
        </TabsTrigger>
        {isOwnProfile && (
          <TabsTrigger value="saved" className="px-8">
            Saved
          </TabsTrigger>
        )}
      </TabsList>

      <TabsContent value="posts" className="mt-6">
        {userPosts.length === 0 ? (
          <EmptyState
            icon={<Camera className="w-12 h-12" />}
            title="No Posts Yet"
            description="When this user creates posts, they'll appear here."
          />
        ) : (
          <PostsGrid posts={userPosts} onPostClick={onPostClick} />
        )}
      </TabsContent>

      {isOwnProfile && (
        <TabsContent value="saved" className="mt-6">
          {!savedPosts || savedPosts.length === 0 ? (
            <EmptyState
              icon={<Camera className="w-12 h-12" />}
              title="No Saved Posts"
              description="When you save posts, they'll appear here."
            />
          ) : (
            <PostsGrid posts={savedPosts} onPostClick={onPostClick} />
          )}
        </TabsContent>
      )}
    </Tabs>
  );
}
