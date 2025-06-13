import React from "react";
import styles from "./HeroSection.module.css";
import arrow from "../../assets/images/arrow.svg"; // Ensure the path is correct

const HeroSection: React.FC = () => (
  <section className={styles.heroSection}>
    <div className={styles.heroBg}><img src="/images/hero-bg.svg" alt="" /></div>
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
      <a href="#"className="main-button">
        Join the Revolution Today <span className="arrow"><img src={arrow} alt="" /></span>
      </a>
        </div>
            
     
    </div>
  </section>
);

export default HeroSection;
