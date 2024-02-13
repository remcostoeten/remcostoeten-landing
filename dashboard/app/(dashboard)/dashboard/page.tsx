'use client';
import { auth } from "@/core/database/firebase";
import { useAuthState } from "react-firebase-hooks/auth";
import GetTimeOfTheDay from "@/core/utils/getTimeOfTheDay";
import DisplayProjectsShell from "@/components/layout/DisplayProjectsShell";

export default function Page() {
  const [user] = useAuthState(auth);
  const timeOfTheDay = GetTimeOfTheDay();
  return (
    <DisplayProjectsShell />
  );
}
