import React, { useEffect, useRef, useState } from "react";
import styles from "./Footer.module.css";

const Footer: React.FC = () => {
  const [revealed, setRevealed] = useState(false);
  const footerRef = useRef<HTMLDivElement>(null);
  const bg1Ref = useRef<HTMLDivElement>(null);
  const bg2Ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleScroll = () => {
      if (!footerRef.current) return;
      const rect = footerRef.current.getBoundingClientRect();
      if (rect.top < window.innerHeight) {
        setRevealed(true);
      } else {
        setRevealed(false);
      }

      // Parallax BG effect
      const scrollY = window.scrollY;
      if (bg1Ref.current) {
        bg1Ref.current.style.transform = `translateY(${scrollY * 0.1}px)`;
      }
      if (bg2Ref.current) {
        bg2Ref.current.style.transform = `translateY(${scrollY * 0.2}px)`;
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll(); // check on mount
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div
      ref={footerRef}
      className={`${styles.footer} ${revealed ? styles.revealed : ""}`}
    >
      <div className={styles.footerBg} ref={bg1Ref}>
        <img src={`${import.meta.env.BASE_URL}images/footerbg.svg`} alt="Footer Background" />
      </div>
      <div className={styles.footerBg2} ref={bg2Ref}>
        <img src={`${import.meta.env.BASE_URL}images/hero-bg.svg`} alt="Footer Background" />
      </div>
      <div className="container">
        <div className={styles.footerNews}>
          <div className={styles.footerTitle}>
            Get the latest our news delivered weekly{" "}
          </div>
          <div className={styles.footerNewsInner}>
            <form className={styles.footerForm}>
              <input
                type="email"
                placeholder="Enter your email"
                className={styles.footerInput}
              />
              <button type="submit" className={styles.footerButton}>
                Subscribe
              </button>
            </form>
          </div>
        </div>
        <div className={styles.footerLinks}>
          <div className={styles.footerLinkItem}>
            <h3>Pages</h3>
            <ul>
              <li>
                <a href="#">Home</a>
              </li>
              <li>
                <a href="#">About Us</a>
              </li>
              <li>
                <a href="#">Careers </a>
              </li>
            </ul>
          </div>
          <div className={styles.footerLinkItem}>
            <h3>Contact</h3>
            <ul>
              <li>
                <a href="#">
                  <img
                    src={`${import.meta.env.BASE_URL}images/phone.svg`}
                    alt="phone"
                  />
                  +48 572 988 258
                </a>
              </li>
              <li>
                <a href="#">
                  <img
                    src={`${import.meta.env.BASE_URL}images/mail.svg`}
                    alt="mail"
                  />info@vristopay.com</a>
              </li>
              <li>
                <a href="#">
                  <img
                    src={`${import.meta.env.BASE_URL}images/pin.svg`}
                    alt="pin"
                  />
                  Revoluční 1082/8, Nové Město, 11000, Praha 1
                </a>
              </li>
            </ul>
          </div>
          <div className={styles.footerLinkItem}>
            <h3>Registration Number</h3>
            <ul>
              <li>
                <a href="#">VristoPay s.r.o 221 70 880</a>
              </li>
            </ul>
          </div>
          <div className={styles.footerLinkItem}>
            <h3>Connect with Us</h3>
            <ul style={{ flexDirection: "row", gap: "60px", paddingLeft: "45px" }}>
              <li>
                <a href="#"><img
                  src={`${import.meta.env.BASE_URL}images/youtube.svg`}
                  alt="youtube"
                /></a>
              </li>
              <li>
                <a href="#"><img
                  src={`${import.meta.env.BASE_URL}images/facebook.svg`}
                  alt="facebook"
                /></a>
              </li>
              <li>
                <a href="#"><img
                  src={`${import.meta.env.BASE_URL}images/twitter.svg`}
                  alt="twitter"
                /></a>
              </li>
              <li>
                <a href="#"><img
                  src={`${import.meta.env.BASE_URL}images/linkedin.svg`}
                  alt="linkedin"
                /></a>
              </li>
            </ul>
          </div>
          <div className={styles.footerCopy}> Copyright © 2024 VristoPay</div>
        </div>
      </div>
    </div>
  );
};

export default Footer;