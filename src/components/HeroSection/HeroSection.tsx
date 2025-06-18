import React, { useEffect, useRef, useState } from "react";
import styles from "./HeroSection.module.css";
import arrow from "../../assets/images/arrow.svg";
import DotGrid from "./../DotGrid/DotGrid";

const HeroSection: React.FC = () => {
  const bgRef = useRef<HTMLDivElement>(null);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.matchMedia("(max-width: 767px)").matches);
    };
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  useEffect(() => {
    if (!isMobile) return;
    const handleScroll = () => {
      if (bgRef.current) {
        const offset = window.scrollY * 0.4;
        bgRef.current.style.transform = `translateY(${offset}px)`;
      }
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [isMobile]);

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

   
      

      <div className="container">
        <div className={styles.heroContext}>
          <h1>
            Bring your crypto,
            to the real world
          </h1>
          <p>
            With VristoPays secure wallet and seamless debit card integration, you
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