import React, { useRef, useEffect, useState } from "react";
import styles from "./CardSection.module.css";
import arrow from "../../assets/images/arrow.svg";

const CardSection: React.FC = () => {
  const bgRef = useRef<HTMLDivElement>(null);
  const sectionRef = useRef<HTMLElement>(null);
  const [revealed, setRevealed] = useState(false);

  // Parallax BG effect (sadece revealed olduktan sonra çalışır)
  useEffect(() => {
    if (!revealed) return;
    const handleScroll = () => {
      const scrollY = window.scrollY;
      if (bgRef.current) {
        bgRef.current.style.transform = `translateY(${scrollY * 0.15}px)`;
      }
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, [revealed]);

  // İlk render'da görünüyorsa revealed'ı true yap, yoksa sadece ilk aşağıya scroll ile reveal
  const lastScrollY = useRef(typeof window !== "undefined" ? window.scrollY : 0);
  useEffect(() => {
    // İlk render'da component görünüyorsa hemen reveal et
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
      { threshold: 0.2 }
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
      className={`${styles.cardSection} ${revealed ? styles.revealed : ""}`}
    >
      <div className={styles.cardSectionBg} ref={bgRef}>
        <img src={`${import.meta.env.BASE_URL}images/card-section-bg.svg`} alt="" />
      </div>
      <div className="container">
        <h2>
          Your virtual crypto  card ‍anytime, anywhere
        </h2>
        <div className={styles.cardSectionContent}>
          <div className={styles.cardSectionItem}>
            <div className={styles.cardSectionLeft}>
              <h2>
                Virtual Card for 
                Crypto Spending
              </h2>
              <p>
                Shop online instantly using your crypto balance with a{" "}
                secure virtual card.
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
                src={`${import.meta.env.BASE_URL}images/green-credit.svg`}
                alt="Card Section"
              />
            </div>
          </div>
          <div className={styles.cardSectionItem}>
            <div className={styles.cardSectionLeft}>
              <h2>Debit Card for  Crypto Spending</h2>
              <p>
                Enable seamless real-world spending by linking  crypto
                assets directly to your debit card.
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
                src={`${import.meta.env.BASE_URL}images/purple-credit.svg`}
                alt="Card Section"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CardSection;