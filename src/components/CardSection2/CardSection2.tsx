import React, { useRef, useEffect, useState } from "react";
import styles from "./CardSection2.module.css";
import arrow from "../../assets/images/arrow.svg";

const CardSection2: React.FC = () => {
  const bgRef = useRef<HTMLDivElement>(null);
  const sectionRef = useRef<HTMLElement>(null);
  const [revealed, setRevealed] = useState(false);

  // Parallax BG effect
  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY;
      if (bgRef.current) {
        bgRef.current.style.transform = `translateY(${scrollY * 0.15}px)`;
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
      { threshold: 0.2 }
    );
    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => {
      if (sectionRef.current) observer.unobserve(sectionRef.current);
    };
  }, []);

  return (
    <section
      ref={sectionRef}
      className={`${styles.cardSection} ${revealed ? styles.revealed : ""}`}
    >
      <div className={styles.cardSectionBg} ref={bgRef}>
        <img
          src={`${import.meta.env.BASE_URL}images/card-section-bg.svg`}
          alt=""
        />
      </div>
      <div className="container">
        <div className={styles.cardSectionContent}>
          <div className={styles.cardSectionItem}>
            <div className={styles.cardSectionLeft}>
              <h2>Crypto to Fiat Global Transfers</h2>
              <p>
                Easily convert your crypto and send local currencies to
                recipients <br /> worldwide—fast, secure, and hassle-free.
              </p>
              <a href="#" className="main-button">
                More Info{" "}
                <span className="arrow">
                  <img src={arrow} alt="" />
                </span>
              </a>
            </div>
            <div className={styles.cardSectionRight}>
              <img
                src={`${import.meta.env.BASE_URL}images/btodollar.svg`}
                alt="Card Section"
              />
            </div>
          </div>
          <div className={styles.cardSectionItem}>
            <div className={styles.cardSectionLeft}>
              <h2>Tokenization</h2>
              <p>
                Turn real-world assets into secure, tradable digital tokens <br /> on
                the blockchain.
              </p>
              <a href="#" className="main-button">
                More Info{" "}
                <span className="arrow">
                  <img src={arrow} alt="" />
                </span>
              </a>
            </div>
            <div className={styles.cardSectionRight}>
              <img
                src={`${import.meta.env.BASE_URL}images/tokenization.svg`}
                alt="Card Section"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CardSection2;
