import React, { useEffect, useState } from "react";
import styles from "./Header.module.css";

const menuItems = [
  { name: "home", href: "#" },
  { name: "about", href: "#" },
  { name: "careers", href: "#" },
  { name: "contact", href: "#", btn: true }
];

const Header: React.FC = () => {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 10);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Mobil menü açıldığında body scrollunu engelle
  useEffect(() => {
    if (mobileOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [mobileOpen]);

  const HamburgerIcon = (
    <button
      className={styles.hamburger}
      aria-label="Open mobile menu"
      onClick={() => setMobileOpen(true)}
    >
      <span className={styles.bar}></span>
      <span className={styles.bar}></span>
      <span className={styles.bar}></span>
    </button>
  );

  const CloseIcon = (
    <button
      className={styles.hamburger}
      aria-label="Close mobile menu"
      onClick={() => setMobileOpen(false)}
    >
      <span className={styles.closeBar1}></span>
      <span className={styles.closeBar2}></span>
    </button>
  );

  // Hem scroll hem de mobileOpen varsa scroll class'ı eklenecek
  const headerClass = `${styles.header} ${(scrolled || mobileOpen) ? styles.scroll : ""}`;

  return (
    <section className={headerClass}>
      <div className="container">
        <div className={styles.heeaderLeft}>
          <div className={`${styles.headerLogo} ${mobileOpen ? styles.invert : ""}`}>
            <img src={`${import.meta.env.BASE_URL}images/logo.svg`} alt="Logo" />
          </div>
        </div>
        <div className={styles.heeaderRight}>
          <div className={styles.headerNav}>
            <ul>
              {menuItems.map((item) => (
                <li key={item.name}>
                  <a
                    className={item.btn ? styles.contactBtn : undefined}
                    href={item.href}
                  >
                    {item.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>
          <div className={styles.mobileMenuBtn}>
            {!mobileOpen ? HamburgerIcon : CloseIcon}
          </div>
        </div>
      </div>

      <div
        className={`${styles.mobileMenu} ${
          mobileOpen ? styles.open : ""
        }`}
      >
        <ul>
          {menuItems.map((item) => (
            <li key={item.name}>
              <a
                className={item.btn ? styles.contactBtn : undefined}
                href={item.href}
                onClick={() => setMobileOpen(false)}
              >
                {item.name}
              </a>
            </li>
          ))}
        </ul>
      </div>

      {mobileOpen && (
        <div
          className={styles.mobileMenuBackdrop}
          onClick={() => setMobileOpen(false)}
        />
      )}
    </section>
  );
};

export default Header;