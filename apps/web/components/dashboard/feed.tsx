"use client";
import Image from "next/image";
import { Card } from "../ui/card";
import { Button } from "../ui/button";
import { Heart, MessageCircle } from "lucide-react";

interface Post {
  id: string;
  user: {
    username: string;
    avatar: string;
  };
  image: string;
  caption: string;
  likes: number;
  comments: number;
  timestamp: string;
}

const mockPosts: Post[] = [
  {
    id: "1",
    user: {
      username: "sarah_johnson",
      avatar:
        "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=60&h=60&fit=crop&auto=format",
    },
    image:
      "https://images.unsplash.com/photo-1682687220742-aba13b6e50ba?w=600&auto=format",
    caption: "Sunset views from the hike today! 🌅 #nature #adventure",
    likes: 234,
    comments: 18,
    timestamp: "2 HOURS AGO",
  },
  {
    id: "2",
    user: {
      username: "mike_rodriguez",
      avatar:
        "https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?w=600&auto=format",
    },
    image:
      "https://images.unsplash.com/photo-1511920170033-f8396924c348?w=600&auto=format",
    caption: "Morning coffee vibes ☕️ #coffeetime #morningroutine",
    likes: 89,
    comments: 7,
    timestamp: "5 HOURS AGO",
  },
  {
    id: "3",
    user: {
      username: "emma_watson",
      avatar:
        "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=60&h=60&fit=crop&auto=format",
    },
    image:
      "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=600&auto=format", // New: Tropical beach
    caption: "Beach day with friends! 🏖️ #summer #beachlife",
    likes: 567,
    comments: 42,
    timestamp: "8 HOURS AGO",
  },
  {
    id: "4",
    user: {
      username: "alex_chen",
      avatar:
        "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=60&h=60&fit=crop&auto=format",
    },
    image:
      "https://images.unsplash.com/photo-1682685797769-481b48222adf?w=600&auto=format",
    caption: "Urban exploration 📸 #citylife #photography",
    likes: 145,
    comments: 12,
    timestamp: "12 HOURS AGO",
  },
  {
    id: "5",
    user: {
      username: "lisa_parker",
      avatar:
        "https://images.unsplash.com/photo-1529626455594-4ff0802cfb7e?w=60&h=60&fit=crop&auto=format",
    },
    image:
      "https://images.unsplash.com/photo-1682685796014-2f342188a635?w=600&auto=format",
    caption: "Weekend baking experiment 🍪 #baking #homemade",
    likes: 312,
    comments: 24,
    timestamp: "24 HOURS AGO",
  },
];
export default function Feed() {
  return (
    <div className="space-y-6">
      {" "}
      {mockPosts.map((post) => (
        <Card key={post.id} className="overflow-hidden">
          <div className="flex items-center justify-between p-4">
            <div className="flex items-center space-x-3">
              <Image
                src={post.user.avatar}
                alt={post.user.username}
                width={64}
                height={64}
                className="w-8 h-8 rounded-full"
              />
              <span className="font-semibold text-sm">
                {post.user.username}
              </span>
            </div>
          </div>
          <div className="aspect-square relative">
            <Image
              src={post.image}
              alt="Post"
              className="w-full h-full object-cover"
              width={600}
              height={600}
            />
          </div>

          <div className="p-4 space-y-3">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-4">
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => {}}
                  className="p-0"
                >
                  <Heart className="w-6 h-6 text-foreground" />
                </Button>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => {}}
                  className="p-0"
                >
                  <MessageCircle className="w-6 h-6 text-foreground" />
                </Button>
              </div>
            </div>
            <div className="text-sm font-semibold">{post.likes} likes</div>
            <div className="text-sm">
              <span className="font-semibold">{post.user.username} </span>
              {post.caption}
            </div>
            {post.comments > 0 && (
              <div className="text-sm text-muted-foreground">
                View all {post.comments} comments
              </div>
            )}
            <div className="text-xs text-muted-foreground uppercase">
              {post.timestamp}
            </div>
          </div>
        </Card>
      ))}
    </div>
  );
}
