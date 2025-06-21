import  { useEffect } from "react";
import "./App.css";
import AboutUs from "./components/AboutUs/AboutUs";
import CardSection from "./components/CardSection/CardSection";
import Footer from "./components/Footer/Footer";
import Header from "./components/Header/Header";
import HeroSection from "./components/HeroSection/HeroSection";
import Partners from "./components/Partners/Partners";
import Careers from "./components/Careers/Careers";

function App() {
  // Sayfa her yenilendiğinde otomatik olarak en üste kaydır
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <>
      <Header />
      <HeroSection />
      <AboutUs />
      <CardSection />
      <Partners />
      <Careers />
      <Footer />
    </>
  );
}

export default App;