"use client";

import { Button } from "../ui/button";
import { Home } from "lucide-react";
import { useRouter } from "next/navigation";

export function ProfileNavigation() {
  const router = useRouter();

  return (
    <div className="sticky top-0 z-10 bg-background border-b">
      <div className="max-w-4xl mx-auto px-4 py-2 flex items-center">
        <Button variant="ghost" size="icon" onClick={() => router.push("/")}>
          <Home className="w-5 h-5" />
        </Button>
      </div>
    </div>
  );
}
