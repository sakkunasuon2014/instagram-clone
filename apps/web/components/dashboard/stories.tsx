import Image from "next/image";
import { Card } from "../ui/card";

interface Story {
  id: string;
  username: string;
  avatar: string;
}
const mockStories = [
  {
    id: "your_story",
    username: "Your Story",
    avatar:
      "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=60&h=60&fit=crop&crop=face",
  },
  {
    id: "1",
    username: "sarah_johnson",
    avatar:
      "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=60&h=60&fit=crop&auto=format",
  },
  {
    id: "2",
    username: "mike_rodriguez",
    avatar:
      "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=60&h=60&fit=crop&auto=format",
  },
  {
    id: "3",
    username: "emma_watson",
    avatar:
      "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=60&h=60&fit=crop&auto=format",
  },
  {
    id: "4",
    username: "alex_chen",
    avatar:
      "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=60&h=60&fit=crop&auto=format",
  },
  {
    id: "5",
    username: "lisa_parker",
    avatar:
      "https://images.unsplash.com/photo-1529626455594-4ff0802cfb7e?w=60&h=60&fit=crop&auto=format",
  },
];

export function Stories() {
  return (
    <Card className="p-4">
      <div className="flex space-x-4 overflow-auto scrollbar-hide pb-2">
        {mockStories.map((stroy) => (
          <div
            key={stroy.id}
            className="flex flex-col items-center space-y-1 flex-shrink-8"
          >
            <div className="relative">
              <div className="p-0.5 rounded-full bg-gradient-to-tr from-yellow-400 to-fuchsia-600 bg-gray-200">
                <Image
                  src={stroy.avatar}
                  alt={stroy.avatar}
                  width={64}
                  height={64}
                  className="w-16 h-16 rounded-full object-cover border-2 border-white"
                />
              </div>
            </div>
            <span
              className="text-xs text-center w-16 truncate"
              title={stroy.username}
            >
              {stroy.username}
            </span>
          </div>
        ))}
      </div>
    </Card>
  );
}
