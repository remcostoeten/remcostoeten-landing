import { Icons } from "@/components/icons";
import LoginLinkAuth from "@/components/menu/LoginLinkAuth";
import { Badge } from "@/components/ui/badge";
import SocialBadge from "@/components/ui/social-badge";
import { contactInfo } from "@/core/config/personal-info";
import { auth } from "@/core/database/firebase";
import {
  useGithubSignIn,
  useGoogleSignIn,
} from "@/core/hooks/signin-providers";
import { Link } from "lucide-react";
import { useState } from "react";
import { useEffect } from "react";
import { useSignOut, useAuthState } from "react-firebase-hooks/auth";
import { toast } from "sonner";

export default function Footer() {
  const [isOpen, setIsOpen] = useState(false);
  const [isSignup, setIsSignup] = useState(false);
  const [signOut, loading, error] = useSignOut(auth);
  const [user] = useAuthState(auth);
  const [wasLoggedIn, setWasLoggedIn] = useState(false);

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if ((event.ctrlKey || event.metaKey) && event.key === "k") {
        event.preventDefault();
        if (!user) {
          setIsOpen((prevIsOpen) => !prevIsOpen);
        }
      }
    };

    window.addEventListener("keydown", handleKeyDown);

    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [user]);

  useEffect(() => {
    if (user) {
      setWasLoggedIn(true);
      if (isOpen) {
        setIsOpen(false);
        toast("Logged in successfully");
      }
    } else if (wasLoggedIn) {
      setWasLoggedIn(false);
      toast("Logged out successfully");
    }
  }, [user, isOpen, wasLoggedIn]);

  const [signInWithGithub, userGithub, loadingGithub, errorGithub] =
    useGithubSignIn();
  const [signInWithGoogle, userGoogle, loadingGoogle, errorGoogle] =
    useGoogleSignIn();

  const handleLogout = () => {
    signOut();
    toast("Logged out successfully");
  };

  return (
    <>
      <div className="flex justify-between items-center">
        <div className="flex flex-col gap-2">
        <SocialBadge link={contactInfo.email} external>
            <Icons.mail width={16} className="mr-2" />
            {contactInfo.email}
          </SocialBadge>
          <SocialBadge link={contactInfo.github} external>
            <Icons.github width={16} className="mr-2" />
            {contactInfo.handle}
          </SocialBadge>
          <SocialBadge link={contactInfo.linkedinhandle} external> <Icons.linkedin width={16} className="mr-4" />
            <span className="ml-2">{contactInfo.linkedinhandle}</span></SocialBadge>
          <div className="flex justify-end">
            <div className="flex flex-col gap-2">
              <p className=" flex flex-col-reverse items-end md:flex-row md:items-center justify-end">
                With
                <span className=" animate-pulse  px-2"> ❤️</span>
                by {contactInfo.fullName}
              </p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
