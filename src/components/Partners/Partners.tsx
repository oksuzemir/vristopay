import React, { useRef, useEffect, useState } from "react";
import styles from "./Partners.module.css";
import arrow from "../../assets/images/arrow.svg";

/**
 * Partners section - parallax arka plan efektli ve reveal animasyonlu.
 */
const Partners: React.FC = () => {
  const bgRef = useRef<HTMLDivElement>(null);
  const sectionRef = useRef<HTMLElement>(null);
  const [revealed, setRevealed] = useState(false);

  // Parallax BG effect
  useEffect(() => {
    const handleScroll = () => {
      if (bgRef.current) {
        const offset = window.scrollY * 0.18; // Parallax hızı
        bgRef.current.style.transform = `translateY(${offset}px)`;
      }
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Reveal on scroll
  useEffect(() => {
    const observer = new window.IntersectionObserver(
      ([entry]) => {
        setRevealed(entry.isIntersecting);
      },
      { threshold: 0.15 }
    );
    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => {
      if (sectionRef.current) observer.unobserve(sectionRef.current);
    };
  }, []);

  return (
    <section
      ref={sectionRef}
      className={`${styles.partners} ${revealed ? styles.revealed : ""}`}
    >
      <div className={styles.partnersBg} ref={bgRef}>
        <img src={`${import.meta.env.BASE_URL}images/partners-bg.svg`} alt="" />
      </div>
      <div className="container">
        <div className={styles.partnersText}>
          <h2>Partners & Contributors</h2>
          <p>
            By collaborating with forward-thinking innovators, industry leaders,
            and <br /> mission-aligned organizations, we build a trusted network
            that delivers real <br /> value to our users — and helps shape the
            decentralized future of finance.
          </p>
          <a href="#" className="main-button">
            Become a Partner
            <span className="arrow">
              <img src={arrow} alt="" />
            </span>
          </a>
        </div>
        <div className={styles.partnersGrid}>
          <div className={styles.partnerItem}>
            <img
              src={`${import.meta.env.BASE_URL}images/moonpay.svg`}
              alt="moonpay"
            />
          </div>
          <div className={styles.partnerItem}>
            <img
              src={`${import.meta.env.BASE_URL}images/moonpay.svg`}
              alt="moonpay"
            />
          </div>
          <div className={styles.partnerItem}>
            <img
              src={`${import.meta.env.BASE_URL}images/moonpay.svg`}
              alt="moonpay"
            />
          </div>
          <div className={styles.partnerItem}>
            <img
              src={`${import.meta.env.BASE_URL}images/moonpay.svg`}
              alt="moonpay"
            />
          </div>
        </div>
        <div className={styles.partnersContext}>
          Your Trusted Partner in the <span>Crypto Frontier</span>
        </div>
      </div>
    </section>
  );
};

export default Partners;