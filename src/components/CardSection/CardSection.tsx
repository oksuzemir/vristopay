import React from "react";
import styles from "./CardSection.module.css";
import arrow from "../../assets/images/arrow.svg"; // Adjust the path as necessary
const CardSection: React.FC = () => {
  return (
    <section className={styles.cardSection}>
        <div className={styles.cardSectionBg}> 
            <img src={`${import.meta.env.BASE_URL}images/card-section-bg.svg`} alt="" />
        </div>
      <div className="container">
        <h2>
          Your virtual crypto <br /> card ‍anytime, anywhere
        </h2>
        <div className={styles.cardSectionContent}>
          <div className={styles.cardSectionItem}>
            <div className={styles.cardSectionLeft}>
              <h2>
                Virtual Card for <br />
                Crypto Spending
              </h2>
              <p>
                Shop online instantly using your crypto balance with a <br />{" "}
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
              <h2>Debit Card for br Crypto Spending</h2>
              <p>
                Enable seamless real-world spending by linking <br /> crypto
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
