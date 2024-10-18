import React, { useState, useEffect } from 'react';
import styles from './TestimonialCarousel.module.scss';
import { FaChevronLeft, FaChevronRight, FaUser } from 'react-icons/fa';

interface Testimonial {
  text: string;
  name: string;
  company: string;
}

const testimonials: Testimonial[] = [
  {
    text: "Lorem ipsum dolor sit amet consectetur. Purus est consectetur consectetur tellus gravida arcu maecenas sagittis euismod. Rhoncus nulla donec eget posuere laoreet.",
    name: "David Johnson",
    company: "EFG Inc"
  },
  {
    text: "Lorem ipsum dolor sit amet consectetur. Purus est consectetur consectetur tellus gravida arcu maecenas sagittis euismod. Rhoncus nulla donec eget posuere laoreet.",
    name: "Sarah Williams",
    company: "XYZ Ltd"
  },
  {
    text: "Lorem ipsum dolor sit amet consectetur. Purus est consectetur consectetur tellus gravida arcu maecenas sagittis euismod. Rhoncus nulla donec eget posuere laoreet.",
    name: "James Brown",
    company: "ABC Corp"
  },
  {
    text: "Lorem ipsum dolor sit amet consectetur. Purus est consectetur consectetur tellus gravida arcu maecenas sagittis euismod. Rhoncus nulla donec eget posuere laoreet.",
    name: "Emily Clark",
    company: "DEF Co."
  },
  {
    text: "Lorem ipsum dolor sit amet consectetur. Purus est consectetur consectetur tellus gravida arcu maecenas sagittis euismod. Rhoncus nulla donec eget posuere laoreet.",
    name: "Michael Lee",
    company: "GHI Co."
  },
];

const TestimonialCarousel: React.FC = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [itemsPerPage, setItemsPerPage] = useState(3);

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 640) {
        setItemsPerPage(1);
      } else if (window.innerWidth < 1024) {
        setItemsPerPage(2);
      } else {
        setItemsPerPage(3);
      }
    };

    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const nextTestimonial = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % testimonials.length);
  };

  const prevTestimonial = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === 0 ? testimonials.length - 1 : prevIndex - 1
    );
  };

  const startIndex = currentIndex;
  const visibleTestimonials = [
    ...testimonials.slice(startIndex, startIndex + itemsPerPage),
    ...testimonials.slice(0, Math.max(0, (startIndex + itemsPerPage) % testimonials.length))
  ];

  return (
    <div className={styles.carouselContainer}>
      <div className={styles.carouselWrapper}>
        <button
          onClick={prevTestimonial}
          className={`${styles.navButton} ${styles.prevButton}`}
          aria-label="Previous testimonials"
        >
          <FaChevronLeft />
        </button>
        <div className={styles.testimonialWrapper}>
          <div className={styles.testimonialSlider}>
            {visibleTestimonials.map((testimonial, index) => (
              <div key={index} className={styles.testimonialCard}>
                <p className={styles.testimonialText}>{testimonial.text}</p>
                <div className={styles.authorInfo}>
                <div className={styles.authorAvatar}>
                    <FaUser />
                  </div>
                  <div className={styles.authorDetails}>
                    <h3 className={styles.authorName}>{testimonial.name}</h3>
                    <p className={styles.authorCompany}>{testimonial.company}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
        <button
          onClick={nextTestimonial}
          className={`${styles.navButton} ${styles.nextButton}`}
          aria-label="Next testimonials"
        >
          <FaChevronRight />
        </button>
      </div>
    </div>
  );
};

export default TestimonialCarousel;
