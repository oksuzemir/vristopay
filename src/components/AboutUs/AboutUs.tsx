import React, { useEffect, useRef, useState } from "react";
import Card from "../Card/Card";
import styles from "./AboutUs.module.css";
import UsersIcon from "../../assets/icons/UsersIcon";
import arrow from "../../assets/images/arrow.svg";
import DollarIcon from "../../assets/icons/DollarIcon";

const AboutUs: React.FC = () => {
  const bgRef = useRef<HTMLDivElement>(null);
  const sectionRef = useRef<HTMLElement>(null);
  const [revealed, setRevealed] = useState(false);

  // Parallax BG effect
  useEffect(() => {
    const handleScroll = () => {
      if (bgRef.current) {
        const offset = window.scrollY * 0.3; // Parallax hızı
        bgRef.current.style.transform = `translateY(${offset}px)`;
      }
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Reveal on scroll (Intersection Observer)
  useEffect(() => {
    const observer = new window.IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) setRevealed(true);
        else setRevealed(false);
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
      className={`${styles.aboutUs} ${revealed ? styles.revealed : ""}`}
    >
      <div className={styles.aboutBg} ref={bgRef}>
        <img src={`${import.meta.env.BASE_URL}images/about-bg.svg`} alt="" />
      </div>
      <div className="container">
        <div className={styles.aboutUsCards}>
          <Card
            icon={<UsersIcon className={styles.usersIcon} />}
            title="420M+ Global Crypto Users"
            description="More than 420 million people worldwide own cryptocurrency. Crypto is no longer niche – it’s mainstream."
          />
          <Card
            icon={<DollarIcon className={styles.usersIcon} />}
            title="$16 Trillion in Transactions"
            description="Over $16 trillion in crypto transactions processed in 2023.The crypto economy is booming with real, unstoppable momentum."
          />
          <Card
            icon={<UsersIcon className={styles.usersIcon} />}
            title="1 Billion+ Wallets"
            description="Over a billion active crypto wallets worldwide. More people are taking control of their digital assets than ever before."
          />
        </div>
        <div className={styles.aboutUsContent}>
          <h2>Redefine Your Crypto Game with</h2>
          <a href="#" className="main-button">
            About Us{" "}
            <span className="arrow">
              <img src={arrow} alt="" />
            </span>
          </a>
        </div>
      </div>
    </section>
  );
};

export default AboutUs;