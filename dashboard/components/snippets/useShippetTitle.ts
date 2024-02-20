"use client";

import { useState, useEffect } from "react";
import { usePathname } from "next/navigation";
import { getDoc, doc } from "firebase/firestore";
import { db } from "@/core/database/firebase";

export function useSnippetTitle() {
  const pathname = usePathname();
  const [title, setTitle] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (pathname) {
      fetchTitle();
    }
  }, [pathname]);

  const fetchTitle = async () => {
    let title = pathname?.split("/").pop();
    const docSnap = await getDoc(doc(db, "snippets", title as string));
    if (docSnap.exists()) {
      const snippet = docSnap.data();
      console.log("Fetched snippet:", snippet);
      setTitle(snippet?.name || null);
    }
    setIsLoading(false);
  };

  return { title, isLoading, fetchTitle };
}
