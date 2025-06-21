import React, { useRef, useEffect, useState } from "react";
import styles from "./Careers.module.css";
import arrow from "../../assets/images/arrow.svg";

const Careers: React.FC = () => {
  const bgRef = useRef<HTMLDivElement>(null);
  const sectionRef = useRef<HTMLElement>(null);
  const [revealed, setRevealed] = useState(false);

  // Parallax background effect (only works after reveal)
  useEffect(() => {
    if (!revealed) return;
    const handleScroll = () => {
      if (bgRef.current) {
        const offset = window.scrollY * 0.17; // Parallax speed
        bgRef.current.style.transform = `translateY(${offset}px)`;
      }
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, [revealed]);

  // Reveal animation: also reveal immediately if already visible on first render
  const lastScrollY = useRef(typeof window !== "undefined" ? window.scrollY : 0);
  useEffect(() => {
    // Reveal immediately if visible at mount
    if (sectionRef.current) {
      const bounding = sectionRef.current.getBoundingClientRect();
      if (bounding.top < window.innerHeight && bounding.bottom > 0) {
        setRevealed(true);
      }
    }

    let revealedOnce = false;
    const observer = new window.IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !revealedOnce) {
          const bounding = entry.boundingClientRect;
          const fromTop = bounding.top < window.innerHeight && bounding.top > 0;
          const scrollDown = window.scrollY > lastScrollY.current;
          if (fromTop && scrollDown) {
            setRevealed(true);
            revealedOnce = true;
            if (sectionRef.current) observer.unobserve(sectionRef.current);
          }
        }
        lastScrollY.current = window.scrollY;
      },
      { threshold: 0.15 }
    );
    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => {
      if (sectionRef.current) observer.unobserve(sectionRef.current);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <section
      ref={sectionRef}
      className={`${styles.careers} ${revealed ? styles.revealed : ""}`}
    >
      <div className={styles.careersBg} ref={bgRef}>
        <img src={`${import.meta.env.BASE_URL}images/card-section-bg.svg`} alt="" />
      </div>
      <div className="container">
        <div className={styles.careersFirst}>
          <h2>Careers</h2>
          <p>Start Your Crypto Career Journey Today</p>
           <a href="#" className="main-button">
            All Careers
            <span className="arrow">
              <img src={arrow} alt="" />
            </span>
          </a>
        </div>
        <div className={styles.careersLast}>
          <div className={styles.careersItem}>
            <img
              src={`${import.meta.env.BASE_URL}images/apple.svg`}
              alt="apple"
            />
            <span>IOS Developer</span>
          </div>
          <div className={styles.careersItem}>
            <img
              src={`${import.meta.env.BASE_URL}images/android.svg`}
              alt="moonpay"
            />
            <span>Android Developer</span>
          </div>
          <div className={styles.careersItem}>
            <img
              src={`${import.meta.env.BASE_URL}images/admin.svg`}
              alt="moonpay"
            />
            <span>Administrative <br /> Assistant</span>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Careers;