"use client";

import Image from "next/image";
import { UserProfile } from "@repo/trpc/schemas";
import { Button } from "../ui/button";
import { User, Globe, Settings } from "lucide-react";
import { getImageUrl } from "@/lib/image";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";

interface ProfileHeaderProps {
  profile: UserProfile;
  onFollowToggle: () => void;
  onEditProfile: () => void;
  onOpenFollowers: () => void;
  onOpenFollowing: () => void;
  isOwnProfile: boolean;
  isFollowLoading: boolean;
}

export default function ProfileHeader({
  profile,
  onFollowToggle,
  onEditProfile,
  onOpenFollowers,
  onOpenFollowing,
  isOwnProfile,
  isFollowLoading,
}: ProfileHeaderProps) {
  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      <div className="flex items-start gap-8">
        <div className="flex-shrink-0">
          {profile.image ? (
            <Image
              src={getImageUrl(profile.image)}
              alt={profile.name}
              width={150}
              height={150}
              className="w-[150px] h-[150px] rounded-full object-cover"
            />
          ) : (
            <div className="w-[150px] h-[150px] rounded-full bg-muted flex items-center justify-center">
              <User className="w-16 h-16 text-muted-foreground" />
            </div>
          )}
        </div>

        <div className="flex-1 space-y-4">
          <div className="flex items-center gap-4">
            <h1 className="text-xl font-semibold">{profile.name}</h1>
            {isOwnProfile ? (
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="outline" size="sm">
                    <Settings className="w-4 h-4 mr-2" />
                    Settings
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  <DropdownMenuItem onClick={onEditProfile}>
                    Edit Profile
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            ) : (
              <Button
                variant={profile.isFollowing ? "outline" : "default"}
                size="sm"
                onClick={onFollowToggle}
                disabled={isFollowLoading}
              >
                {profile.isFollowing ? "Following" : "Follow"}
              </Button>
            )}
          </div>

          <div className="flex items-center gap-6">
            <span className="text-sm">
              <span className="font-semibold">{profile.postCount}</span> posts
            </span>
            <Button
              variant="ghost"
              className="p-0 h-auto text-sm"
              onClick={onOpenFollowers}
            >
              <span className="font-semibold">{profile.followerCount}</span>{" "}
              followers
            </Button>
            <Button
              variant="ghost"
              className="p-0 h-auto text-sm"
              onClick={onOpenFollowing}
            >
              <span className="font-semibold">{profile.followingCount}</span>{" "}
              following
            </Button>
          </div>

          {profile.bio && (
            <p className="text-sm whitespace-pre-wrap">{profile.bio}</p>
          )}

          {profile.website && (
            <a
              href={
                profile.website.startsWith("http")
                  ? profile.website
                  : `https://${profile.website}`
              }
              target="_blank"
              rel="noopener noreferrer"
              className="text-sm text-primary font-semibold flex items-center gap-1 hover:opacity-80"
            >
              <Globe className="w-4 h-4" />
              {profile.website}
            </a>
          )}
        </div>
      </div>
    </div>
  );
}
