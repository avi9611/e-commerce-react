import React, { useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';

const slides = [
  {
    url: "https://images.unsplash.com/photo-1483985988355-763728e1935b?w=1920&h=600&fit=crop",
    title: "Spring Collection",
    subtitle: "Discover the latest trends"
  },
  {
    url: "https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=1920&h=600&fit=crop",
    title: "Shop Electronics",
    subtitle: "Latest gadgets and accessories"
  },
  {
    url: "https://images.unsplash.com/photo-1540959733332-eab4deabeeaf?w=1920&h=600&fit=crop",
    title: "Summer Sale",
    subtitle: "Up to 50% off on selected items"
  }
];

export function ImageSlider() {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentIndex((current) => (current + 1) % slides.length);
    }, 5000);
    return () => clearInterval(timer);
  }, []);

  const goToSlide = (index: number) => {
    setCurrentIndex(index);
  };

  const goToPrevious = () => {
    setCurrentIndex((current) => (current === 0 ? slides.length - 1 : current - 1));
  };

  const goToNext = () => {
    setCurrentIndex((current) => (current + 1) % slides.length);
  };

  return (
    <div className="relative h-[400px] w-full overflow-hidden">
      <div
        className="absolute w-full h-full transition-transform duration-500 ease-out"
        style={{ transform: `translateX(-${currentIndex * 100}%)` }}
      >
        {slides.map((slide, index) => (
          <div
            key={index}
            className="absolute w-full h-full"
            style={{ left: `${index * 100}%` }}
          >
            <div className="relative w-full h-full">
              <img
                src={slide.url}
                alt={slide.title}
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-black bg-opacity-30 flex flex-col items-center justify-center text-white">
                <h2 className="text-4xl font-bold mb-2">{slide.title}</h2>
                <p className="text-xl">{slide.subtitle}</p>
              </div>
            </div>
          </div>
        ))}
      </div>

      <button
        onClick={goToPrevious}
        className="absolute left-4 top-1/2 -translate-y-1/2 bg-white bg-opacity-50 p-2 rounded-full hover:bg-opacity-75 transition-all"
      >
        <ChevronLeft size={24} />
      </button>
      <button
        onClick={goToNext}
        className="absolute right-4 top-1/2 -translate-y-1/2 bg-white bg-opacity-50 p-2 rounded-full hover:bg-opacity-75 transition-all"
      >
        <ChevronRight size={24} />
      </button>

      <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2">
        {slides.map((_, index) => (
          <button
            key={index}
            onClick={() => goToSlide(index)}
            className={`w-3 h-3 rounded-full transition-all ${
              index === currentIndex ? 'bg-white' : 'bg-white bg-opacity-50'
            }`}
          />
        ))}
      </div>
    </div>
  );
}