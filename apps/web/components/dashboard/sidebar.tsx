"use client";
import Image from "next/image";
import { Card } from "../ui/card";
import { authClient } from "@/lib/auth/client";
import { ThemeToggle } from "../theme/theme-toogle";
import { Button } from "../ui/button";
import { Camera, LogOut, User } from "lucide-react";
import { useRouter } from "next/navigation";
import { getImageUrl } from "@/lib/image";
import { useState } from "react";
import AvatarUpload from "./avatar-upload";

interface SuggestedUser {
  id: string;
  username: string;
  avatar: string;
  followedBy: string;
}
const mockSuggestion: SuggestedUser[] = [
  {
    id: "101",
    username: "nature_explorer",
    avatar:
      "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=60&h=60&fit=crop&auto=format",
    followedBy: "sarah_johnson",
  },
  {
    id: "102",
    username: "tech_tips_daily",
    avatar:
      "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=60&h=60&fit=crop&auto=format",
    followedBy: "mike_rodriguez",
  },
  {
    id: "103",
    username: "foodie_adventures",
    avatar:
      "https://images.unsplash.com/photo-1531123897727-8f129e1688ce?w=60&h=60&fit=crop&auto=format",
    followedBy: "lisa_parker",
  },
  {
    id: "104",
    username: "fitness_journey",
    avatar:
      "https://images.unsplash.com/photo-1566492031773-4f4e44671857?w=60&h=60&fit=crop&auto=format",
    followedBy: "alex_chen",
  },
  {
    id: "105",
    username: "travel_photography",
    avatar:
      "https://images.unsplash.com/photo-1522075469751-3a6694fb2f61?w=60&h=60&fit=crop&auto=format",
    followedBy: "emma_watson",
  },
];

export default function Sidebar() {
  const router = useRouter();
  const { data: session } = authClient.useSession();
  const [showAvatarModal, setShowAvatarModal] = useState(false);

  const handleLogout = async () => {
    await authClient.signOut();
    router.push("/login");
  };

  const handleAvatarUpload = async (file: File): Promise<void> => {
    // TODO: Implement avatar upload logic
  };

  return (
    <div className="space-y-6">
      <Card className="p-4">
        <div className="flex items-center space-x-3 mb-4">
          <div className="relative">
            {session?.user.image ? (
              <Image
                src={getImageUrl(session?.user.image)}
                alt="Your Profile"
                width={60}
                height={60}
                className="w-14 h-14 rounded-full"
              />
            ) : (
              <div className="w-12 h-12 rounded-full bg-muted flex items-center justify-center">
                <User className="w-4 h-4 text-muted-foreground" />
              </div>
            )}
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setShowAvatarModal(true)}
              title="Change avatar"
              className="absolute -bottom-1 -right-1 w-6 h-6 bg-primary text-primary-foreground rounded-full p-1 hover:bg-primary/90"
            >
              <Camera className="w-3 h-3" />
            </Button>
          </div>
          <div className="flex-1 min-w-0">
            <div className="font-semibold truncate">{session?.user.email}</div>
            <div className="text-sm text-muted-foreground truncate">
              {session?.user.name}
            </div>
          </div>
          <div className="flex items-center gap-1 sm:gap-2 flex-shrink-0">
            <ThemeToggle />
            <Button
              variant="ghost"
              size="icon"
              className="text-muted-foreground"
              onClick={handleLogout}
              title="Sign Out"
            >
              <LogOut className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </Card>
      <Card className="p-4">
        <div className="flex items-center justify-between mb-4">
          <h3 className="font-semibold text-muted-foreground">
            Suggestion for you
          </h3>
        </div>
        <div className="space-y-3">
          {mockSuggestion.map((user) => (
            <div key={user.id} className="flex items-center space-x-3">
              <Image
                src={user.avatar}
                alt={user.username}
                className="w-8 h-8 rounded-full"
                width={40}
                height={40}
              />
              <div className="flex-1 min-w-0">
                <div className="font-semibold text-sm">{user.username}</div>
                {user.followedBy && (
                  <div className="text-xs text-muted-foreground">
                    Followed by {user.followedBy}
                  </div>
                )}
              </div>
              <Button
                variant="ghost"
                size="sm"
                className="text-primary hover:text-primary/90 text-xs"
              >
                Follow
              </Button>
            </div>
          ))}
        </div>
      </Card>
      <AvatarUpload
        open={showAvatarModal}
        onOpenChange={setShowAvatarModal}
        onSubmit={handleAvatarUpload}
        currentAvatar={session?.user.image}
      />
    </div>
  );
}
