import React from "react";
import { FiSearch } from "react-icons/fi";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

interface SearchInputProps {
  placeholder?: string;
  className?: string;
  variant?: "desktop" | "mobile" | "compact";
  onSearch?: (query: string) => void;
}

const SearchInput: React.FC<SearchInputProps> = ({
  placeholder = "Хайх...",
  className,
  variant = "desktop",
  onSearch,
}) => {
  const [query, setQuery] = React.useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSearch?.(query);
  };

  if (variant === "compact") {
    return (
      <Button variant="ghost" size="sm" className={cn("md:hidden", className)}>
        <FiSearch className="h-4 w-4" />
      </Button>
    );
  }

  const baseClasses = "relative";
  const variantClasses = {
    desktop: "hidden md:block",
    mobile: "w-full",
  };

  return (
    <form
      onSubmit={handleSubmit}
      className={cn(baseClasses, variantClasses[variant], className)}
    >
      <div className="relative">
        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
          <FiSearch className="h-4 w-4 text-muted-foreground" />
        </div>
        <Input
          type="text"
          placeholder={placeholder}
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          className={cn(
            "pl-10 pr-4 bg-muted border-0 focus:ring-2 focus:ring-yellow-400",
            variant === "desktop" ? "rounded-full w-48 lg:w-64" : "rounded-full"
          )}
        />
      </div>
    </form>
  );
};

export default SearchInput;
