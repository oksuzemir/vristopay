import React, { useEffect, useState } from "react";
import styles from "./Header.module.css";

const Header: React.FC = () => {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 10); // 10px'den fazla scroll olunca class eklenecek
    };
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <section className={`${styles.header} ${scrolled ? styles.scroll : ""}`}>
      <div className="container">
        <div className={styles.heeaderLeft}>
          <div className={styles.heeaderLogo}>
            <img src={`${import.meta.env.BASE_URL}images/logo.svg`} alt="" />
          </div>
        </div>
        <div className={styles.heeaderRight}>
          <div className={styles.headerNav}>
            <ul>
              <li>
                <a href="#">home</a>
              </li>
              <li>
                <a href="#">about</a>
              </li>
              <li>
                <a href="#">careers</a>
              </li>
              <li>
                <a className={styles.contactBtn} href="#">contact</a>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Header;