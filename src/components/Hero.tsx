import React from "react";

const Hero: React.FC = () => {
  //   const handleStartPage = () => {
  //     alert("Starting your Buy Me Coffee page!");
  //     // You could replace this with navigation in a real app
  //     // router.push('/signup');
  //   };

  return (
    <div className="w-full bg-white">
      <div className="w-full max-w-6xl mx-auto flex box-border mb-24 px-4 sm:px-6 lg:px-8">
        <div className="w-full max-w-2xl flex items-center flex-col text-center mx-auto">
          {/* Rating stars */}
          <div className="flex items-center gap-4 mb-12 mt-16 animate-[fadeIn_0.6s_ease-in] opacity-100">
            <div className="flex">
              {[...Array(5)].map((_, index) => (
                <svg
                  key={index}
                  fill="none"
                  height="24"
                  viewBox="0 0 24 24"
                  width="24"
                  xmlns="http://www.w3.org/2000/svg"
                  className="md:h-4 md:w-4"
                >
                  <path
                    d="M12 17.27L18.18 21L16.54 13.97L22 9.24L14.81 8.63L12 2L9.19 8.63L2 9.24L7.46 13.97L5.82 21L12 17.27Z"
                    fill="#2E813A"
                  />
                </svg>
              ))}
            </div>
            <h4 className="text-gray-800 text-lg font-normal ml-2 md:text-base sm:text-sm">
              {/* Loved by 1,000,000+ creators */}
            </h4>
          </div>

          {/* Main heading */}
          <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold leading-tight tracking-tight text-gray-900 mb-6 animate-[fadeIn_0.6s_ease-in]">
            Өөрийн бүтээлч ажлаа санхүүжүүлээрэй
          </h1>

          {/* Subheading */}
          <p className="mb-6 text-xl font-normal leading-relaxed text-gray-800 max-w-lg mx-auto animate-[fadeIn_0.6s_ease-in_0.2s]">
            Дэмжлэгийг хүлээн ав. Энэ нь бодсоноос тань хялбар байх болно
          </p>

          {/* CTA Button */}
          <button
            className="rounded-full bg-yellow-400 hover:opacity-80 text-black font-bold text-xl py-4 px-12 mt-8 transition-all duration-200 animate-[fadeIn_0.6s_ease-in_0.3s]"
            // onClick={handleStartPage}
          >
            Миний хуудсыг бүтээ
          </button>

          {/* Note */}
          <h4 className="text-lg font-normal text-gray-800 mt-4 animate-[fadeIn_0.6s_ease-in_0.4s]">
            Нэг хоромоос ч бага хугацаа зарцуулна!
          </h4>
        </div>
      </div>
    </div>
  );
};

export default Hero;
