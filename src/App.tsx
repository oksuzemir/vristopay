import "./App.css";
import AboutUs from "./components/AboutUs/AboutUs";
import CardSection from "./components/CardSection/CardSection";
import Footer from "./components/Footer/Footer";
import Header from "./components/Header/Header";
import HeroSection from "./components/HeroSection/HeroSection";
import Partners from "./components/Partners/Partners";
import Careers from "./components/Careers/Careers";
import CardSection2 from "./components/CardSection2/CardSection2";

function App() {
  return (
    <>
      <Header />
      <HeroSection />
      <AboutUs />
      <CardSection />
      <Partners />
      <Careers/>
      <CardSection2/>
      <Footer />
    </>
  );
}

export default App;
