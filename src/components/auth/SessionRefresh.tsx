"use client";

import { useSession } from "next-auth/react";
import { useEffect, useRef } from "react";
import { useRouter } from "next/navigation";

interface SessionRefreshProps {
  children: React.ReactNode;
}

/**
 * SessionRefresh component automatically handles session refresh
 * and redirects users on session expiration
 */
export default function SessionRefresh({ children }: SessionRefreshProps) {
  const { data: session, status, update } = useSession();
  const router = useRouter();
  const lastRefreshRef = useRef<number>(0);
  const refreshIntervalRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    // Only refresh if we have a session and it's been more than 5 minutes
    const refreshSession = async () => {
      const now = Date.now();
      const timeSinceLastRefresh = now - lastRefreshRef.current;
      const fiveMinutes = 5 * 60 * 1000;

      if (session && timeSinceLastRefresh > fiveMinutes) {
        try {
          console.log("🔄 Session дахин сэргээж байна...");
          await update();
          lastRefreshRef.current = now;
          console.log("✅ Session амжилттай сэргээгдлээ");
        } catch (error) {
          console.error("❌ Session сэргээхэд алдаа:", error);
          // On session refresh failure, redirect to signin
          router.push(
            "/signin?error=SessionExpired&message=Нэвтрэх хугацаа дууссан тул дахин нэвтэрнэ үү"
          );
        }
      }
    };

    // Refresh session every 5 minutes if user is active
    if (status === "authenticated") {
      refreshIntervalRef.current = setInterval(refreshSession, 5 * 60 * 1000);

      // Also refresh on user activity
      const handleActivity = () => {
        refreshSession();
      };

      // Listen for user activity
      const events = [
        "mousedown",
        "mousemove",
        "keypress",
        "scroll",
        "touchstart",
      ];
      events.forEach((event) => {
        document.addEventListener(event, handleActivity, { passive: true });
      });

      return () => {
        if (refreshIntervalRef.current) {
          clearInterval(refreshIntervalRef.current);
        }
        events.forEach((event) => {
          document.removeEventListener(event, handleActivity);
        });
      };
    }
  }, [session, status, update, router]);

  // Handle session errors
  useEffect(() => {
    if (status === "unauthenticated") {
      // Check if this is an unexpected logout
      const wasAuthenticated = localStorage.getItem("was-authenticated");
      if (wasAuthenticated === "true") {
        localStorage.removeItem("was-authenticated");
        router.push(
          "/signin?error=SessionExpired&message=Нэвтрэх хугацаа дууссан"
        );
      }
    } else if (status === "authenticated") {
      localStorage.setItem("was-authenticated", "true");
    }
  }, [status, router]);

  return <>{children}</>;
}
