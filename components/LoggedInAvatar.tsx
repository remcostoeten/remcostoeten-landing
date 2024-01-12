'use client';
import { useState, useEffect } from "react";
import Image from "next/image";
import { getAuth, onAuthStateChanged, User } from "firebase/auth";

export default function LoggedInAvatar() {
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    const auth = getAuth();
    const unsubscribe = onAuthStateChanged(auth, setUser);

    // It's important to unsubscribe when the component unmounts
    return () => unsubscribe();
  }, []);

  const isLoggedIn = user !== null;

  return (
    <>
      {!isLoggedIn ? (
        <Image
          src="/remco-avatar-compressed.webp"
          alt="Remco Stoeten"
          width={50}
          height={50}
          className={`z-20 rounded-full ${isLoggedIn ? "authenticated" : ""}`}
        />
      ) : user?.photoURL ? (
        <Image
          src={user?.photoURL}
          width={50}
          height={50}
          className={`z-20 rounded-full ${isLoggedIn ? "authenticated" : ""}`}
          alt="user profile avatar"
          referrerPolicy="no-referrer"
        />
      ) : (
        <div className="avatar">
          {user?.displayName?.[0]}
        </div>
      )}
    </>
  );
} '