// hooks import
import { useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";

// components import
import Header from "../Header";
import MobileHeader from "../MobileHeader";

// animations import
import { loading, mobileLoading } from "./utils";

// stylesheet import
import "./hero.css";

// image import
import heroImage from "/assets/portraits/portraits-3.jpg";

// utils functions import
import { splitText } from "../../utils";

gsap.registerPlugin(useGSAP);

const Hero = () => {
  const mainRef = useRef();
  const tl = useRef();

  const viewport = window.innerWidth;

  useGSAP(() => {
    let mm = gsap.matchMedia();
    splitText(".name", "words");

    mm.add(
      { isMobile: "(max-width: 768px)", isDesktop: "(min-width: 769px)" },
      (context) => {
        let { isMobile, isDesktop } = context.conditions;

        if (isDesktop) {
          loading(tl);
        } else if (isMobile) {
          mobileLoading(tl);
        }
      }
    );
  }, [{ scope: mainRef.current }]);

  return (
    <div ref={mainRef} className="main-section">
      <main className="main">
        {viewport > 768 ? (
          <Header />
        ) : (
          <>
            <MobileHeader />
            <div className="mobile-hero-curtain"></div>
          </>
        )}
        <div className="hero-content">
          <div className="image-n-roles-container">
            <h3 className="role role-cd">
              <span>Creative</span>
              <span>Director</span>
            </h3>
            <div className="hero-image-container">
              <img className="main-hero-image" src={heroImage} alt="" />
            </div>
            <h3 className="role role-model">
              <span>Model</span>
            </h3>
          </div>

          <h1 className="name">Blessing A. Udofia</h1>
        </div>
      </main>
    </div>
  );
};

export default Hero;
