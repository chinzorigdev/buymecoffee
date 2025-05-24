import React from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { Text } from "@/components/ui";
import { cn } from "@/lib/utils";

interface TestimonialItem {
  name: string;
  role?: string;
  avatar?: string;
  content: string;
  rating?: number;
}

interface TestimonialsProps {
  testimonials: TestimonialItem[];
  className?: string;
  variant?: "default" | "compact" | "featured";
}

const Testimonials: React.FC<TestimonialsProps> = ({
  testimonials,
  className,
  variant = "default",
}) => {
  const renderStars = (rating: number = 5) => (
    <div className="flex items-center gap-1 mb-3">
      {[...Array(5)].map((_, index) => (
        <svg
          key={index}
          className={cn(
            "h-4 w-4",
            index < rating
              ? "fill-yellow-400 text-yellow-400"
              : "fill-gray-200 text-gray-200"
          )}
          viewBox="0 0 24 24"
        >
          <path d="M12 17.27L18.18 21L16.54 13.97L22 9.24L14.81 8.63L12 2L9.19 8.63L2 9.24L7.46 13.97L5.82 21L12 17.27Z" />
        </svg>
      ))}
    </div>
  );

  if (variant === "compact") {
    return (
      <div className={cn("space-y-4 sm:space-y-6", className)}>
        {testimonials.map((testimonial, index) => (
          <div key={index} className="flex items-start gap-4">
            <Avatar className="h-10 w-10 sm:h-12 sm:w-12">
              <AvatarImage src={testimonial.avatar} alt={testimonial.name} />
              <AvatarFallback>{testimonial.name.charAt(0)}</AvatarFallback>
            </Avatar>
            <div className="flex-1">
              {" "}
              <Text variant="small" className="italic mb-2">
                &ldquo;{testimonial.content}&rdquo;
              </Text>
              <Text variant="caption" weight="medium">
                {testimonial.name}
                {testimonial.role && (
                  <span className="text-muted-foreground">
                    {" "}
                    · {testimonial.role}
                  </span>
                )}
              </Text>
            </div>
          </div>
        ))}
      </div>
    );
  }

  if (variant === "featured") {
    return (
      <div
        className={cn(
          "grid grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-8",
          className
        )}
      >
        {testimonials.map((testimonial, index) => (
          <Card
            key={index}
            className="border-2 border-yellow-100 hover:border-yellow-200 transition-colors"
          >
            <CardContent className="p-6 sm:p-8">
              {renderStars(testimonial.rating)}{" "}
              <Text className="italic mb-6">
                &ldquo;{testimonial.content}&rdquo;
              </Text>
              <div className="flex items-center gap-4">
                <Avatar className="h-12 w-12">
                  <AvatarImage
                    src={testimonial.avatar}
                    alt={testimonial.name}
                  />
                  <AvatarFallback>{testimonial.name.charAt(0)}</AvatarFallback>
                </Avatar>
                <div>
                  <Text variant="small" weight="semibold">
                    {testimonial.name}
                  </Text>
                  {testimonial.role && (
                    <Text variant="caption" textColor="muted">
                      {testimonial.role}
                    </Text>
                  )}
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    );
  }

  return (
    <div
      className={cn(
        "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6",
        className
      )}
    >
      {testimonials.map((testimonial, index) => (
        <Card key={index} className="hover:shadow-md transition-shadow">
          <CardContent className="p-6">
            {renderStars(testimonial.rating)}{" "}
            <Text variant="small" className="italic mb-4">
              &ldquo;{testimonial.content}&rdquo;
            </Text>
            <div className="flex items-center gap-3">
              <Avatar>
                <AvatarImage src={testimonial.avatar} alt={testimonial.name} />
                <AvatarFallback>{testimonial.name.charAt(0)}</AvatarFallback>
              </Avatar>
              <div>
                <Text variant="small" weight="medium">
                  {testimonial.name}
                </Text>
                {testimonial.role && (
                  <Text variant="caption" textColor="muted">
                    {testimonial.role}
                  </Text>
                )}
              </div>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
};

export default Testimonials;
