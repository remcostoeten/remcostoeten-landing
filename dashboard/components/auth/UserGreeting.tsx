"use client";
import { auth } from "@/core/database/firebase";
import { useAuthState } from "react-firebase-hooks/auth";
import GetTimeOfTheDay from "@/core/utils/getTimeOfTheDay";

export default function UserGreeting() {
  const [user] = useAuthState(auth);
  const timeOfTheDay = GetTimeOfTheDay();

  return (
    <div className="flex items-center justify-between space-y-2">
      <h2 className="text-3xl font-bold tracking-tight">
        Good {timeOfTheDay} {user?.displayName}{" "}
        <span aria-label="waving hand" className="wave" role="img">
          👋
        </span>
      </h2>
    </div>
  );
}
