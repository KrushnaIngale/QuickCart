import { useState, useEffect } from "react";

const sliderData = [
  {
    id: 1,
    offer: "Limited Time Offer — 30% Off",
    title: "Experience Pure Sound — Your Perfect Headphones Awaits!",
    buttonText1: "Buy now",
    buttonText2: "Find more",
    imgSrc: "/assets/header_headphone_image.png",
  },
  {
    id: 2,
    offer: "Hurry up — only a few left!",
    title: "Next-Level Gaming Starts Here — Discover PlayStation 5 Today!",
    buttonText1: "Shop Now",
    buttonText2: "Explore Deals",
    imgSrc: "/assets/header_playstation_image.png",
  },
  {
    id: 3,
    offer: "Exclusive Deal — 40% Off",
    title: "Power Meets Elegance — Apple MacBook Pro is Here for You!",
    buttonText1: "Order Now",
    buttonText2: "Learn More",
    imgSrc: "/assets/header_macbook_image.png",
  },
];

const HeaderSlider = () => {
  const [currentSlide, setCurrentSlide] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % sliderData.length);
    }, 3500);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="overflow-hidden relative w-full mt-6">
      <div
        className="flex transition-transform duration-700 ease-in-out"
        style={{ transform: `translateX(-${currentSlide * 100}%)` }}
      >
        {sliderData.map((slide, index) => (
          <div
            key={slide.id}
            className="flex flex-col-reverse md:flex-row items-center justify-between bg-[#E6E9F2] py-8 md:px-14 px-5 rounded-xl min-w-full"
          >
            <div className="md:pl-8 mt-10 md:mt-0">
              <p className="md:text-base text-sm text-orange-600 pb-1 font-medium">{slide.offer}</p>
              <h1 className="max-w-lg md:text-[38px] md:leading-[46px] text-2xl font-semibold text-gray-900">
                {slide.title}
              </h1>
              <div className="flex items-center mt-5 md:mt-6 gap-3">
                <button className="md:px-10 px-7 md:py-3 py-2 bg-orange-600 rounded-full text-white font-medium hover:bg-orange-700 transition text-sm">
                  {slide.buttonText1}
                </button>
                <button className="group flex items-center gap-2 px-4 py-2.5 font-medium text-sm text-gray-700 hover:text-gray-900 transition">
                  {slide.buttonText2}
                  <span className="group-hover:translate-x-1 transition inline-block">→</span>
                </button>
              </div>
            </div>
            <div className="flex items-center flex-1 justify-center">
              <img
                src={slide.imgSrc}
                alt={`Slide ${index + 1}`}
                className="md:w-72 w-44 object-contain drop-shadow-xl"
              />
            </div>
          </div>
        ))}
      </div>

      {/* Dots */}
      <div className="flex items-center justify-center gap-2 mt-6">
        {sliderData.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentSlide(index)}
            className={`h-2 rounded-full transition-all duration-300 ${
              currentSlide === index ? "bg-orange-600 w-6" : "bg-gray-300 w-2"
            }`}
          />
        ))}
      </div>
    </div>
  );
};

export default HeaderSlider;
