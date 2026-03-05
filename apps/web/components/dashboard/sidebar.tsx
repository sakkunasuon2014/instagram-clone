"use client";
import Image from "next/image";
import { Card } from "../ui/card";
import { authClient } from "@/lib/auth/client";
import { ThemeToggle } from "../theme/theme-toogle";
import { Button } from "../ui/button";
import { LogOut } from "lucide-react";
import { useRouter } from "next/navigation";

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
  const handleLogout = async () => {
    await authClient.signOut();
    router.push("/login");
  };
  return (
    <div className="space-y-6">
      <Card className="p-4">
        <div className="flex items-center space-x-3 mb-4">
          <Image
            src="https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=60&h=60&fit=crop&crop=face"
            alt="Your Profile"
            width={60}
            height={60}
            className="w-14 h-14 rounded-full"
          />
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
    </div>
  );
}
