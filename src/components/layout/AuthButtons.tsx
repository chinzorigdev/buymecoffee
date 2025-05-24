import React from "react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

interface AuthButtonsProps {
  className?: string;
  variant?: "desktop" | "mobile";
  onLoginClick?: () => void;
  onSignupClick?: () => void;
}

const AuthButtons: React.FC<AuthButtonsProps> = ({
  className,
  variant = "desktop",
  onLoginClick,
  onSignupClick,
}) => {
  const handleLogin = () => {
    onLoginClick?.();
    // Жинхэнэ апп-д navigation руу солих
    // router.push('/login');
  };

  const handleSignup = () => {
    onSignupClick?.();
    // Жинхэнэ апп-д navigation руу солих
    // router.push('/signup');
  };

  if (variant === "mobile") {
    return (
      <div className={cn("space-y-3", className)}>
        <Button
          variant="ghost"
          className="w-full justify-start text-base font-medium"
          onClick={handleLogin}
        >
          Нэвтрэх
        </Button>
        <Button
          className="w-full bg-yellow-400 hover:bg-yellow-500 text-gray-800 font-medium rounded-full"
          onClick={handleSignup}
        >
          Бүртгүүлэх
        </Button>
      </div>
    );
  }

  return (
    <div className={cn("flex items-center space-x-2", className)}>
      <Button
        variant="ghost"
        size="sm"
        className="text-sm font-medium"
        onClick={handleLogin}
      >
        Нэвтрэх
      </Button>
      <Button
        size="sm"
        className="bg-yellow-400 hover:bg-yellow-500 text-gray-800 font-medium rounded-full"
        onClick={handleSignup}
      >
        Бүртгүүлэх
      </Button>
    </div>
  );
};

export default AuthButtons;
