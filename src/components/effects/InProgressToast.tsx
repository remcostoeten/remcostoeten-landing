"use client";

// Import necessary hooks and components from React and Sonner
import { useEffect } from "react";
import { Toaster, toast } from "sonner";

import useToastPreference from "@/core/hooks/useToastPreference";

// Adjust the path as necessary
export default function InProgressToast() {
    const { isToastDismissed, dismissToast } = useToastPreference();

    useEffect(() => {
        const isDismissed = localStorage.getItem("toastDismissed");
        if (!isToastDismissed && !isDismissed) {
            toast("🐞 Site is in progress and may contain bugs.🐛", {
                duration: 7500,
                onDismiss: () => {
                    dismissToast();
                    localStorage.setItem("toastDismissed", "true");
                },
            });
        }
    }, [isToastDismissed, dismissToast]);

    return (
        <>
            <Toaster closeButton invert />
        </>
    );
}
