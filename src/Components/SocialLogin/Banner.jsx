import React, { useRef, useState } from "react";
import Slider from "react-slick";
import { motion } from "framer-motion";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

const slides = [
  {
    title: "EduManagement",
    subtitle: "Streamline Your Course Management",
    description: "Advanced tools for educators to manage courses, track progress, and enhance learning outcomes",
    image: "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?auto=format&fit=crop&w=1471&q=80",
    buttonText: "Explore Features",
    color: "from-blue-900/80 to-blue-700/60"
  },
  {
    title: "Organize Courses Easily",
    subtitle: "Manage classes, schedules, and resources in one place",
    description: "Intuitive dashboard to organize your educational content and streamline administrative tasks",
    image: "https://images.unsplash.com/photo-1522881193457-37ae97c905bf?auto=format&fit=crop&w=1470&q=80",
    buttonText: "View Demo",
    color: "from-purple-900/80 to-purple-700/60"
  },
  {
    title: "Enhanced Learning Experience",
    subtitle: "Tools for modern education",
    description: "Create engaging learning environments with our comprehensive suite of educational tools",
    image: "https://images.unsplash.com/photo-1523580494863-6f3031224c94?auto=format&fit=crop&w=1470&q=80",
    buttonText: "Learn More",
    color: "from-teal-900/80 to-teal-700/60"
  }
];

const Banner = () => {
  const sliderRef = useRef(null);
  const [currentSlide, setCurrentSlide] = useState(0);

  const settings = {
    dots: true,
    infinite: true,
    speed: 600,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 5000,
    pauseOnHover: true,
    fade: true,
    cssEase: "cubic-bezier(0.645, 0.045, 0.355, 1)",
    beforeChange: (_, next) => setCurrentSlide(next),
    appendDots: dots => (
      <div>
        <ul className="flex justify-center space-x-2 mt-6">{dots}</ul>
      </div>
    ),
    customPaging: i => (
      <div
        className={`w-2 h-2 rounded-full transition-all duration-300 ${
          i === currentSlide ? "bg-white scale-125" : "bg-white/50"
        }`}
      ></div>
    )
  };

  const textVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } }
  };

  const staggerContainer = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.15 } }
  };

  return (
    <div className="relative w-full overflow-hidden">
      <Slider ref={sliderRef} {...settings}>
        {slides.map((slide, index) => (
          <div key={index} className="relative">
            {/* Background */}
            <div
              className="w-full h-screen max-h-[800px] bg-cover bg-center bg-no-repeat relative"
              style={{ backgroundImage: `url(${slide.image})` }}
            >
              {/* Gradient Overlay */}
              <div className={`absolute inset-0 bg-gradient-to-r ${slide.color}`} />

              {/* Floating animated shapes */}
              <motion.div
                className="absolute top-0 left-0 w-full h-full pointer-events-none"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.8 }}
              >
                <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-white/5 rounded-full blur-xl"></div>
                <div className="absolute bottom-1/4 right-1/4 w-48 h-48 bg-blue-400/10 rounded-full blur-xl"></div>
              </motion.div>

              {/* Content */}
              <div className="absolute inset-0 flex flex-col justify-center items-center px-4 md:px-20 text-white text-center">
                <motion.div
                  className="max-w-4xl"
                  variants={staggerContainer}
                  initial="hidden"
                  animate="visible"
                >
                  <motion.div
                    className="inline-block mb-4 px-3 py-1 bg-white/10 backdrop-blur-sm rounded-full border border-white/20"
                    variants={textVariants}
                  >
                    <span className="text-xs font-semibold tracking-wider">
                      PREMIUM PLATFORM
                    </span>
                  </motion.div>

                  <motion.h1
                    className="text-4xl md:text-5xl lg:text-6xl font-bold mb-4 leading-tight"
                    variants={textVariants}
                  >
                    {slide.title}
                  </motion.h1>

                  <motion.h2
                    className="text-xl md:text-2xl font-medium mb-4 text-blue-100"
                    variants={textVariants}
                  >
                    {slide.subtitle}
                  </motion.h2>

                  <motion.p
                    className="text-lg mb-6 max-w-2xl mx-auto text-blue-100/90 leading-relaxed"
                    variants={textVariants}
                  >
                    {slide.description}
                  </motion.p>

                  <motion.div
                    className="flex flex-col sm:flex-row gap-3 justify-center"
                    variants={textVariants}
                  >
                    <motion.button
                      className="px-6 py-3 bg-white text-blue-900 hover:bg-blue-50 rounded-lg font-semibold shadow-lg hover:shadow-xl transition-all duration-300"
                      whileHover={{ scale: 1.03, y: -2 }}
                      whileTap={{ scale: 0.98 }}
                    >
                      {slide.buttonText}
                    </motion.button>
                    <motion.button
                      className="px-6 py-3 bg-transparent border border-white text-white hover:bg-white/10 rounded-lg font-semibold backdrop-blur-sm transition-all duration-300"
                      whileHover={{ scale: 1.03, y: -2 }}
                      whileTap={{ scale: 0.98 }}
                    >
                      Contact Sales
                    </motion.button>
                  </motion.div>
                </motion.div>
              </div>
            </div>
          </div>
        ))}
      </Slider>

      {/* Navigation Arrows */}
      <div className="absolute inset-y-0 left-0 flex items-center pl-4 md:pl-6 z-10">
        <motion.button
          onClick={() => sliderRef.current.slickPrev()}
          className="p-2 rounded-full bg-black/20 hover:bg-black/40 backdrop-blur-sm transition-all duration-300"
          aria-label="Previous slide"
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
        >
          <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
        </motion.button>
      </div>
      <div className="absolute inset-y-0 right-0 flex items-center pr-4 md:pr-6 z-10">
        <motion.button
          onClick={() => sliderRef.current.slickNext()}
          className="p-2 rounded-full bg-black/20 hover:bg-black/40 backdrop-blur-sm transition-all duration-300"
          aria-label="Next slide"
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
        >
          <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
          </svg>
        </motion.button>
      </div>
    </div>
  );
};

export default Banner;
