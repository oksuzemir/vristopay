import React, { useEffect, useRef } from "react";
import styles from "./HeroSection.module.css";
import arrow from "../../assets/images/arrow.svg";

const HeroSection: React.FC = () => {
  const bgRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleScroll = () => {
      if (bgRef.current) {
        // Parallax efekti için scroll değerinin bir kısmını uygula (hız ayarı için 0.4 çarpanı kullandık)
        const offset = window.scrollY * 0.4;
        bgRef.current.style.transform = `translateY(${offset}px)`;
      }
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <section className={styles.heroSection}>
      <div className={styles.heroBg} ref={bgRef}>
        <img src={`${import.meta.env.BASE_URL}images/hero-bg.svg`} alt="" />
      </div>
      <div className="container">
        <div className={styles.heroContext}>
          <h1>
            Bring your crypto,
            <br />
            to the real word
          </h1>
          <p>
            With VristoPay’s secure wallet and seamless debit card integration, you
            can store, swap, stake, and spend your crypto effortlessly. Experience
            the power of decentralized applications and take control of your
            financial freedom — all in one place.
          </p>
          <a href="#" className="main-button">
            Join the Revolution Today <span className="arrow"><img src={arrow} alt="" /></span>
          </a>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;