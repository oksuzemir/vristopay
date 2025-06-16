import React, { useEffect, useRef } from "react";
import styles from "./HeroSection.module.css";
import arrow from "../../assets/images/arrow.svg";
import DotGrid from "./../DotGrid/DotGrid";

const HeroSection: React.FC = () => {
  const bgRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const isMobile = window.matchMedia("(max-width: 767px)").matches;
    if (!isMobile) return;
    const handleScroll = () => {
      if (bgRef.current) {
        const offset = window.scrollY * 0.4;
        bgRef.current.style.transform = `translateY(${offset}px)`;
      }
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <section className={styles.heroSection}>
      <div
        className={styles.heroDots}
        style={{
          position: "absolute",
          inset: 0,
          width: "100%",
          height: "100%",
          pointerEvents: "auto",
          zIndex: 0,
        }}
      >
        <DotGrid />
      </div>

      <div className={styles.heroBg} ref={bgRef}>
        <img
          className={styles.heroImg}
          src={`${import.meta.env.BASE_URL}images/hero-bg.svg`}
          alt=""
        />
      </div>

      {/* ÇÖZÜM: container'ı inline-flex ve fit-content yapıyoruz! */}
      <div
        className="container"
       
      >
        <div className={styles.heroContext}>
          <h1>
            Bring your crypto,
            <br />
            to the real world
          </h1>
          <p>
            With VristoPay’s secure wallet and seamless debit card integration, you <br />
            can store, swap, stake, and spend your crypto effortlessly. Experience <br />
            the power of decentralized applications and take control of your <br />
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